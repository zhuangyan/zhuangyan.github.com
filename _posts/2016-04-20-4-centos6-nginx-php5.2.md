---
layout: post
title: centos6.5上部署PHP服务
---

  本文记录我在联通沃云服务器上部署PHP服务的过程，Nginx安装已在前篇文章中说明。本文主要说整合nginx和php的过程。

## 准备安装资源

{% highlight Bash %}
[root@template ~]# cd /home/src/
[root@template src]# wget http://us.php.net/distributions/php-5.2.17.tar.gz
[root@template src]# wget http://php-fpm.org/downloads/php-5.2.17-fpm-0.5.14.diff.gz
{% endhighlight %}

## 安装PHP

{% highlight Bash %}
[root@template src]# tar -xvzf php-5.2.17.tar.gz
[root@template src]# gzip -cd php-5.2.17-fpm-0.5.14.diff.gz | sudo patch -d php-5.2.17 -p1
[root@template php-5.2.17]# cd php-5.2.17
[root@template php-5.2.17]# ./configure --prefix=/usr/local/php --with-config-file-path=/usr/local/lib  --enable-fastcgi --enable-fpm
[root@template php-5.2.17]# make
[root@template php-5.2.17]# make install
[root@template php-5.2.17]# cp php.ini-dist /usr/local/php/etc/php.ini
[root@template php-5.2.17]# vi /usr/local/php/etc/php-fpm.conf
{% endhighlight %}
把php-fpm.conf里带“nobody”的两行注释去掉，不然PHP-FPM自己不知道以那个用户和组运行PHP
启动php
{% highlight Bash %}
[root@template ~]# /usr/local/php/sbin/php-fpm start
{% endhighlight %}


## 整合Nginx与PHP 
修改nginx的配置文件
打开nginx.conf 去掉下面几行的注释，
{% highlight Bash %}
#location ~ \.php$ {
#    root           html;
#    fastcgi_pass   127.0.0.1:9000;
#    fastcgi_index  index.php;
#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
#    include        fastcgi_params;
#}
{% endhighlight %}
将
{% highlight Bash %}

fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
{% endhighlight %}

改为
{% highlight Bash %}

fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
{% endhighlight %}

找到
{% highlight Bash %}

location / {
          root   html;
          index  index.html index.htm;
        }
{% endhighlight %}

在index.htm后面添加index.php


## 测试

  我们在nginx的配置文件里面已经定义了PHP网站的存放路径，路径为/usr/local/nginx/conf/html下面我们在这个目录下新建一个PHP页面网页，文件名为test.php，内容如下

    在文件中输入以下内容

{% highlight Bash %}
<?php
    phpinfo();
?>
重启PHP与nginx后,在浏览器中输入http://ip/test.php，查看是否可能解析PHP文件。