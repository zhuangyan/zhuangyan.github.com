---
layout: post
title: CentOS 6.5下NFS安装配置
tags: ["linux"]
---


###  NFS服务简介


NFS 是Network File System的缩写，即网络文件系统。一种使用于分散式文件系统的协定，由Sun公司开发，于1984年向外公布。功能是通过网络让不同的机器、不同的操作系统能够彼此分享个别的数据，让应用程序在客户端通过网络访问位于服务器磁盘中的数据，是在类Unix系统间实现磁盘文件共享的一种方法。

　　NFS 的基本原则是“容许不同的客户端及服务端通过一组RPC分享相同的文件系统”，它是独立于操作系统，容许不同硬件及操作系统的系统共同进行文件的分享。

　　NFS在文件传送或信息传送过程中依赖于RPC协议。RPC，远程过程调用 (Remote Procedure Call) 是能使客户端执行其他系统中程序的一种机制。NFS本身是没有提供信息传输的协议和功能的，但NFS却能让我们通过网络进行资料的分享，这是因为NFS使用了一些其它的传输协议。而这些传输协议用到这个RPC功能的。可以说NFS本身就是使用RPC的一个程序。或者说NFS也是一个RPC SERVER。所以只要用到NFS的地方都要启动RPC服务，不论是NFS SERVER或者NFS CLIENT。这样SERVER和CLIENT才能通过RPC来实现PROGRAM PORT的对应。可以这么理解RPC和NFS的关系：NFS是一个文件系统，而RPC是负责负责信息的传输。

###  系统环境

系统平台：CentOS release 5.6 (Final)

NFS Server IP：192.168.1.107

防火墙已关闭/iptables: Firewall is not running.

SELINUX=disabled

###  安装NFS服务

1、先用rpm -qa命令查看所需安装包（nfs-utils、rpcbind）是否已经安装：

{% highlight Bash %}
[root@local /]# rpm -qa | grep "rpcbind"
rpcbind-0.2.0-11.el6.x86_64
[root@local /]# rpm -qa | grep "nfs"
nfs-utils-1.2.3-39.el6.x86_64
nfs4-acl-tools-0.3.3-6.el6.x86_64
nfs-utils-lib-1.1.5-6.el6.x86_64
{% endhighlight %}

2、如查询结果如上，说明服务器自身已经安装了NFS，如果没有安装，则用yum命令来安装：
{% highlight Bash %}
[root@local /]# yum -y install nfs-utils rpcbind
{% endhighlight %}

3、如查询结果如上，说明服务器自身已经安装了NFS，如果没有安装，则用yum命令来安装：
{% highlight Bash %}
[root@local /]# mkdir /sharestore
{% endhighlight %}

4、NFS共享文件路径配置：
编辑/etc/exports添加下面一行，添加后保存退出。
{% highlight Bash %}
[root@local /]# vi /etc/exports
/sharestore     *(rw,sync,no_root_squash)
{% endhighlight %}

5、启动NFS服务（先启动rpcbind，再启动nfs；如果服务器自身已经安装过NFS，那就用restart重启两个服务）：
{% highlight Bash %}
[root@local /]# service rpcbind start
Starting rpcbind:                                          [  OK  ]
[root@local /]# service nfs start
Starting NFS services:                                     [  OK  ]
Starting NFS quotas:                                       [  OK  ]
Starting NFS mountd:                                       [  OK  ]
Stopping RPC idmapd:                                       [  OK  ]
Starting RPC idmapd:                                       [  OK  ]
Starting NFS daemon:                                       [  OK  ]
[root@local /]#
{% endhighlight %}

6、设置NFS服务开机自启动：
{% highlight Bash %}
[root@local /]# vi /etc/exports
[root@local /]# chkconfig rpcbind on
[root@local /]# chkconfig nfs on
{% endhighlight %}

### 客户端挂载配置

1、创建一个挂载点：
{% highlight Bash %}
[root@localhost ~]# mkdir /mnt/store
{% endhighlight %}


2、查看NFS服务器上的共享(这步在我的客户端上一直timeout,服务端的防火墙关闭也一样，但不影响下面操作)：
{% highlight Bash %}
[root@localhost /]# showmount -e 192.168.1.107
Export list for 192.168.1.107:
/sharestore *
{% endhighlight %}

3、挂载：
{% highlight Bash %}
[root@localhost ~]# mount -t nfs 192.168.1.107:/sharestore /mnt/store
{% endhighlight %}

4、查看已挂载共享：
{% highlight Bash %}
[root@localhost ~]# mount
/dev/vda3 on / type ext4 (rw)
proc on /proc type proc (rw)
sysfs on /sys type sysfs (rw)
devpts on /dev/pts type devpts (rw,gid=5,mode=620)
tmpfs on /dev/shm type tmpfs (rw)
/dev/vda1 on /boot type ext4 (rw)
none on /proc/sys/fs/binfmt_misc type binfmt_misc (rw)
/dev/vdb1 on /storage type ext4 (rw)
sunrpc on /var/lib/nfs/rpc_pipefs type rpc_pipefs (rw)
nfsd on /proc/fs/nfsd type nfsd (rw)
192.168.1.107:/sharestore on /mnt/store type nfs (rw,vers=4,addr=192.168.1.107,clientaddr=192.168.1.108)
{% endhighlight %}

5、设置开机自动挂载：
{% highlight Bash %}
[root@localhost ~]# vi /etc/fstab
{% endhighlight %}
增加一行
{% highlight Bash %}
192.168.1.107:/sharestore    /mnt/store   nfs    defaults 0 0
{% endhighlight %}

