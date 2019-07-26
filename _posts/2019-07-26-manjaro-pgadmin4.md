---
layout: post
title: 在Manjaro下安装pgadmin4
tags: ["manjaro"]
---

我在manjaro下用默认折包管理工具pacman安装pgadmin4时出现了如下错误：

~~~
...
...
python-pytz: 文件系统中已存在 /usr/lib/python3.7/site-packages/pytz/zoneinfo/zone.tab 
python-pytz: 文件系统中已存在 /usr/lib/python3.7/site-packages/pytz/zoneinfo/zone1970.tab 
python-sqlparse: 文件系统中已存在 /usr/bin/sqlformat 
python-babel: 文件系统中已存在 /usr/bin/pybabel 

~~~
你会发现，pgadmin和我现在系统里的python环境有冲突，而且是需要安装到默认的python3.7环境中。
我现在系统中有多个版本的python,所以折腾半天还是安装不成功。

最后是通过到官网下载whl文件安装成功的
~~~
➜  Downloads sudo pip2 install pgadmin4-4.10-py2.py3-none-any.whl
[sudo] zhuangyan 的密码：
DEPRECATION: Python 2.7 will reach the end of its life on January 1st, 2020. Please upgrade your Python as Python 2.7 won't be maintained after that date. A future version of pip will drop support for Python 2.7.
Processing ./pgadmin4-4.10-py2.py3-none-any.whl
Requirement already satisfied: Flask-Mail==0.9.1 in /usr/lib/python2.7/site-packages (from pgadmin4==4.10) (0.9.1)
Requirement already satisfied: speaklater==1.3 in /usr/lib/python2.7/site-packages (from pgadmin4==4.10) (1.3)
...........
...........
Installing collected packages: pgadmin4
Successfully installed pgadmin4-4.10

~~~

然后就可以启动了，命令如下:

<img src="/static/img/2019/pgadmin01.png" width = "800px" title="启动"/>


第一次启动里需要设置用户名和密码

如果不想用超管权限启动，可以更改一下目录权限：
~~~
➜  ~ sudo chown -R zhuangyan.zhuangyan /var/lib/pgadmin
➜  ~ sudo chown -R zhuangyan.zhuangyan /var/log/pgadmin 
~~~

打开浏览器登录效果如下：

<img src="/static/img/2019/pgadmin02.png" width = "800px" title="登录"/>
<img src="/static/img/2019/pgadmin03.png" width = "800px" title="主界面"/>

