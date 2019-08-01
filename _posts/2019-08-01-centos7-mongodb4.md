---
layout: post
title: centos7下安装mongodb4
tags: ["manjaro"]
---

使用的是阿里云主机的centos7.4

## 下载源文件
~~~
ce /usr/
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-4.0.11.tgz

~~~

## 解压
~~~
tar zxvf mongodb-linux-x86_64-4.0.11.tgz 
mv mongodb-linux-x86_64-4.0.11 mongodb
~~~

## 配置环境变量
~~~
vim /etc/profile
~~~

增加
~~~
#Set Mongodb
export PATH=/usr/mongodb/bin:$PATH

~~~

~~~
source /etc/profile
~~~

## 创建数据库目录
~~~
$ cd /usr/mongodb
$ touch mongodb.conf
$ mkdir db
$ mkdir log
$ cd log
$ touch mongodb.log
~~~

## 修改mongodb配置文件。
~~~
vim /usr/mongodb/mongodb.conf
~~~

添加以下内容
~~~
port=27017 #端口
dbpath= /usr/mongodb/db #数据库存文件存放目录
logpath= /usr/mongodb/log/mongodb.log #日志文件存放路径
logappend=true #使用追加的方式写日志
fork=true #以守护进程的方式运行，创建服务器进程
maxConns=100 #最大同时连接数
noauth=true #不启用验证
journal=true #每次写入会记录一条操作日志（通过journal可以重新构造出写入的数据）。
#即使宕机，启动时wiredtiger会先将数据恢复到最近一次的checkpoint点，然后重放后续的journal日志来恢复。
storageEngine=wiredTiger  #存储引擎有mmapv1、wiretiger、mongorocks
~~~

## 设置文件夹权限
~~~
$ cd /usr/mongodb
$ chmod 777 db
$ chmod 777 log
~~~
## 启动mongodb

~~~
$ mongod --f /usr/mongodb/mongodb.conf
~~~

