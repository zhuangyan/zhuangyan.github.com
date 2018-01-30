---
layout: post
title: MongoDB用户授权配置
tags: ["mongo"]
---

MongoDB provides various features, such as authentication, access control, encryption, to secure your MongoDB deployments. 


### 1.不要把MongoDB服务器部署在互联网上或者DMZ里

MongoDB和其他的后端服务器一样，不应该部署在DMZ里，更不用说直接部署在互联网上面。你应该把MongoDB部署在公司内部网络，使用路由器或防火墙技术把MongoDB服务器保护起来，

不允许直接从互联网访问MongoDB的端口。 通过这种方式来防止未授权的访问及DDoS攻击等。

另外，如果MongoDB所在的服务器上有多个网卡，建议使用bind_ip来进一步限制MongoDB会在哪一个网络接口上监听。




### 2.为你的MongoDB实例启用安全模块


默认情况下MongoDB不会启动安全模块。任何人只要可以连接到你的MongoDB所在的服务器即可连接到你的MongoDB数据库并执行任意操作。 这些操作包括导出所有数据和配置，执行任意的Javascript，修改库内数据和删除数据等等。 为防止这些，MongoDB建议你始终要用安全模式启动MongoDB实例， 并为需要访问数据库的用户建立相应的权限。参见 <a href="https://docs.mongodb.com/manual/tutorial/enable-authentication/" target="_blank">权限控制</a> 获得更多信息。



### ３.使用SSL


MongoDB集群之间以及从客户端连接到MongoDB实例的连接应该使用SSL。使用SSL对性能没有影响并且可以防范类似于man-in-the-middle的攻击。参见 <a href="https://docs.mongodb.com/manual/tutorial/configure-ssl/" target="_blank">配置SSL</a> 以获得更多信息。 注意MongoDB社区版默认并不支持SSL。你可以选用MongoDB企业版（有SSL支持），或者从源码重新编译MongoDB并使用 —ssl 选项来获得SSL功能。




### ４.禁止HTTP和REST端口


MongoDB自己带有一个HTTP服务和并支持REST接口。在2.6以后这些接口默认是关闭的。不要开启这些服务和端口 – 他们的存在只是用于向后兼容。 




### ５.合理配置用户权限


MongoDB提供一个非常灵活的角色权限控制机制。你应该了解其正确使用。以下是一些不建议的做法：

＋　仅仅使用一个高权限用户（如root）来执行所有操作
＋　给一个用户多于他需要的权限
＋　使用弱密码或者多个账号同用一个密码
＋　删除数据库后没有删除相应的用户

MongoDB建议只分配给用户恰好足够的权限。使用复杂的密码并及时对无效用户做清理。



### ６.合理配置操作系统权限


不要使用root或者其他高权限用户来启动MongoDB。MongoDB不需要很多权限，一个普通用户以及对数据目录的读写访问一般就足够了。另外，对以下文件要配置好合适的文件权限，如，只允许mongod用户自己进行读写。

＋　数据文件
＋　秘钥、证书文件（只读）
＋　日志文件



### ７. 保护好秘钥文件

秘钥文件相当于密码， 应该使用操作系统文件权限来保护该文件不被其他用户（root除外）读取 。

### ８.SSL配置须知

＋　给MongDB实例一个或多个CA用以认证。
＋　不要使用自签名证书 – 除非你只需要用来做数据加密。自签名证书无法防止man-in-the-middle

### 9.使用审计功能

审计功能可以用来记录用户对数据库的所有相关操作。这些记录可以让系统管理员在需要的时候分析数据库在什么时段发生了什么事情。
具体请参见<a href="https://docs.mongodb.com/manual/tutorial/configure-auditing/index.html" target="_blank">配置审计</a?功能 

审计功能是一个MongoDB企业版的功能，在社区版中不支持。





