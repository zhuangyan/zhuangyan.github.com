---
layout: post
title: python音轨分离神器
tags: ["python"]
---


&emsp;&emsp;春季的时候，孩子小学要有个国学的演出活动，班主任想让班级孩子集体朗诵＜诗经＞片断，但需要伴奏音乐.想把爱奇艺的视频下载下来，取其中的背景音乐．但是不知道怎么下载，所以就找到了我（家长里唯一从事电脑相关工作的）．下载很简单，我如you-get就搞定了，视频音频我也给分离出来了．但是老师还有个要求，就是要把音乐里的人声和乐器伴奏声分离出来（我分离出来的音频是古琴，鼓点，孩子的朗诵声在一起的）．当时我找了好几个windows下的软件，调了好几个参数，也没有弄出好的效果．后来就不了了之了．

&emsp;&emsp;直到今天，我看到了 Spleeter这个开源工具，就又把这个事件想起来了，试了一下，效果是相当的好！

## 软件介绍

音轨分离软件 spleeter，只需输入一段命令就可以将音乐的人声和各种乐器声分离，支持 mp3、wav、ogg 等常见音频格式。

Spleeter 基于 TensorFlow 开发，本身运行速度非常快。分离过程可以在 GPU 或 CPU 上执行。在 GPU 上运行，如果它将音频文件分成四个音轨，可以比实时速度快 100 倍。 

<img src="/static/img/2019/spleeter01.jpg" width = "800px" title="示意图"/>

## 安装

官方文档推荐用 Conda 环境安装，如下所示：
~~~sh
git clone https://github.com/Deezer/spleeter
conda env create -f spleeter/conda/spleeter-cpu.yaml

~~~
其实用pip也是可以安装成功的

## 使用

首先试一下示例的mp3文件，是没问题的
~~~py
conda activate spleeter-cpu
spleeter separate -i spleeter/audio_example.mp3 -p spleeter:2stems -o output
~~~

然后，我测试了一下爱奇艺下载的mp4文件

<img src="/static/img/2019/spleeter02.png" width = "800px" title="程序运行截图"/>
