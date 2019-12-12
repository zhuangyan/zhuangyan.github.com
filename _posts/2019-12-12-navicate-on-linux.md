---
layout: post
title: 在linux上安装navicat
tags: ["linux"]
---


&emsp;&emsp;我是在manjaro下安装的，其他发行版本设置一样，都是基于wine的．

## 🌩️安装

~~~sh
    yay -S navicat
:: There are 3 providers available for navicat:
:: Repository AUR
    1) navicat-lite 2) navicat121_premium_cs_x64 3) navicat121_premium_en_x64 

~~~

可以选择lite版，中文版　和英文版

## 🌩️中文显示设置

~~~sh
    vi /opt/navicat/start_navicat 
    修改　export LANG="en_US.UTF-8"　为　export LANG="zh_CN.UTF-8"
~~~

## 🌩️试用过期问题

~~~sh
    rm -f  ~/.navicat64/system.reg
~~~