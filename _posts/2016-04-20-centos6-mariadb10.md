---
layout: post
title: centos6.5上安装MariaDB10.1
---

  MariaDB数据库管理系统是MySQL的一个分支，主要由开源社区在维护，采用GPL授权许可 MariaDB的目的是完全兼容MySQL，包括API和命令行，使之能轻松成为MySQL的代替品。在存储引擎方面，使用XtraDB（英语：XtraDB）来代替MySQL的InnoDB。 MariaDB由MySQL的创始人Michael Widenius（英语：Michael Widenius）主导开发，他早前曾以10亿美元的价格，将自己创建的公司MySQL AB卖给了SUN，此后，随着SUN被甲骨文收购，MySQL的所有权也落入Oracle的手中。MariaDB名称来自Michael Widenius的女儿Maria的名字。

## 添加ＹＵＭ源,如下

{% highlight Bash %}
[root@template ~]# cd /etc/yum.repos.d 
[root@template yum.repos.d]# vi MariaDB.repo
{% endhighlight %}

{% highlight ini %}
[mariadb] 
name = MariaDB 
baseurl = http://yum.mariadb.org/10.1/centos6-amd64 
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB 
gpgcheck=1
{% endhighlight %}


## 使用YUM安装MariaDB
{% highlight Bash %}
[root@template yum.repos.d]# sudo yum -y install MariaDB-client MariaDB-server MariaDB-devel
{% endhighlight %}

## 启动数据库
{% highlight Bash %}
[root@template yum.repos.d]# sudo service mysql start  
{% endhighlight %}

## 改Root的密码
{% highlight Bash %}
[root@template yum.repos.d]# mysqladmin -u root password 'passwd'
{% endhighlight %}

## 配置过程访问
{% highlight Bash %}
[root@template ~]# mysql -u root -p 
Enter password: 
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 4
Server version: 10.1.13-MariaDB MariaDB Server

Copyright (c) 2000, 2016, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'pangu96877**..' WITH GRANT OPTION;
Query OK, 0 rows affected (0.00 sec)

MariaDB [(none)]> flush privileges;
Query OK, 0 rows affected (0.00 sec)
{% endhighlight %}

第一句中"%"表示任何主机都可以远程登录到该服务器上访问。如果要限制只有某台机器可以访问，将其换成相应的IP即可，如：
GRANT ALL PRIVILEGES ON *.* TO root@"172.168.193.25" IDENTIFIED BY "root";
第二句表示从mysql数据库的grant表中重新加载权限数据。因为MySQL把权限都放在了cache中，所以在做完更改后需要重新加载。

## emoji表情支持
{% highlight Bash %}
MariaDB [(none)]> SET character_set_client = utf8mb4;
Query OK, 0 rows affected (0.00 sec)
MariaDB [(none)]> SET character_set_connection = utf8mb4;
Query OK, 0 rows affected (0.00 sec)
MariaDB [(none)]> SET character_set_results = utf8mb4;
Query OK, 0 rows affected (0.00 sec)
[root@template ~]#vi /etc/my.cnf
{% endhighlight %}
my.cnf中添加如下配置：

{% highlight Bash %}
[client]
default-character-set = utf8mb4
[mysql]
default-character-set = utf8mb4
[mysqld]
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
{% endhighlight %}

## 重启服务
{% highlight Bash %}
[root@template ~]# service  mysql restart
{% endhighlight %}

