---
layout: post
title: Manjaro下的anaconda安装及使用
tags: ["python","anaconda"]
---


&emsp;&emsp;由于新安装了系统及开发环境，所以我决定以后用Anaconda来管理我的python开发环境。



## 🌩️Anaconda简介
&emsp;&emsp;Anaconda是一个方便的python包管理和环境管理软件，一般用来配置不同的项目环境。
我们常常会遇到这样的情况，正在做的项目A和项目B分别基于python2和python3，而第电脑只能安装一个环境，这个时候Anaconda就派上了用场，它可以创建多个互不干扰的环境，分别运行不同版本的软件包，以达到兼容的目的。
Anaconda通过管理工具包、开发环境、Python版本，大大简化了你的工作流程。不仅可以方便地安装、更新、卸载工具包，而且安装时能自动安装相应的依赖包，同时还能使用不同的虚拟环境隔离不同要求的项目。


## 🌩️安装配置

~~~
yay -S anaconda
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
conda config --set show_channel_urls yes
source /opt/anaconda/bin/activate root
~~~

## 🌩️基本用法

### 查看帮助

~~~
conda help    
~~~

### 环境管理

~~~
列出所有可用环境
conda env list
conda info --envs
进入环境 
source activate 环境名 
退出环境
source deactivate 环境名
创建一个新环境想
conda create --name test_py2 python=2.7
从旧的环境克隆出一个新环境
conda create -n your_env_name --clone oldname
删除某个环境
conda remove -n your_env_name --all
导出环境配置
conda env export > environment.yml
用导出的配置生成一个新环境 
conda env create -f environment.yml
~~~

### 包管理
~~~
conda list 列举当前环境下的所有包
conda list -n packagename 列举某个特定名称包
conda install packagename 为当前环境安装某包
conda install -n envname packagename 为某环境安装某包
conda search packagename 搜索某包
conda updata packagename 更新当前环境某包
conda update -n envname packagename 更新某特定环境某包
conda remove packagename 删除当前环境某包
conda remove -n envname packagename 删除某环境环境某包
~~~

~~~
conda本身和anaconda、python本身也算包
conda update conda
conda update anaconda
conda update python
~~~