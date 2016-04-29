---
layout: post
title: 给PHP5.2安装mysqli扩展
tags: ["php", "mysqli"]
---

  根据<a href="http://www.zhuangyan.cn/4-centos6-nginx-php5.2/" target="_blank">Nginx和PHP整合部署</a>的记录，我部署上我们的程序，但是报了“mysqli.isn't exists”的错误。因为我编译PHP时没有安装mysqli的扩展，于是我百度一下怎么来安装这个扩展。

  百度出来的文章一般是这样的：

>  添加扩展的基本步骤：  
>	1、进入php源代码目录：# cd php-5.2.17  
>	2、再进入要添加的mysqli扩展源码目录：# cd ext/mysqli/  
>	2、调用已经编译好的php里面的phpize：# /usr/local/php/bin/phpize  
>	3、然后configure：# ./configure --with-php-config=/usr/local/php/bin/php-config --with-mysqli=/usr/local/mysql/bin/mysql_config
	   （/usr/local/mysql 为mysql的安装目录）  
>	4、make && make install  
>	5、编译之后，自动把mysqli.so放到了默认的php扩展目录下，我的为 /usr/local/php/lib/php/extensions/no-debug-non-zts-20060613/  
>	（phpinfo可查看或者执行命令/usr/local/php/bin/php-config --extension-dir ）  
>	再修改php.ini 找到extension_dir 默认路径为 extension_dir="./" 我修改后才启动加载的
>	在下面添加extension = "mysqli.so" 保存即可  
>	extension_dir="/usr/local/php/lib/php/extensions/no-debug-non-zts-20060613/"  
>	extension = "mysqli.so"  
>	6、重启apache：# service httpd restart  

  按上面的文章操作到第3步的时候，会提示没有“with-mysqli”这个选项。到这里就困扰了我好长时间，最好还是找到了官网的安装说明<a href="http://php.net/manual/en/mysqli.installation.php" target="_blank">http://php.net/manual/en/mysqli.installation.php</a>。虽然正文的内容我也看懂，但是在评论中找到了一个有用的信息，就是“yum install php-mysqli”，执行完这个命令就生成了mysqli.so这个文件。虽然后来我修改完配置文件又重启了几次nginx还不好使，但是我终于想起来要重启下php-fpm了。

  问题解决后，我再来研究下编译选项里的“mysqlnd"和"libmysqlclient"的区别，官方文档里写的在php5.2及以下版本中mysqlnd is not supporte mysqli，而libmysqlclient是可以用“--with-mysqli=/path/to/mysql_config”的。

  总的来说，关于PHP的MySQL扩展总结如下：

> 可以使用的PHP MySQL拓展有1)mysql 2）mysqli  3）pdo  
> 其中因为mysql是面向过程的，而且无法使用新版本MySQL带来的一些高级特性，现在已经不推荐使用。推荐使用mysqli以及pdo拓展。  
> 但是这三种数据库访问方式，在PHP拓展的角度上看，还是比较上层的拓展，依赖更底层的库去连接和访问数据库。  
> 更底层的库就是libmysqlclient和libmysqlclient  
>  libmysqlclient是一个根据 MySQL client/server 协议，使用C语言实现的库。有很多的客户端api使用libmysqlclient这个库去和MySQL Server进行通信(Exceptions are except Connector/J and Connector/Net.  
> mysqlnd就是MySQL Native Driver，实现和libmysqlclient同样的功能。但MySQL Native Driver是PHP 5.3.0 官方的代码。  
> mysqlnd 和 libmysqlclient最大的不同是，mysqlnd 针对与PHP的应用交互进行优化，而libmysqlclient是早期为C应用程序设计的，并没有针对性的优化。  
> 另外，mysqlnd 可以支持很多高级的特性，比如prepared语句支持（曾经在这个prepare的问题上被坑过，当时用的正是libmysqlclient）。  

