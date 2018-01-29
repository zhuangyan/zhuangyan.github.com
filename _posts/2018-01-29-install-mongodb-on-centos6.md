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



