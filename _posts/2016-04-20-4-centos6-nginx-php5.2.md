---
layout: post
title: centos6.5上部署PHP服务
tags: ["服务器", "nginx","php"]
---

  本文记录我在联通沃云服务器上部署PHP服务的过程，Nginx安装已在<a href="/2-centos6-nginx1.8" target="_blank">前篇文章</a>中说明。本文主要说整合nginx和php的过程。

## 准备安装资源

{% highlight Bash %}
[root@template ~]# cd ~/src/
[root@template src]# wget http://120.52.72.53/museum.php.net/c3pr90ntcsf0/php5/php-5.2.17.tar.gz
[root@template src]# wget http://php-fpm.org/downloads/php-5.2.17-fpm-0.5.14.diff.gz
{% endhighlight %}

## 安装PHP

{% highlight Bash %}
[root@template src]#yum -y install libjpeg-devel libpng-devel libxml2-devel
[root@template src]# tar -xvzf php-5.2.17.tar.gz
[root@template src]# tar -xvzf php-5.2.17.tar.gz
[root@template src]# gzip -cd php-5.2.17-fpm-0.5.14.diff.gz | sudo patch -d php-5.2.17 -p1
[root@template php-5.2.17]# cd php-5.2.17
[root@template php-5.2.17]# ./configure --prefix=/usr/local/php --with-config-file-path=/usr/local/lib  --enable-fastcgi --enable-fpm  --with-mysql=/usr/lib64/mysql --with-gd --enable-gd-native-ttf --with-zlib-dir=/usr/local/zlib --with-png-dir --with-jpeg-dir=/usr/local/jpeg6/ 
{% endhighlight %}
如果configure出现类似如下错误：
{% highlight Bash %}
configure: error: libjpeg.(a|so) not found 
configure: error: libpng.(a|so) not found 
configure: error: Cannot find libmysqlclient under /usr.
{% endhighlight %}
请执行以下命令：
{% highlight Bash %}
ln -s /usr/lib64/libjpeg.so /usr/lib/libjpeg.so
ln -s /usr/lib64/libpng.so /usr/lib/libpng.so
mkdir /usr/lib/mysql
cp -r /usr/lib64/mysql /usr/lib/
{% endhighlight %}


{% highlight Bash %}
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
{% highlight nginx %}
#location ~ \.php$ {
#    root           html;
#    fastcgi_pass   127.0.0.1:9000;
#    fastcgi_index  index.php;
#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
#    include        fastcgi_params;
#}
{% endhighlight %}
将

{% highlight nginx %}
fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
{% endhighlight %}


改为
{% highlight nginx %}
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

  我们在nginx的配置文件里面已经定义了PHP网站的存放路径，路径为/usr/local/nginx/html下面我们在这个目录下新建一个PHP页面网页，文件名为test.php,内容如下:  

{% highlight Bash %}
<?php
    phpinfo();
?>
{% endhighlight %}

重启PHP与nginx后,在浏览器中输入http://ip/test.php，查看是否可能解析PHP文件。