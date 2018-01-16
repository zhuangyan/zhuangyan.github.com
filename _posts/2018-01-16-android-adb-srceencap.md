---
layout: post
title: Android截图命令screencap
tags: ["android","adb"]
---

Android截图命令学习，用来写游戏外挂挺好，截图到电脑上进行分析．



### 查看帮助命令

{% highlight Bash %}

zhuangyan@zhuangyan-pangu ~$ adb shell screencap -v
screencap: invalid option -- v
usage: screencap [-hp] [-d display-id] [FILENAME]
   -h: this message
   -p: save the file as a png.
   -d: specify the display id to capture, default 0.
If FILENAME ends with .png it will be saved as a png.
If FILENAME is not given, the results will be printed to stdout.

{% endhighlight %}

注意:

如果文件名以.png结尾时，它将保存为png文件

如果文件名没有给出,则结果被会被输出到stdout



### 截图保存到SD卡里再导出


{% highlight Bash %}
$ adb shell screencap -p /sdcard/screen.png
$ adb pull /sdcard/screen.png
$ adb shell rm /sdcard/screen.png
{% endhighlight %}

### 截图直接保存到电脑


{% highlight Bash %}

$ adb shell screencap -p | sed 's/\r$//' > screen.png

{% endhighlight %}


执行adb shell 将\r\n转换为\n, 因此需要用sed删除多余的\r
注：可能有的手机不需要转换，有的要把＼r\r\n转换成\n!


### 如果直接当命令用还可以用 alias 包裝装起來：


{% highlight Bash %}
$ alias and-screencap="adb shell screencap -p | sed 's/\r$//'"
$ and-screencap > screen.png 
{% endhighlight %}

