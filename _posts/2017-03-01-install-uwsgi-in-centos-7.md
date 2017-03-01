---
layout: post
title: 在centos7上使用uwsgi部署flask应用
tags: ["服务器","uwsgi]"]
---

步骤基本和<a href="http://www.zhuangyan.cn/3-centos6-nginx-uwsgi-django1.6/" target="_blank">centos6.5上部署django服务</a>差不多，就是uwsgi会出现各种怪异的问题。
详细记录如下：

### 安装python-devel

{% highlight shell %}
[root@centos7 ~]# yum install python-devel
{% endhighlight %}

### 安装pip

{% highlight shell %}
[root@centos7 ~]# wget https://bootstrap.pypa.io/get-pip.py
[root@centos7 ~]# python get-pip.py
{% endhighlight %}

### 安装uwsgi

{% highlight shell %}
[root@centos7 ~]# pip install uwsgi
{% endhighlight %}



### 测试uwsgi

新建test.py文件，内容如下
{% highlight python %}
def application(env, start_response):
    start_response('200 OK', [('Content-Type','text/html')])
    return "Hello World"
{% endhighlight %}
然后在终端运行：
{% highlight Bash %}
[root@template ~]# uwsgi --http :8001 --wsgi-file test.py
{% endhighlight %}
本机访问http://127.0.0.1:8001，看是否有“Hello World”输出
{% highlight Bash %}
[root@template ~]# curl http://127.0.0.1:8001
[root@template ~]# Hello World
{% endhighlight %}

### 部署Flask应用

应用的目录为“/home/nginx/wwwroot”
启动脚本run.py内容为：
{% highlight python %}
#!/usr/bin/env python
# encoding: utf-8
import sys,os
from flask import Flask, session

from app import create_app, db

os.environ["NLS_LANG"] = "SIMPLIFIED CHINESE_CHINA.UTF8"
application = create_app(os.getenv('FLASK_CONFIG', 'default'))


if __name__ == '__main__':
    application.run(debug=True,threaded=True)
{% endhighlight %}

我都uwsgi相关内容放在目录“/etc/uwsgi/”中
{% highlight shell %}
# vi /etc/uwsgi/uwsgi.conf
{% endhighlight %}
内容为：
{% highlight shell %}
# uwsgi config file
[uwsgi]
disable-logging = true
daemonize       = /etc/uwsgi/uwsgi.log
pidfile         = /etc/uwsgi/flask.pid

# Flask config start
socket = 127.0.0.1:44380

pythonpath = /home/nginx/wwwroot
module = run
callable = application
memory-report = true
# Flask config end

# process-related settings
# master
master          = true
enable-threads  = true
# maximum number of worker processes
listen          = 16384
cpu-affinity    = 3
processes       = 8
#threads         = 64
reaper          = true
# maximum number of worker processes request with reset
max-requests    = 1000
buffer-size=32768

# ... with appropriate permissions - may be needed
chmod-socket    = 660
uid             = nginx
# clear environment on exit
vacuum          = true
{% endhighlight %}
测试用uwsgi.conf启动uwsgi是否成功
{% highlight shell %}
# /usr/bin/uwsgi --ini /etc/uwsgi/uwsgi.conf
{% endhighlight %}
如果日志“Listen queue size is greater than the system max net.core.somaxconn (128)”的错误，
可以把listen改为128以下，或者修改/etc/sysctl.conf文件，把“max net.core.somaxconn”设置调大。
### 设置uwsgi的自启动服务

服务脚本
{% highlight shell %}
# vi /etc/systemd/system/uwsgi.service
{% endhighlight %}
内容如下：
{% highlight shell %}
[Unit]
Description=The  uwsgi server
After=network.target remote-fs.target nss-lookup.target
[Service]
Type=forking
PIDFile=/etc/uwsgi/flask.pid
ExecStart=/usr/bin/uwsgi --ini /etc/uwsgi/uwsgi.conf
ExecReload=/bin/kill -s HUP $MAINPID
KillMode=process
KillSignal=SIGQUIT
TimeoutStopSec=5
PrivateTmp=true
[Install]
WantedBy=multi-user.target
{% endhighlight %}
启用服务
{% highlight shell %}
# systemctl enable uwsgi.service
# systemctl start uwsgi.service
{% endhighlight %}

### 整合nginx
参考上一篇文章：<a href="http://www.zhuangyan.cn/install-nginx-in-centos-7/" target="_blank">在centos7上用源码安装nginx</a>。
修改nginx.conf
{% highlight shell %}
 		location ~/static/ {
            root  /home/nginx/wwwroot/app;
    	} 
        location / {
            include      /etc/nginx/uwsgi_params;
            uwsgi_pass   127.0.0.1:44380;
        }

{% endhighlight %}




