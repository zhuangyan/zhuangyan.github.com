---
layout: post
title: Android的URLEncoder编码问题
---
我们安卓客户端与服务接口进行交换时需要对字符串参数进行URLEncoder编码。测试时发现，用java.net.URLEncoder类encode以后,会把空格转变成"+"。由于服务端是用python写的，用urllib.unquote无法正常解码。

{% highlight python %}
from urllib import unquote
>>> msg = u"Hello+World"
>>> print unquote(str(msg)).decode("UTF-8")
Hello+World
{% endhighlight %}
而在<a href="http://tool.chinaz.com/tools/urlencode.aspx" target="_blank">这个测试网页</a>,不管编码是“+”还是“%20”，都会解码为空格”。
服务端我没有找到好的解码方式，所以只能在客户端进行修改，把空格编码为“%20”
经查找发现，可以用android.net.Uri类完成此功能
{% highlight java %}
import android.net.Uri;
String input = "Hello World";
String urlEncode = Uri.encode(input);
System.out.println("urlEncode="+urlEncode);
{% endhighlight %}


百度百科对URL和URI的解释为：

>百分号编码(Percent-encoding), 也称作URL编码(URL encoding), 是特定上下文的统一资源定位符 (URI)的编码机制. 实际上也适用于统一资源标志符(URI)的编码. 也用于为"application/x-www-form-urlencoded" MIME准备数据, 因为它用于通过HTTP的请求操作(request)提交HTML表单数据。
URI所允许的字符分作保留与未保留. 保留字符是那些具有特殊含义的字符. 例如, 斜线字符用于URL (或者更一般的, URI)不同部分的分界符. 未保留字符没有这些特殊含义. 百分号编码把保留字符表示为特殊字符序列. 上述情形随URI与URI的不同版本规格会有轻微的变化。

详细可以参考:

+  <a target="_blank" href="http://www.ibm.com/developerworks/cn/xml/x-urlni.html">分清 URI、URL 和 URN</a><br/>
+  <a target="_blank" href="http://baike.baidu.com/view/160675.htm">百度百科URI</a><br/>
+  <a target="_blank" href="http://baike.baidu.com/view/1197115.htm">百度百科urlencode </a><br/>