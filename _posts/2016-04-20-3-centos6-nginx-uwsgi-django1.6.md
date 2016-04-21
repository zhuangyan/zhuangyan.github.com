---
layout: post
title: centos6.5上部署django服务
---

  本文记录我在联通沃云服务器上部署Django服务的过程，Nginx安装已上篇文章中说明。本文主要说明使用uwsgi整合nginx和django的过程。

## 准备安装资源

{% highlight Bash %}
[root@template ~]# cd /home/src/
[root@template src]# wget http://www.python.org/ftp/python/2.7.11/Python-2.7.11.tgz
{% endhighlight %}

## 创建用户

{% highlight Bash %}
[root@template ~]# groupadd cluster
[root@template ~]# useradd django -G cluster
{% endhighlight %}

## 安装Python
{% highlight Bash %}
[root@template src]# tar zxvf Python-2.7.11.tgz
[root@template src]# cd Python-2.7.11
[root@template Python-2.7.11]# ./configure --prefix=/usr/python && make install clean
{% endhighlight %}
升级系统自带的python2.6版本到新版本
{% highlight Bash %}
[root@template Python-2.7.11]# mv /usr/bin/python /usr/bin/python-2.6.6.bak
[root@template Python-2.7.11]# ln -s /usr/python/bin/python2.7 /usr/bin/python
{% endhighlight %}
这时yum可能无法使用
{% highlight Bash %}
[root@template Python-2.7.11]#vi /usr/bin/yum
{% endhighlight %}
将/usr/bin/yum代码中的/usr/bin/python修改为#/usr/bin/python2.6配置即可

## 安装PIP
{% highlight Bash %}
[root@template src]# wget --no-check-certificate https://bootstrap.pypa.io/get-pip.py
[root@template src]# python get-pip.py
[root@template src]# vi ~/.bash_profile
{% endhighlight %}
添加export PATH="/usr/python/bin:$PATH"
{% highlight Bash %}
[root@template src]# source ~/.bash_profile
{% endhighlight %}

## 安装Django
{% highlight Bash %}
[root@template ~]# pip install Django==1.6.11
{% endhighlight %}

## 安装PIL
{% highlight Bash %}
[root@template ~]#  yum -y install zlib zlib-devel
[root@template ~]#  yum -y install libjpeg libjpeg-level
[root@template ~]#  yum -y install freetype freetype-devel
[root@template ~]#  cd src
[root@template src]# wget http://effbot.org/downloads/Imaging-1.1.7.tar.gz
[root@template src]# tar zxvf Imaging-1.1.7.tar.gz
[root@template src]# cd Imaging-1.1.7
{% endhighlight %}
64位系统需要修改文件setup.py
{% highlight Bash %}
[root@template Imaging-1.1.7]# vi setup.py
{% endhighlight %}
修改相关项如下：
{% highlight Bash %}
TCL_ROOT = "/usr/lib64/"
JPEG_ROOT = "/usr/lib64/"
ZLIB_ROOT = "/usr/lib64/"
TIFF_ROOT = "/usr/lib64/"
FREETYPE_ROOT = "/usr/lib64/"
LCMS_ROOT = "/usr/lib64/"
{% endhighlight %}
开始安装
{% highlight Bash %}
[root@template Imaging-1.1.7]# python setup.py install
{% endhighlight %}

## 安装数据引擎MySQLdb
{% highlight Bash %}
[root@template ~]# yum -y mysql
[root@template ~]# cd src
[root@template src]# wget --no-check-certificate https://pypi.python.org/packages/source/M/MySQL-python/MySQL-python-1.2.5.zip
[root@template src]# unzip MySQL-python-1.2.5.zip 
[root@template src]# cd MySQL-python-1.2.5 
[root@template MySQL-python-1.2.5]# python setup.py install
{% endhighlight %}

## 安装uwsgi
{% highlight Bash %}
[root@template ~]# pip install uwsgi
[root@template ~]# uwsgi –version
{% endhighlight %}

## 测试uwsgi
新建web.py文件，内容如下
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

## 测试uwsgi启动Django工程
{% highlight Bash %}
[root@template django]# /usr/python/bin/django-admin.py startproject mysite
[root@template django]# uwsgi --http 0.0.0.0:80 --chdir /home/django/mysite/ --module mysite.wsgi
{% endhighlight %}
浏览器中访问本机IP，看是否出现” It worked!“

## uwsgi启动脚本制作
{% highlight Bash %}
[root@template ~]# vi /etc/uwsgi/uwsgi.ini
{% endhighlight %}
内容如下：
{% highlight Bash %}
[uwsgi]
socket = 127.0.0.1:9090
master = true
vhost = true
workers = 2
reload-mercy = 10
vacuum = true
max-requests = 1000
limit-as = 512
buffer-sizi = 30000
pidfile = /usr/local/logs/uwsgi9090.pid
daemonize = /usr/local/logs/uwsgi9090.log
{% endhighlight %}
{% highlight Bash %}
[root@template ~]# vi /etc/uwsgi/uwsgi
{% endhighlight %}
内容如下：
{% highlight Bash %}
#!/bin/bash
#
# uwsgi - This script starts and stops all configured uwsgi applications
#
# chkconfig:   - 85 15
# description: uWSGI is a program to run applications adhering to the
#              Web Server Gateway Interface.
# processname: uwsgi
# config:      /etc/sysconfig/uwsgi

# Source function library.
. /etc/rc.d/init.d/functions

# Source networking configuration.
. /etc/sysconfig/network

# Check that networking is up.
[ "$NETWORKING" = "no" ] && exit 0

uwsgi="/usr/python/bin/uwsgi"
prog=$(basename "$uwsgi")
UWSGI_CONF_DIR="/etc/uwsgi"
UWSGI_LOG_DIR="/var/log/uwsgi"
PIDFILE_DIR="/var/run/uwsgi"
UWSGI_ARGS="--master --die-on-term"

if [ -f /etc/sysconfig/uwsgi ]; then
    . /etc/sysconfig/uwsgi
fi

each_action() {
    action=$1
    configs=$(find "$UWSGI_CONF_DIR" \
                   -maxdepth 1 \
                   -type f \
                   -regextype posix-extended \
                   -iregex '.*\.(ini|json|xml|yaml|yml)$')

    code=0
    if [ -n "$configs" ]; then
        for f in $configs; do
            case "$action" in
                condrestart|try-restart)
                    rh_status "$f" 2>/dev/null && restart "$f"
                    ;;
                force-reload|restart)
                    stop "$f"
                    start "$f"
                    ;;
                reload)
                    reload "$f"
                    ;;
                start)
                    start "$f"
                    ;;
                status)
                    rh_status "$f"
                    ;;
                status_q)
                    rh_status "$f" >/dev/null 2>&1
                    ;;
                stop)
                    stop "$f"
                    ;;
            esac
            retval=$?
        done

        if [ $retval -gt $code ]; then
            code=$retval
        fi
    fi

    return $code
}

args_for() {
    config_file="$1"
    instance=$(instance_for "$config_file")
    pidfile=$(pidfile_for "$config_file")
    args="${UWSGI_ARGS} --pidfile ${pidfile} --daemonize ${UWSGI_LOG_DIR}/uwsgi-${instance}.log"
    case "$1" in
        *.ini)        args="$args --ini $f";;
        *.json)       args="$args --json $f";;
        *.xml)        args="$args --xmlconfig $f";;
        *.yml|*.yaml) args="$args --yaml $f";;
    esac

    echo "$args"
}

instance_for() {
    config_file="$1"
    instance=$(basename "$config_file")
    instance=${instance%.*}
    echo "$instance"
}

pidfile_for() {
    instance=$(instance_for "$1")
    echo "${PIDFILE_DIR}/uwsgi-${instance}.pid"
}

reload() {
    config_file="$1"
    instance=$(instance_for "$config_file")
    pidfile=$(pidfile_for "$config_file")

    echo -n "Reloading uWSGI for ${instance}... "
    killproc -p "$pidfile" "$prog" -HUP
    retval=$?
    echo
    return $retval
}

start() {
    config_file="$1"
    instance=$(instance_for "$config_file")
    pidfile=$(pidfile_for "$config_file")
    args="$(args_for "$config_file")"

    echo -n "Starting uWSGI for ${instance}... "
    daemon --pidfile="$pidfile" $uwsgi $args
    retval=$?
    echo
    return $retval
}

rh_status() {
    config_file="$1"
    status -p "$(pidfile_for "$config_file")" "$prog"
}

stop() {
    config_file="$1"
    instance=$(instance_for "$config_file")
    pidfile=$(pidfile_for "$config_file")

    echo -n "Stopping uWSGI for ${instance}... "
    killproc -p "$pidfile" "$prog"
    retval=$?
    echo
    return $retval
}

case $1 in
    condrestart|force_reload|reload|restart|start|status|status_q|stop|try-restart)
        each_action "$1"
        ;;
    *)
        echo "Usage: $0 {condrestart|reload|restart|start|status|stop}"
        exit 2
        ;;
esac

exit $?
{% endhighlight %}
为脚本设置权限
{% highlight Bash %}
[root@template ~]# chmod 755 /etc/init.d/uwsgi
{% endhighlight %}

## 设置uwsgi自启动
{% highlight Bash %}
[root@template ~]# chkconfig --add uwsgi
[root@template ~]# chkconfig uwsgi on
{% endhighlight %}

## uwsgi和ngnix整合
{% highlight Bash %}
[root@template ~]# vi /usr/local/nginx/conf/nginx.conf
{% endhighlight %}
location / 相关部分修改为如下内内容：
{% highlight ngnix %}
ocation / {
           include  uwsgi_params;
            uwsgi_pass  127.0.0.1:9090;
            uwsgi_param UWSGI_SCRIPT syzhmj.wsgi; 
            uwsgi_param UWSGI_CHDIR /home/django/wwwroot;
            index  index.html index.htm;
            client_max_body_size 35m;
        }
{% endhighlight %}


