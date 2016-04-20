---
layout: post
title: JWT认证的RESTful API
---

 又开始写手机应用的服务端了，在前一公司，不想学安卓客户端，自己选择在项目中写过服务端接口。现在想学客户端开发了，但是由于项目人员的情况，还得由我来写服务端。四年前写服务端是用java,用session方式对客户端进行鉴权。因为现在都流行RESTful API风格了，查询文档发现有个叫“JWT”的鉴权方式更加符合RESTful的规范。

### 1.几种http api鉴权方式

*  使用在HTTP规范中的Basic Auth，这个配置也是相当的简单，在nginx端针对路由location配置下就可以用了 。原理上，客户端必须在每个子响应是附加它们的凭证（credenbtial），包括他的账号和密码 。如果这些凭证通过了，那么用户的信息就会被传递到服务端应用。
requests.get(‘https://api.github.com/user’, auth=(‘user’, ‘pass’))
<Response [200]>
*  SessionAuthentication。配合浏览器的Cookie一起使用，主要是为了解决HTTP这一无状态协议下服务器如何识别用户的问题，其原理就是在用户登录通过验证后，服务端 将数据加密后保存到客户端浏览器的Cookie中，同时服务器保留相对应的Session（文件或DB）。用户之后发起的请求都会携带Cookie信息， 服务端需要根据Cookie寻回对应的Session，从而完成验证，确认这是之前登陆过的用户。
*  OAuth（或者OAuth2）。为第三方的认证所设计，但是更难配置。至少在服务器端更难。
*  TOKEN的机制。 在各种客户端上每次都让用户提交用户名和密码，这有些不合理的。 通常的情况是客户端通过一些可靠信息和服务器交换取token，这个token作为客服端再次请求的权限钥匙，当然token也是存在有效时间控制的。 Token通常比密码更加长而且复杂。那么一旦获得了token，在每次调用API的时候都要附加上它。这仍然比直接发送账户和密码更加安全，哪怕是 HTTPS。
把token想象成一个安全的护照。你在一个安全的前台验证你的身份（通过你的用户名和密码），如果你成功验证了自己，你就可以取得这个。当你走进大楼的时候（试图从调用API获取资源），你会被要求验证你的护照，而不是在前台重新验证。
*  JWT(JSON Web Token)方案，给客户端的是公钥，然后用公钥把数据加密发送给服务端，服务端在根据来源的信息，使用对应的私钥来解析数据。这样就能保证数据的安全性。类似https的方式 JWT里面会含有这么几个字段。


### 2.JSONWebTokenAuthentication和SessionAuthentication的比较

通过比较可以看出，使用JWT可以省去服务端读取Session的步骤，这样更符合RESTful的规范。但是对于客户端（或App端）来说，为 了保存用户授权信息，仍然需要通过Cookie或类似的机制进行本地保存。因此JWT是用来取代服务端的Session而非客户端Cookie的方案，当 然对于客户端本地存储，HTML5提供了Cookie之外更多的解决方案（localStorage/sessionStorage），究竟采用哪种存储方式，其实从Js操作上来看没有本质上的差异，不同的选择更多是出于安全性的考虑。


### 3.使用REST framework JWT实现JWT认证的RESTful API

用pip 安装
{% highlight bash %}
    pip install djangorestframework-jwt 
{% endhighlight %}
settings.py设置：
{% highlight python %}
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
    ),
}
{% endhighlight %}
urls.py设置：
{% highlight python %}
urlpatterns = patterns(
    '',
    # ...

    url(r'^api-token-auth/', 'rest_framework_jwt.views.obtain_jwt_token'),
)
{% endhighlight %}
测试：
linux下可以用curl命令：
{% highlight bash  %}
$ curl -X POST -d "username=admin&password=abc123" http://localhost:8000/api-token-auth/
{% endhighlight %}
也可以发送json数据
{% highlight bash  %}
$ curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"abc123"}' http://localhost:8000/api-token-auth/
{% endhighlight %}
认证成功后会返回token信息，如
{% highlight bash  %}
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluaXN0cmF0b3IiLCJ1c2VyX2lkIjoxLCJlbWFpbCI6IjEzMTMwMjYxMjIxQDE2My5jb20iLCJleHAiOjE0NDU5MTM4NTF9._IkIDM11c8sJdn-ETHyPCHAc5bH-YGA_cPaV1lr8wOU"}
{% endhighlight %}
你可以用这个token请求需要认证的接口了
{% highlight bash  %}
$ $ curl -H "Authorization: JWT <your_token>" http://localhost:8000/protected-url/
{% endhighlight %}
Authorization正确则会正常返回请求信息，如果头消息中没有Authorization会返回：{"detail":"Authentication credentials were not provided."}，Authorization中的token错误会返回“{"detail":"Error decoding signature."}”

在windows下，你可以用restclient-ui图形化工具测试你的restful api

<em class="center"><img src="/static/img/JWT_RESTClient_Test1.png"></em>
<em class="center"><img src="/static/img/JWT_RESTClient_Test2.png"></em>



