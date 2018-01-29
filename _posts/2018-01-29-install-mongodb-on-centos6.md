---
layout: post
title: Centos6下安装Mongodb服务
tags: ["mongo"]
---

分源码安装和yum安装两部分



### 1.源码安装

#### 1)下载安装文件

~~~bash
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.6.1.tgz
~~~

#### 2)解压安装文件

~~~bash
tar -zxvf mongodb-linux-x86_64-3.6.1.tgz
~~~


#### 3)拷贝文件到目标目录

~~~bash
mkdir -p mongodb
cp -R -n mongodb-linux-x86_64-3.6.1/ mongodb
~~~


#### 4)设置程序执行目录

~~~bash
export PATH=<mongodb-install-directory>/bin:$PATH
~~~


### 2.yum安装

创建文件 /etc/yum.repos.d/mongodb-org-3.6.repo

文件内容为:

~~~
[mongodb-org-3.6]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.6/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.6.asc
~~~

执行yum命令安装

~~~bash
sudo yum install -y mongodb-org
~~~


