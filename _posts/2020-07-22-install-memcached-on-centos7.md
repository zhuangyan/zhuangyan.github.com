---
layout: post
title: 在centos7上安装memcached服务
tags: ["memcached","centos"]
---


&emsp;&emsp;memcached是一套分布式的快取系统，与redis相似,其本质上就是一个内存key-value数据库。用python读取memcached数据很方便，所以我们项目通常使用memcached．

## 🌩️安装gcc
~~~
yum install gcc
yum install gcc-c++
~~~

## 🌩️安装libevent
~~~
wget https://github.com/libevent/libevent/releases/download/release-2.1.11-stable/libevent-2.1.11-stable.tar.gz
tar xvf libevent-2.1.11-stable.tar.gz 
cd libevent-2.1.11-stable
./configure --prefix=/usr --libdir=/usr/lib64
make
make install
~~~

## 🌩️安装memcached

~~~
wget http://www.memcached.org/files/memcached-1.6.6.tar.gz
tar xvf memcached-1.6.6.tar.gz
cd memcached-1.6.6
./configure && make && sudo make install
~~~

## 🌩️启动memcached

~~~
/usr/local/bin/memcached -d -m 512 -l 0.0.0.0 -p 11211 -u root
~~~
如果需要随系统启动，需要把上面命令加入到/etc/rc.d/rc.local 文件里．如果加入后还不好用，可能是rc.local文件没有可执行权限，
给执行权限就好了
~~~
chmod 755 /etc/rc.d/rc.local
~~~