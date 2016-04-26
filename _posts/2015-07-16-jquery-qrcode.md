---
layout: post
title: 使用jquery.qrcode生成二维码
tags: ["javascript","jquery"]
---
听说公司技术部的建站系统实现了网页自动生成二维码的功能，我也研究下，发现用qrcode实现实在太简单了。

qrcode其实是通过使用jQuery实现图形渲染，画图，支持canvas（HTML5）和table两种方式，您可以到<a href="https://github.com/jeromeetienne/jquery-qrcode" target="_blank">https://github.com/jeromeetienne/jquery-qrcode</a>获取最新的代码。

## 如何使用

### 首先在页面中加入jquery库文件和qrcode插件

{% highlight html %}
<script type="text/javascript" src="jquery.js"></script> 
<script type="text/javascript" src="jquery.qrcode.min.js"></script> 
{% endhighlight %}
### 在页面中需要显示二维码的地方加入以下代码
{% highlight html %}
<div id="code"></div> 
{% endhighlight %}
### 调用qrcode插件
qrcode支持canvas和table两种方式进行图片渲染，默认使用canvas方式，效率最高，当然要浏览器支持html5。直接调用如下：
{% highlight javascript %}
$('#code').qrcode("http://www.zhuangyan.cn"); //任意字符串 
{% endhighlight %}
您也可以通过以下方式调用：
{% highlight javascript %}
$("#code").qrcode({ 
    render: "table", //table方式 
    width: 200, //宽度 
    height:200, //高度 
    text: "www.zhuangyan.cn" //任意内容 
}); 
{% endhighlight %}
这样就可以在页面中直接生成一个二维码，你可以用手机“扫一扫”功能读取二维码信息。

### 识别中文

我们试验的时候发现不能识别中文内容的二维码，通过查找多方资料了解到，jquery-qrcode是采用charCodeAt()方式进行编码转换的。而这个方法默认会获取它的Unicode编码，如果有中文内容，在生成二维码前就要把字符串转换成UTF-8，然后再生成二维码。您可以通过以下函数来转换中文字符串：
{% highlight javascript %}
function toUtf8(str) {    
    var out, i, len, c;    
    out = "";    
    len = str.length;    
    for(i = 0; i < len; i++) {    
        c = str.charCodeAt(i);    
        if ((c >= 0x0001) && (c <= 0x007F)) {    
            out += str.charAt(i);    
        } else if (c > 0x07FF) {    
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));    
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));    
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));    
        } else {    
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));    
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));    
        }    
    }    
    return out;    
} 
{% endhighlight %}
以下示例：
{% highlight javascript %}
var str = toUtf8("股市有风险"); 
$('#code').qrcode(str); 
{% endhighlight %}