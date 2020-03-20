---
layout: post
title: 记录一次Manjaro的权限错误
tags: ["manjaro","permission"]
---


&emsp;&emsp;新年刚复工回来，不小心把系统/usr/目录的权限让我都改成普通用户权限了，刚改完后没感觉怎么样。但是把手里的工作完成后，去了一次卫生间回来，发现锁屏的电脑无法解锁了。最后无可奈何的强制重启，登录系统没有问题。然后sudo命令无法用了，提示“/usr/bin/sudo 必须属于用户 ID 0(的用户)并且设置 setuid 位”，这才知道是什么原因造成的。

## 🌩️解决主要问题
&emsp;&emsp;用root账户登录，把/usr目录权限改回来，然后还需要把/usr/bin/sudo命令的权限单独改成4755
~~~
chown -R root.root /usr/  
chmod 4755  /usr/bin/sudo
~~~

## 🌩️解决次要问题

&emsp;&emsp;把/usr/目录权限改好后，发现常用的软件只有vmware还不能用，试个改各个目录文件的权限都不行，最后还是卸载重装解决的
~~~
yay -R vmware-workstation
yay -S vmware-workstation
~~~

## 🌩️还没解决的问题
* 第一，还是最先发现的那个问题，锁屏后，输入正确的密码也提示解屏失败！无法解锁！经过分析断定是sddm服务的权限有问题，但是不知道如何解析，重新安装sddm和kcmsddm服务后依然提示有问题！
提示如下图：
<img src="/static/img/2020/03-01.png" width = "800px" title="sddm"/>
临时解决，关闭自动锁屏功能，如下图设置：
<img src="/static/img/2020/03-02.png" width = "800px" title="关闭锁屏"/>
* 第二，软件包管理工具无法使用，提示如下图：
<img src="/static/img/2020/03-03.png" width = "800px" title="关闭锁屏"/>
看提示是PolicyKit的错误，搜索发现polkit是个弹出要求输入root密码的组件。
用下面命令可以看出是有一个文件权限有问题了:
~~~
⚙ zhuangyan@zhuangyan-pc  ~  pacman -Qkk polkit  
警告：polkit: /usr/share/polkit-1/rules.d/50-default.rules (权限不够)
polkit: 198 全部文件，1 变化的文件
~~~
但我还是不知道应该改成什么，所以暂时就这样的，管理包的管理用命令行是一样的，没必要用图形界面。

## 🌩️总结
&emsp;&emsp;两个没解决的问题不影响我的正常工作，所以我打算慢慢的研究，寻找解决办法。以后我不会轻易的修改系统权限了！

