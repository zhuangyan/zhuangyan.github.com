---
layout: post
title: CherryPy的WSGIServer使用
tags: ["cherrypy","WSGIServer"]
---

<a href="https://cherrypy.org/">CherryPy</a>是一个最简单的python web框架．

它虽简单，但是还内置了一个不错的WSGIServer．
在和Gunicorn，Meinheld的基准测试中，表现不差，具体数据请<a href="https://blog.appdynamics.com/engineering/a-performance-analysis-of-python-wsgi-servers-part-2/">点击这里</a>查看（在这个测试中你还会看到Bjoern的强大和我们常用的uWSGI的不尽人意）.

所以我在智能呼叫系统的rpc服务中使用了CherryPy的WSGIServer做为WSGI服务器．

具体用法非常简单
```py
if __name__ == '__main__':
    from cheroot.wsgi import Server as WSGIServer
    server = WSGIServer(('0.0.0.0', 4000), application)
    server.start()
```

注意，老版本的CherryPy是＂from cherrypy import wsgiserver＂．

