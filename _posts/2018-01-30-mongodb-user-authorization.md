---
layout: post
title: MongoDB用户授权配置
tags: ["mongo"]
---

MongoDB数据库默认情况下是没有做权限控制的，只要能够连接所开放的端口就能进行访问，而且拥有root级别的权限；对于生产环境而言是极不安全的.
所以在生产环境部署时还要做很多安全设置，本文主要讲用户授权模块的设置．
其他设置请搜索＜安全部署MongoDB最佳实践>一文．





### 1.开启认证

修改配置文件/etc/mongodb.conf

打开auth的注释，设置为auth = true

重启mongodb

~~~bash
sudo service mongodb restart
~~~


### 2.添加管理员


使用命令mongo进入命令行

创建第一个用户，该用户需要有用户管理权限

这里设置其角色为root

use admin
db.createUser({user:"admin",pwd:"password",roles:["root"]})

新增的用户在system.users中

~~~bash
> db.getCollectionNames()
[ "system.indexes", "system.users", "system.version" ]
~~~


第一个用户添加完成后，便需要认证才能继续添加其他用户

使用db.auth("admin", "password")认证

### 3.添加数据库用户

为其他数据库添加用户，添加用户前需要切换到该数据库

这里设置其角色为dbOwner

~~~bash
use testdb1
db.createUser({user: "testdb1u1", pwd: "xyz123", roles: [{ role: "dbOwner", db: "testdb1" }]})
~~~


查看用户

~~~bash
> use admin
switched to db admin
> db.system.users.find()
{ "_id" : "admin.admin", "user" : "admin", "db" : "admin", "credentials" : { "SCRAM-SHA-1" : { "iterationCount" : 10000, "salt" : "Fdh2ldIW3Aw8Cxz9Dt+96g==", "storedKey" : "zbkfj6ZQH1xwGoOg8JJ6OjtR3Cs=", "serverKey" : "yqkqHABZ64rEeq1X0htOAtUnwFU=" } }, "roles" : [ { "role" : "root", "db" : "admin" } ] }
{ "_id" : "testdb1.testdb1u1", "user" : "testdb1u1", "db" : "testdb1", "credentials" : { "SCRAM-SHA-1" : { "iterationCount" : 10000, "salt" : "Xxt2uET3jRtAYVigyLUydw==", "storedKey" : "yinLG61nRFzfC+3NtB5p9RR+avM=", "serverKey" : "OX/Pdft7JWJm/g0jg07q49OC4c8=" } }, "roles" : [ { "role" : "dbOwner", "db" : "testdb1" } ] }

~~~
### 参考

https://docs.mongodb.com/manual/tutorial/enable-authentication/
https://docs.mongodb.com/manual/core/security-built-in-roles/
https://docs.mongodb.com/manual/reference/built-in-roles/