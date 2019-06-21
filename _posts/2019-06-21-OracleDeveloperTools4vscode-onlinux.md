---
layout: post
title: 在linux上安装Oracle Developer Tools for VS Code
tags: ["oracle","linux"]
---

　　安装manjaro以后，一直为安装不上oracle客户端工具而苦恼。之前在unbuntu下用的Oracle SQL Developer,在新系统下一直找不到JDK,我JDK安装不同版本，改了很多配置文件也没解决。

　　直到昨天（北京时间2019年6月20日），Oracle 发布了基于 VS Code 的开发者工具。我想我必须要试一下了，但是在vscode的扩展中安装完成后，还是无法连接数据库。

VSCode启动时报错：

~~~
Oracle Developer Tools for VS Code: Connection to language server is disconnected. Server will not restart!
~~~

选择连接数据库时报错：

~~~
command 'extension.oracleconnect' not found
~~~

后来仔细阅读文档发现，需要先安装 ".NET Core SDK version 2.2"

用命令安装

~~~
sudo pacman -S dotnet-sdk
~~~

重启后，日志显示

~~~
Information:2019/6/21 下午12:04:29:Activating Extension...
Information:2019/6/21 下午12:04:29:Oracle Developer Tools for VS Code activated!
Information:2019/6/21 下午12:04:30:Language Server ready!
~~~
　
然后连接数据库也好用了。

试着执行一个查询，效果如下图：


<img src="/static/img/2019/20190621132713.png" width = "800px" title="查询结果"/>
