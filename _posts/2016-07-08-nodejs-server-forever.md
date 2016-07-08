---
layout: post
title: nodejs生产环境部署
tags: ["nodejs","服务器"]
---
  前端同学写了一个nodejs的网站，让我帮忙给部署到我们的web服务器上。我以前从来没有在生产环境上部署过nodejs的服务，这台服务器上现在也只有一个nginx+uwsgi的网站在运行。
好在nginx还是很简单的，直接在nginx.conf里加上一个server配置就可以了。

然后再用nohup命令以后台形式启动nodejs的web服务