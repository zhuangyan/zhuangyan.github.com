---
layout: post
title: python在windows多线程下的文件日志记录问题解决
tags: ["python","logging"]
---


Python中的logging模块自带的一些handlers,在使用多线程的情况在，部署在windows系统时，会报＂另一个程序正在使用此文件，进程无法访问。＂的错误．

## 解决方法

使用　https://github.com/Preston-Landers/concurrent-log-handler

安装：
~~~sh
pip install concurrent-log-handler
~~~

使用：
~~~java
from logging import getLogger, INFO
from concurrent_log_handler import ConcurrentRotatingFileHandler
import os

log = getLogger()
# Use an absolute path to prevent file rotation trouble.
logfile = os.path.abspath("mylogfile.log")
# Rotate log after reaching 512K, keep 5 old copies.
rotateHandler = ConcurrentRotatingFileHandler(logfile, "a", 512*1024, 5)
log.addHandler(rotateHandler)
log.setLevel(INFO)

log.info("Here is a very exciting log message, just for you")
~~~

