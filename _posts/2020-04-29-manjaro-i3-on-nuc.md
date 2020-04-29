---
layout: post
title: 在NUC上体验Manjaro
tags: ["manjaro","i3wm"]
---


&emsp;&emsp;本月入手一个NUC主机在家使用，安装双系统，win10给孩子上网课，linux写代码。由于入手的＂艾莱峡谷＂无法扩展内存，为了节省资源，linux没有安装在公司使用的Manjaro KDE,而是最终选择了Manjaro i3.安装配置过程中的一些问题记录一下．

## 🌩️中文显示问题
&emsp;&emsp;现在最近版本(manjaro-i3-20.0-200426-linux56)在安装时中文无法正常显示，可以选择英文提示安装，我是选择的中文，然后看着一堆方块猜着输入信息，然后点下一步下一步完成的．
安装完成后首次进入系统，你会发现桌面右上角日历上显示的＂x月，星期x"的中文字符显示不为方块，你需要修改配置文件/usr/share/conky/conky_maia
把其中默认的字体＂Bitstream Vera＂改为＂anti＂
还有浏览器的标题或其他软件显示中文还会有问题，这时就需要安装新的中文字体解决！
~~~
sudo pacman -S wqy-bitmapfont
sudo pacman -S wqy-microhei
sudo pacman -S wqy-zenhei
~~~

## 🌩️输入法问题

&emsp;&emsp;中文输入法安装fcitx就可以，通常人们还会安装搜狗输入法，我用默认的五笔就可以了．
~~~
 sudo pacman -S fcitx-im    #默认全部安装
 sudo pacman -S fcitx-configtool
~~~
和我之前在KDE里的启用方式不用，KDE里在.xprofile中设置就可以启用了，i3的配置文件是.i3/config
~~~
exec --no-startup-id ~/script
~~~

## 🌩️快捷键绑定
我有的截图工具是deepin-screenshot,绑定快捷键也是在.i3/config里加入　
~~~
 $mod+Shift+A exec --no-startup-id deepin-screenshot
~~~

## 🌩️结语
第一次使用平铺窗口管理器，有很多特性还在探索中，最后来一下neofetch的截图(我在kde中的neofetch无法显示w3m图片，新系统中终于好用了)和桌面截图(默认桌面,还不会美化)：
<img src="/static/img/2020/manjaroi303.png" width="800px" title="neofetch"/>
<img src="/static/img/2020/manjaroi302.png" width="800px" title="桌面"/>







