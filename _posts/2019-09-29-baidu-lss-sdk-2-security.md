---
layout: post
title: 百度音视频直播LSS平台SDK开发学习之二安全策略
tags: ["baidu","LSS"]
---


音视频直播安全策略是用于配置直播流安全机制的一组策略，包括在直播过程中使用的推流/播放认证、内容加密（即将开放）、防盗链三种安全保障机制。

## 策略设置

<img src="/static/img/2019/lss01.png" title="新建策略"/>
<img src="/static/img/2019/lss02.png" title="策略列表"/>
<img src="/static/img/2019/lss03.png" title="域名高级设置"/>

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

> rtmp://<push.your-domain.com>/<your-app>/<your-stream>?token=计算出来的token值&expire=2017-08-15T01:00:00Z



