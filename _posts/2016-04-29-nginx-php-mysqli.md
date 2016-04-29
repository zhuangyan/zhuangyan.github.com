---
layout: post
title: 给PHP5.2安装mysqli扩展
tags: ["php", "mysqli"]
---

  根据<a href="http://www.zhuangyan.cn/4-centos6-nginx-php5.2/" target="_blank">Nginx和PHP整合部署</a>的记录，我部署上我们的程序，但是报了“mysqli.isn't exists”的错误。因为我编译PHP时没有安装mysqli的扩展，于是我百度一下怎么来安装这个扩展。

  百度出来的文章一般是这样的：
  >  添加扩展的基本步骤：
	1、进入php源代码目录：# cd php-5.2.17
	2、再进入要添加的mysqli扩展源码目录：# cd ext/mysqli/
	2、调用已经编译好的php里面的phpize：# /usr/local/php/bin/phpize
	3、然后configure：# ./configure --with-php-config=/usr/local/php/bin/php-config --with-mysqli=/usr/local/mysql/bin/mysql_config
	   （/usr/local/mysql 为mysql的安装目录）
	4、make && make install
	5、编译之后，自动把mysqli.so放到了默认的php扩展目录下，我的为 /usr/local/php/lib/php/extensions/no-debug-non-zts-20060613/

	（phpinfo可查看或者执行命令/usr/local/php/bin/php-config --extension-dir ）

	再修改php.ini 找到extension_dir 默认路径为 extension_dir="./" 我修改后才启动加载的

	在下面添加extension = "mysqli.so" 保存即可

	 

	extension_dir="/usr/local/php/lib/php/extensions/no-debug-non-zts-20060613/"

	extension = "mysqli.so"

	6、重启apache：# service httpd restart

