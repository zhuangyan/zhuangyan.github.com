---
layout: post
title: 百度音视频直播LSS平台SDK开发学习之二安全策略
tags: ["baidu","LSS"]
---


音视频直播安全策略是用于配置直播流安全机制的一组策略，包括在直播过程中使用的推流/播放认证、内容加密（即将开放）、防盗链三种安全保障机制。


## 推流认证

为确保推流地址不被非法占用，LSS提供token认证和有效期限相结合的推流地址。开启推流认证后，您可以通过”推流地址+超时时间+密钥”的方式获取完整的加密推流地址。

假设您对默认安全组进行了更新，同时打开了推流认证，并从控制台获取到密钥key，例如值为asdfghjkl。对于推流地址rtmp://<push.your-domain.com>/<your-app>/<your-stream>，token计算方式及合法推流地址如下所示：

> sha256_hex('rtmp://<push.your-domain.com>/<your-app>/<your-stream>;2017-08-15T01:00:00Z', 'asdfghjkl')

> 其中`2017-08-15T01:00:00Z`为token的超时时间，您可以根据此格式自行进行设置时间。举例，当前时间为北京时间2017年08月15日上午06:00:00，设置的超时时间为3小时，则超时时间为2017年08月15日9点，因token中时间为utc时间（utc时间=北京本地时间-时区差8小时），则token中的超时时间为2017-08-15T01:00:00Z。

 提供四种语言的计算sample code作为参考：

java

~~~java
 public String sha256Hex(String stringToSign, String signingKey) {
 	try {
 		Mac mac = Mac.getInstance("HmacSHA256");
 		mac.init(new SecretKeySpec(signingKey.getBytes(Charset.forName("UTF-8")), "HmacSHA256"));
 		return new String(Hex.encodeHex(mac.doFinal(stringToSign.getBytes(Charset.forName("UTF-8")))));
 	} catch (Exception e) {
 		e.printStackTrace();
		}
 }
~~~

python

~~~python
 def sha256_hex(string_to_sign, signing_key):
 	return hmac.new(signing_key, string_to_sign, hashlib.sha256).hexdigest()
~~~

php
~~~php
 function sha256_hex($string_to_sign, $siging_key) {
 	return hash_hmac('sha256', $string_to_sign, $siging_key);
 }
~~~

Nodejs

~~~js
function sha256_hex(string_to_sign, signing_key) {
	return require('crypto').createHmac('sha256',signing_key).update(string_to_sign).digest('hex');
}
~~~

合法推流地址：

~~~
 rtmp://<push.your-domain.com>/<your-app>/<your-stream>?token=计算出来的token值&expire=2017-08-15T01:00:00Z
~~~

## 播放认证

为确保视频在播放时不被非法获取，LSS提供token认证和有效期限相结合的播放地址。开启播放认证后，您可以通过”播放地址+timestamp+secret”的方式获取完整的加密播放地址。

操作步骤如下：

### 1.导航栏选择”安全策略”，新建安全策略，打开播放认证开关。保存后返回播放认证开关处，可以获取到类似asdfghjkl的密钥。

### 2.在域名或者单个流的详情页面，均可配置安全策略。
    <img src="/static/img/2019/lss01.png" title="新建策略"/>
    <img src="/static/img/2019/lss02.png" title="策略列表"/>
    <img src="/static/img/2019/lss03.png" title="域名高级设置"/>

### 3.计算secret，方式为：md5（密钥+播放地址+timestamp）。

* 密钥：在播放认证开关可以获取到播放密钥，按照步骤一已获取。
* 播放地址:/<play.your-domain.com>/{app-name}/{stream-name}。
        timestamp：用户指定播放的超时时间，格式需要转换为十进制 Unix 时间戳，推荐一个在线转换网址。

* 将（密钥+播放地址+timestamp）拼接完成后，加密为32位小写的md5码。
    假设key=111， domain = play.domain.com， app=live， stream=ghs, timestamp=149055612，md5加密后的secret为：md5(111/play.domain.com/live/ghs149055612)=3b927f3f31dd31613a537fad7a640a76

### 4.拼接完整的加密播放地址，格式为：

    http://{playdomain}/{app}/{stream}.flv?timestamp=149055612&secret=3b927f3f31dd31613a537fad7a64


## 设置防盗链

### 应用场景：

* 通过添加Referer/IP 黑白名单方式可以解决部分盗链问题，保护资源不被非法下载盗用。
* LSS 支持用户自己配置 Referer/IP 黑白名单，用户可在更新安全策略页面的“防盗链”选项卡中设置防盗链。
* 用户最多可配置200个Referer/IP黑白名单，每项最多可输入4096字节（包含空格和回车符）。
* 黑名单和白名单同一时间只能生效一种。
* 由于referer内容可以伪造，referer防盗链方式对于资源的保护仍有泄漏风险，我们推荐您使用播放认证方式保护您的源站资源。


### 配置方法：

### 1.设置Referer黑白名单

选择“白名单生效”或“黑名单生效”，输入允许或禁止访问直播流播放的URL源站地址。
    默认允许Referer为空。空Referer与Referer黑白名单是分别配置，如果允许Referer为空，空referer即可访问，否则禁止访问。
### 2.设置IP黑白名单

　选择“白名单生效”或“黑名单生效”，输入允许或禁止访问直播流播放地址的IP名单。

### 说明：

点击“删除”，可自定义删除域名Referer/IP的黑白名单，数据清除后不可被还原，需谨慎操作。