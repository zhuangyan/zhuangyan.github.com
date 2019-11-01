---
layout: post
title: python在windows多线程下的文件日志记录问题解决
tags: ["python","logging"]
---


pathlib是python3.4之后标准库里加入的新模块．它使用面向对象的编程方式来表示文件系统路径。可以用来代替之前的os.path子模块．

## 基本用法

~~~py
In [1]: from pathlib import Path                                                                                

In [2]: p = Path("/home/zhuangyan/")                                                                            

In [3]: p                                                                                                       
Out[3]: PosixPath('/home/zhuangyan')

In [4]: str(p)                                                                                                  
Out[4]: '/home/zhuangyan'

In [5]: Path('/').joinpath('home', 'zhuangyan/www')                                                               
Out[5]: PosixPath('/home/zhuangyan/www')

In [6]: p.name                                                                                                  
Out[6]: 'zhuangyan'
~~~

## 路径拼接
~~~py
In [7]: Path('/').joinpath("a","b/c")                                                                           
Out[7]: PosixPath('/a/b/c')

In [8]: Path('/') / 'b' / Path("c") / "d"                                                                      
Out[8]: PosixPath('/b/c/d')
~~~

## 读写文件

~~~py
In [9]:  p = Path('~/hello.txt').expanduser()                                                                  

In [10]: p.read_text()                                                                                          
Out[10]: 'hello world\n'

In [11]: p.write_bytes(b'la la la\n')                                                                           
Out[11]: 9

In [12]: p.read_text()                                                                                          
Out[12]: 'la la la\n'

~~~

## 查看所有者

~~~py
In [25]: p.owner()                                                                                              
Out[25]: 'zhuangyan'

~~~

## mkdir
过去创建目录时，用os.mkdir只能创建一级目录:

~~~py
In [29]: Path('1/2/3').mkdir(parents=True)
~~~