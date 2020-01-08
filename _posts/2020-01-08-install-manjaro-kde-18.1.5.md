---
layout: post
title: 在2020年开始使用Manjaro的KDE桌面版本
tags: ["linux","manjaro"]
---


&emsp;&emsp;2020年元旦刚过，我就把我的Manjaro Deepin给滚动更新挂了，折腾一天也没给恢复好。为了能快点开始工作，只能重新安装系统。
Manjaro官方已经不再提供deepin版本的下载，为了以后不出现问题，我下载了最新的KDE18.1.5版本。

## 🌩️安装配置

&emsp;&emsp;首先还是按照我<a href="https://zhuanlan.zhihu.com/p/70116302" target="_blank">上次的文档</a>安装配置。
然后再新增加几个开发工具
~~~
sudo pacman -S svn
yay -S net-tools
yay -S visual-studio-code-bin
yay -S python2
wget https://bootstrap.pypa.io/get-pip.py 
sudo python2 get-pip.py
yay -S pycharm
yay -S dotnet-sdk
~~~

## 🌩️遇到的问题

&emsp;&emsp;VMWARE用bundle安装文件安装后出现问题，无法启动。然后google后找到用yay安装的方法！

安装依赖：
~~~
sudo pacman -S fuse2 gtkmm linux-headers pcsclite libcanberra 
yay -S --noconfirm --needed ncurses5-compat-libs
~~~
安装软件：
~~~
yay -S --noconfirm --needed  vmware-workstation
~~~
启动相关服务：
~~~
sudo systemctl enable vmware-networks.service  vmware-usbarbitrator.service vmware-hostd.service
sudo systemctl start vmware-networks.service  vmware-usbarbitrator.service vmware-hostd.service
~~~
查看服务状态：
~~~
sudo systemctl status vmware-networks.service  vmware-usbarbitrator.service vmware-hostd.service
~~~
加载模块：
~~~
sudo modprobe -a vmw_vmci vmmon
~~~

## 🌩️放截图纪念下

<img src="/static/img/2020/mkde01.png" width = "800px" title="系统信息"/>
<img src="/static/img/2020/mkde02.png" width = "800px" title="桌面"/>
