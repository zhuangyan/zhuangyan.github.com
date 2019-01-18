---
layout: post
title: 海龟绘图入门
tags: ["turtle","python"]
---

Python 自带了一个非常有趣的 海龟绘图程序 (turtle),诞生于1969年 , 主要用于程序设计入门,门级别的图形绘制函数.

在window下可以直接引用，在Ubuntu系统下的使用时，在python文件中（或者运行python/python3）导入import turtle时出现崩溃traceback。

在Terminal键入
```sh
sudo apt-get install python-tk
```
安装python-tk，然后再次运行即可。
如果使用的是python3,在Terminal里键入
```sh
sudo apt-get install python3_tk
```
安装python3_tk,然后运行即可。

### 表 1：turtle 库的画笔绘制状态函数（共 3 个）

| 函数 | 描述 | 
| ------ | ------ |
|pendown()	| 放下画笔|
|penup()	| 提起画笔，与 pendown()配对使用|
|pensize(width) |	设置画笔线条的粗细为指定大小|


### 表 ２：turtle 库的画笔运动的函数（共 13 个）

| 函数 | 描述 | 
| ------ | ------ |
| forward() | 	沿着当前方向前进指定距离 |
| backward() | 	沿着当前相反方向后退指定距离 |
| right(angle) | 	向右旋转 angle 角度 |
| left(angle) | 	向左旋转 angle 角度 |
| goto(x,y) | 	移动到绝对坐标（x,y）处 |
| setx( ) | 	将当前 x 轴移动到指定位置 |
| sety( ) | 	将当前 y 轴移动到指定位置 |
| setheading(angle) | 	设置当前朝向为 angle 角度 |
| home() | 	设置当前画笔位置为原点，朝向东。 |
| circle(step) | 	绘制一个指定半径，角度、以及绘制步骤 step 的 |
| dot(r,color) | 	绘制一个指定半径 r 和颜色 color 的圆点 |
| undo() | 	撤销画笔最后一步动作 |
| speed() | 	设置画笔的绘制速度，参数为 0-10 之间 |

### 表 3: turtle 库的控制画笔颜色和字体的函数（共 11 个）

| 函数 | 描述 | 
| ------ | ------ |
| color() | 	设置画笔的颜色 |
| begin_fill() | 	填充图形前，调用该方法 |
| end_fill() | 	填充图形结束 |
| filling() | 	返回填充的状态，True 为填充，False 为未填充 |
| clear() | 	清空当前窗口，但不改变当前画笔的位置 |
| reset() | 	清空当前窗口，并重置位置等状态为默认值 |
| screensize() | 	设置画布的长和宽 |
| hideturtle() | 	隐藏画笔的 turtle 形状 |
| showturtle() | 	显示画笔的 turtle 形状 |
| isvisible() | 	如果 turtle 可见，则返回 True |
| write(str，font=None) | 	输出 font 字体的字符串 |



### 示例

```sh

# !/usr/bin/env python
# -*- coding: utf-8 -*- 
# @Author: zhuangyan 


from turtle import *
from time import sleep

def go_to(x, y):
   up()
   goto(x, y)
   down()


def big_Circle(size):  #函数用于绘制心的大圆
   speed(10)
   for i in range(150):
       forward(size)
       right(0.3)

def small_Circle(size):  #函数用于绘制心的小圆
   speed(10)
   for i in range(210):
       forward(size)
       right(0.786)

def line(size):
   speed(1)
   forward(51*size)

def heart( x, y, size):
   go_to(x, y)
   left(150)
   begin_fill()
   line(size)
   big_Circle(size)
   small_Circle(size)
   left(120)
   small_Circle(size)
   big_Circle(size)
   line(size)
   end_fill()


def arrow():
    pensize(10)
    setheading(0)
    go_to(-400, 0)
    left(15)
    forward(150)
    go_to(339, 178)
    forward(150)

def arrowHead():
    pensize(1)
    speed(5)
    color('red', 'red')
    begin_fill()
    left(120)
    forward(20)
    right(150)
    forward(35)
    right(120)
    forward(35)
    right(150)
    forward(20)
    end_fill()


def main():
   pensize(2)
   color('red', 'pink')
   #getscreen().tracer(30, 0) #取消注释后，快速显示图案
   heart(200, 0, 1)          #画出第一颗心，前面两个参数控制心的位置，函数最后一个参数可控制心的大小
   setheading(0)             #使画笔的方向朝向x轴正方向
   heart(-80, -100, 1.5)     #画出第二颗心
   arrow()                   #画出穿过两颗心的直线
   arrowHead()               #画出箭的箭头
   go_to(400, -300)
   done()


main()
```
