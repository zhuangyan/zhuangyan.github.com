---
layout: post
title: django-rest-framework的JWT认证跨域问题解决
tags: ["django","jwt","cors"]
---

公司准备搞前后端分离，我想写一个ajax跨域请求远程接口的例子，我首先想到了２年多前写的ＡＰＰ服务端接口，那是一个JWT认证的接口，但是我写ajax测试的时候，登录请求总是失败！
错误信息为：
~~~
Failed to load http://10.1.1.102:8080/api/api-token-auth/: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access. The response had HTTP status code 400.
~~~
但是这个接口在用CURL命令测试，IOS和Android客户端请求都是好用的！
百度到，这是因为服务端需要设置＂跨域资源共享 CORS"的原因！
又搜索到　django设置CORS非常简单，只要安装配置一下django-cors-headers就可以.
可是我配置完django-cors-headers,启动工程一直出错！
查半天没发现原因，最后才看到文档里的一句，此组件只支持django1.8及以上版本．
我两年前的项目是用django1.6写的，我只好用最新版本的2.0.1重新写的一个测试的服务接口．

完！

### 参考

＊　http://www.ruanyifeng.com/blog/2016/04/cors.html
＊　https://github.com/ottoyiu/django-cors-headers
＊　https://github.com/GetBlimp/django-rest-framework-jwt