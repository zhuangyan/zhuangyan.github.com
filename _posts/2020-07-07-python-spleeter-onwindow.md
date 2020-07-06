---
layout: post
title: python音轨分离神器spleeter在window上的详细安装步骤
tags: ["python"]
---


&emsp;&emsp;去年写了一篇关于python音轨分离神器spleeter的文章，但是我写的是在linux下安装的，总有人在评论里问如何在window下安装。所以我打算在window下安装试一下。

## 打开官方原码库

https://github.com/deezer/spleeter，我发现源码结构，确实和去年不同了。 
我安装的过程也不是很顺利，所以请按我下面的步骤来，避免踩坑。

## 安装anaconda

https://www.anaconda.com/products/individual，在这里下载个人版进行安装。

安装完成后，在开始菜单 里打开Anaconda Powershell Prompt (anaconda3)，以下命令都在这里完成。

## conda设置 

添加目前可用的中科大镜像源：

~~~
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/free/
~~~
并设置搜索时显示通道地址：
~~~
conda config --set show_channel_urls yes
~~~
确认是否安装镜像源成功，执行conda config --show，找到channels值为如下：

~~~
channels:
  - https://mirrors.ustc.edu.cn/anaconda/pkgs/free/
  - defaults
~~~

## 安装spleeter

注意首先要新建立一个python3.7的虚拟环境！
~~~
conda create -n py37 python=3.7
conda activate py37
~~~
最后安装spleeter包：
~~~
conda install -c conda-forge spleeter
~~~

我到这里主安装成功了，如果按这个步骤来还有什么问题，请给我留言。



