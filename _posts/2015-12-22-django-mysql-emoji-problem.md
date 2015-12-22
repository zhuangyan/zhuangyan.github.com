---
layout: post
title: django mysql存储emoji表情的问题
---
我的API服务接口在处理手机传来的emoji表情出现的问题，暂时没有解决办法，先记录在这里！
问题是这样的，在mysql保存emoji表情时报错:

{% highlight java %}
{% raw %}
Warning: Incorrect string value: '\xF0\x9F\x98\x81\xF0\x9F...' for column 'message' at row 1
{% endraw %}
{% endhighlight %}
按百度查询到的方法进行如下操作：

1)升级MySql到5.6

2)/etc/mysql/my.cnf 添加：
{% highlight java %}
[client]
default-character-set = utf8mb4
[mysql]
default-character-set = utf8mb4
[mysqld]
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
{% endhighlight %}
修改后重启Mysql

3)以root身份登录Mysql，修改环境变量，将character_set_client,character_set_connection,character_set_database,character_set_results,character_set_server 都修改成utf8mb4
{% highlight java %}
SET character_set_client = utf8mb4;
SET character_set_connection = utf8mb4;
SET character_set_results = utf8mb4;
{% endhighlight %} 
4)将已经建好数据库，表，字段也转换成utf8mb4
{% highlight java %}
	ALTER DATABASE 数据库名 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
	ALTER TABLE 表名 convert to character set utf8mb4 collate utf8mb4_bin; 
	ALTER TABLE 表名 CHANGE 字段名 VARCHAR(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
{% endhighlight %} 	
5)MySQLdb升级到1.2.5

6)增加django的数据库连接参数：
{% highlight java %}
  'OPTIONS': {'charset':'utf8mb4'}
{% endhighlight %}  

按以上操作完后，重启服务，结果django报错：
{% highlight java %}
  File "/usr/python/lib/python2.7/site-packages/django/db/backends/__init__.py", line 115, in connect
    self.connection = self.get_new_connection(conn_params)
  File "/usr/python/lib/python2.7/site-packages/django/db/backends/mysql/base.py", line 435, in get_new_connection
    conn = Database.connect(**conn_params)
  File "/usr/python/lib/python2.7/site-packages/MySQL_python-1.2.5-py2.7-linux-x86_64.egg/MySQLdb/__init__.py", line 81, in Connect
    return Connection(*args, **kwargs)
  File "/usr/python/lib/python2.7/site-packages/MySQL_python-1.2.5-py2.7-linux-x86_64.egg/MySQLdb/connections.py", line 221, in __init__
    self.set_character_set(charset)
  File "/usr/python/lib/python2.7/site-packages/MySQL_python-1.2.5-py2.7-linux-x86_64.egg/MySQLdb/connections.py", line 312, in set_character_set
    super(Connection, self).set_character_set(charset)
OperationalError: (2019, "Can't initialize character set utf8mb4 (path: /usr/share/mysql/charsets/)")
{% endhighlight %}  

以上各种设置检查的几遍还是一样的错误，最后没办法在window上启动django服务，连接同一个mysql服务，结果是好用的，utf8mb4的表情可以正常保存到mysql数据库。
所以只能断定mysql数据库设置是没有问题的，问题只能出现在django或者MySQLdb上。但django都是1.6.11，MySQLdb都是1.2.5,具体在window和linux下有什么差别还查不出来，此问题只能暂时记录一下，待以后有时间再解决了。



