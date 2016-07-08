---
layout: post
title: nodejs生产环境部署
tags: ["nodejs","服务器"]
---
  前端同学写了一个nodejs的网站，让我帮忙给部署到我们的web服务器上。我以前从来没有在生产环境上部署过nodejs的服务，这台服务器上现在也只有一个nginx+uwsgi的网站在运行。
好在nginx还是很简单的，直接在nginx.conf里加上
```nginx
server { listen 80; server_name mui.zhugyan.cn; location / { proxy_pass http://localhost:3000; } }
```
就可以了。

然后再用nohup命令以后台形式启动nodejs的web服务。
```bash
nohup node /root/bsml/bin/www &
```
这样nodejs服务就可以通过域名来访问了。

不过经过两天的运行，发现用nohup启动的后台服务总是会挂掉，所以我们需要使用其他守护方式启动，当进程挂了自动重启。
通过搜索发现https://github.com/zapty/forever-service可以满足我的需求。

```nginx
npm install -g forever
npm install -g forever-service
```
然后为我们的站点创建个服务：

```python
[root@msp-w03 conf]# 
forever-service install muid --script /root/bsml/bin/www
forever-service version 0.5.7
Platform - CentOS release 6.5 (Final)
muid provisioned successfully
Commands to interact with service muid
Start   - "sudo service muid start"
Stop    - "sudo service muid stop"
Status  - "sudo service muid status"
Restart - "sudo service muid restart"
```
这个命令就在“/etc/init.d/”在生成了一个启动脚本“muid”，里面的“Start，Stop，Status，Restart”参数都全了。
最后我们在把muid加入到自启动服务里：

```java
chkconfig --add muid
chkconfig muid on
```

