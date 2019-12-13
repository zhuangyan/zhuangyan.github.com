---
layout: post
title: 在Manjaro上安装flash player
tags: ["manjaro"]
---


&emsp;&emsp;虽然快到2020年了，但是有的在线视频播放器还是在用flash技术，如百度的web播放器cyberplayer，在播放rtmp直播流时，只能用flash播放，无法使用html5.
所以我需要在我的manjaro上安装个flash player.

&emsp;&emsp;在Flash官网上，有三种类型的flash player安装文件下载，分别是：

* FP 32 for Opera and Chromium - PPAPI
* FP 32 for Internet Explorer - ActiveX
* FP 32 for Firefox - NPAPI

我使用的是Firefox，所以下载了flash_player_npapi_linux.x86_64.tar.gz,但是我不会安装，最后在AUR搜索到了freshplayerplugin这个项目,发现一键安装后就可以用了．

## 🌩️项目介绍

&emsp;&emsp;如您所知，Adobe已经暂停了针对GNU/Linux的Flash播放器插件的进一步开发。最新的NPAPI插件版本11.2将获得5年的安全更新（自2012年5月4日发布以来），但进一步的开发已经停止。幸运与否，作为Chrome浏览器的一部分，Linux仍然可以使用较新的版本，Flash以PPAPI插件的形式捆绑在一起。PPAPI或Pepper Plugin API是Chromium/Chrome团队为浏览器插件开发的接口。这是NPAPI的灵感，但有着明显不同的API，它拥有每一个可能需要的函数插件。二维图形、OpenGL ES、字体渲染、网络访问、音频等。它是巨大的，有111组功能，称为接口，为今天Chromium浏览器提供插件。虽然规范还不是最终的，新的接口版本正在出现，一些旧的被删除；变化的速度已经明显减慢。

&emsp;&emsp;出于各种原因，Firefox开发人员现在对在Firefox中实现PPAPI不感兴趣。然而，这并不意味着不能这样做。

&emsp;&emsp;这个项目的主要目标是让PPAPI（Pepper）Flash播放器在Firefox中工作。这可以通过两种方式来实现。第一个是在Firefox中实现完整的PPAPI接口。另一个是实现一个包装器，一种类似于浏览器到PPAPI插件的适配器，一种类似于浏览器的NPAPI插件的适配器。


&emsp;&emsp;第一种方法需要对Firefox的内部知识有很强的了解，而且还需要额外的努力才能使代码成为主流。维护一组补丁看起来不是个好主意。第二种方法只允许专注于两个api。是的，其中一个很大，但仍然可以理解。第二种方法将用于该项目。它也将使其他浏览器受益，不仅仅是Firefox。

## 🌩️安装

~~~sh
    yay -S freshplayerplugin
~~~
