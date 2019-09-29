---
layout: post
title: 百度音视频直播LSS平台SDK开发学习之一开发环境准备
tags: ["baidu","LSS"]
---

开始研究百度云的视频直播LSS平台，首先在管理控制台开通服务，设置好域名．文档在这里,https://cloud.baidu.com/doc/LSS/s/Bjwvyyd56!
然后就开始学习SDK接口，目前为止只有java和php的版本，对于我开说有点困难，还要从开发环境安装开始！

## 安装IDE
jdk我在安装系统时已经用archlinux安装好了多版本，默认为oracle jdk 12

然后安装idea,在majaro下也很简单
~~~
yay -S intellij-idea-ultimate-edition

~~~

## 新建测试工程
在idea下建立maven的测试工程，在pom.xml添加依赖
~~~
<dependency>
        <groupId>com.baidubce</groupId>
        <artifactId>bce-java-sdk</artifactId>
        <version>0.10.75</version>
</dependency>
~~~



报错：
~~~
Cannot resolve jdk.tools:jdk.tools:1.6
~~~

解决：
在命令行执行

~~~
cd /usr/lib/jvm/java-6-jdk/lib
mvn install:install-file -DgroupId=jdk.tools -DartifactId=jdk.tools -Dpackaging=jar -Dversion=1.6 -Dfile=tools.jar -DgeneratePom=true
~~~

然后在pom.xml里加入
~~~
    <dependency>
        <groupId>jdk.tools</groupId>
        <artifactId>jdk.tools</artifactId>
        <version>1.6</version>
    </dependency>
~~~


## 新建测试类
~~~
import com.baidubce.BceClientConfiguration;
import com.baidubce.auth.DefaultBceCredentials;
import com.baidubce.services.lss.LssClient;
import com.baidubce.services.lss.model.CreateStreamRequest;

public class Test {

    public static void main(String[] args) {
        //设置AK/SK
        String ACCESS_KEY_ID = "your ak";
        String SECRET_ACCESS_KEY = "your sk";

        // 初始化一个LssClient
        BceClientConfiguration config = new BceClientConfiguration();
        config.setCredentials(new DefaultBceCredentials(ACCESS_KEY_ID, SECRET_ACCESS_KEY));
        LssClient client = new LssClient(config);
        CreateStreamRequest request = new CreateStreamRequest();

    }
}

~~~


run 一下，报错：
~~~
Error:java: 不再支持源选项 5。请使用 7 或更高版本。
~~~

需要在setting里把java complier都调到高版本！




