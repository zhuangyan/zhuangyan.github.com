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

