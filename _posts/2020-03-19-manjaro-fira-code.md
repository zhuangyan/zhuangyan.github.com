---
layout: post
title: 在Manjaro上使用Fira Code字体进行编程
tags: ["manjaro","Fira"]
---


&emsp;&emsp;Fira 是 Mozilla 主推的字体系列，Fira Code 是基于 Fira Mono 等宽字体的一个扩展，主要特点是加入了编程连字特性（ligatures）。
Fira Code 就是利用这个特性对编程中的常用符号进行优化，比如把输入的「!=」直接显示成「≠」或者把「>=」变成「≥ 」等等，以此来提高代码的可读性。

## 🌩️下载安装
&emsp;&emsp;访问此项目首页， https://github.com/tonsky/FiraCode。找到 Download 这个链接，单击它。 
下载解压后，会有五个不同的文件夹，这是四种不同的字体类型：

  *  otf (Open Type)
  *  ttf (True Type)
  *  variable_ttf (Variable True Type)
  *  woff (Web Open Font Format)
  *  woff2 (Web Open Font Format)

对于 Open Type 和 True Type 的选择，一般有对应的 Open Type 类型字体的时候就优先选择 Open Type 类型的，因为 True Type 格式是比较早期的，限制比较多，比如字符的数量受到限制，而 Open Type 是基于 Unicode 字符集来设计的新的跨平台的字体格式。

Variable True Type 是可以无极变换的 True Type 字体。
而 Web Open Font Format 主要为网络传输优化，其特点是字体均经过压缩，其大小会比较小。

打开系统的字体管理器，点击从文件安装，选中otf下的所有文件，安装到用户，就安装成功了，预览如下：
<img src="/static/img/2020/03-04.png" width = "800px" title="otf-fira-code"/>

## 🌩️使用包管理器安装

&emsp;&emsp;在linux下可以很方便的用包管理器安装字体，如我在Manjaro下可以用pacman或yay安装
~~~
sudo pacman -S otf-fira-code
~~~
或
~~~
yay  -S otf-fira-code
~~~

## 🌩️IDE设置

### 在 Visual Studio Code 中启用
在菜单里选择[File->Preferces->Settings],或直接用快捷键（ctrl+,）打开设置界面：
<img src="/static/img/2020/03-05.png" title="settings"/>
然后点击{}编辑json文件
<img src="/static/img/2020/03-06.png" title="settings"/>
加入或修改如下两个选项：
~~~
"editor.fontFamily": "Fira Code",
"editor.fontLigatures": true,
~~~    

### 在其他IDE中启用
只需要将字体设置成 Fira Code 即可，记得如果看到“Enable font ligatures"的选项，一定要选上才能看到连字的效果！
如下是我在PyCharm中的设置：
<img src="/static/img/2020/03-07.png" title="settings"/>


## 🌩️敲代码测试一下
随便写的python代码：
<img src="/static/img/2020/03-08.png" title="python code"/>



