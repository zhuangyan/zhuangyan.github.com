---
layout: post
title: 2020年5月15日manjaro滚动更新后出现的两个问题
tags: ["manjaro","i3wm"]
---


&emsp;&emsp;昨天把公司和家里的系统都进行了滚动更新！出现了两个问题，记录一下。

## 🌩️深度截图工具deepin-screenshot升级为deepin-screen-recorder
&emsp;&emsp;虽然新工具把截图和录屏结合一起了，但是在我的KDE和i3下，那几个图标都显示不出来，见下面我用手机拍的照片，还有就是保存图片也比较耗时了。
<img src="/static/img/2020/0516194456.jpg" width="800px" title="photo"/>

## 🌩️compton问题

&emsp;&emsp;升级后发现我设置的窗口半透明效果没有了，查看日志发现是compton报如下错误：
~~~
[ 2020年05月16日 18:29:50.544 parse_config_libconfig ERROR ] "paint-on-overlay" has been removed as an option, and the feature is enabled whenever possible
[ 2020年05月16日 18:29:50.544 main FATAL ERROR ] Failed to create new session.
~~~
在compton.conf中把paint-on-overlay相关的设置删除掉就好了！看来配置里的几个“will be removed”的选项以后也要改一下了。