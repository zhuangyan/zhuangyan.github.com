---
layout: post
title: centos7上搭建lsyncd服务
tags: ["centos","lsyncd"]
---

　　三年前研究多台服务器上的文件同步用的是“unison+inotify”的方案（https://www.zhuangyan.cn/centos6-rsync/），现在又有的文件同步的需要，研究一下新的技术．发现lsyncd是很好的开源方案，所以在centos7上部署了一下．

## 简介
　　　Lysncd 实际上是lua语言封装了 inotify 和 rsync 工具，采用了 Linux 内核（2.6.13 及以后）里的 inotify 触发机制，然后通过rsync去差异同步，达到实时的效果。我认为它最令人称道的特性是，完美解决了 inotify + rsync海量文件同步带来的文件频繁发送文件列表的问题 —— 通过时间延迟或累计触发事件次数实现。另外，它的配置方式很简单，lua本身就是一种配置语言，可读性非常强。lsyncd也有多种工作模式可以选择，本地目录cp，本地目录rsync，远程目录rsyncssh。实现简单高效的本地目录同步备份（网络存储挂载也当作本地目录），一个命令搞定。源码地址是：https://github.com/axkibe/lsyncd．

## 安装

~~~
wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
yum -y install lsyncd rsync
~~~

## 配置文件

 /etc/lsyncd.conf

 ~~~
 settings {
    insist = true,
    logfile ="/usr/local/lsyncd/logs/lsyncd.log",
    statusFile ="/usr/local/lsyncd/logs/lsyncd.status",
    inotifyMode = "CloseWrite or Modify",
    maxProcesses = 15,
    }
sync {
    default.rsync,
    source    = "/home/callrobot/www/stores/_upload/wavs/",
    target    = "/home/freeswitch/sounds/formal/",
    delete="running",
    delay = 0,
    rsync     = {
        binary = "/usr/bin/rsync",
        archive = true,
        compress = true,
        verbose   = true
        }
    } 
 ~~~
目录/usr/local/lsyncd/logs需要手动创建

一般第一个参数指定lsyncd以什么模式运行：rsync、rsyncssh、direct三种模式：

- default.rsync ：本地目录间同步，使用rsync，也可以达到使用ssh形式的远程rsync效果，或daemon方式连接远程rsyncd进程；
- default.direct ：本地目录间同步，使用cp、rm等命令完成差异文件备份；
- default.rsyncssh ：同步到远程主机目录，rsync的ssh模式，需要使用key来认证

 ## 服务管理

 ~~~
systemctl start lsyncd.service
systemctl stop lsyncd.service
systemctl status lsyncd.service
systemctl enable lsyncd.service
 ~~~