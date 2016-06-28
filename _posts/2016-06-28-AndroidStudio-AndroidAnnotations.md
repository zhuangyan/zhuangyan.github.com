---
layout: post
title: 在Android Studio中配置AndroidAnnotations
tags: ["android"]
---


### AndroidAnnotations简介

AndroidAnnotations是一个能够让你快速进行Android开发的开源框架，它能让你专注于真正重要的地方。
使代码更加精简，使项目更加容易维护，它的目标就是“Fast Android Development.Easy maintainance”。

###  全局build.gradle中设置：
{% highlight Groovy %}
buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:2.1.2'
        classpath 'com.neenbedankt.gradle.plugins:android-apt:1.8' //加入此插件
    }
}
{% endhighlight %}

###  在局部build.gradle设置


{% highlight Groovy %}
apply plugin: 'android-apt'
def AAVersion = '4.0.0'
dependencies {
    compile fileTree(include: ['*.jar'], dir: 'libs')
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.4.0'
    compile 'org.androidannotations:androidannotations:4.0.0'
    apt "org.androidannotations:androidannotations:$AAVersion"
}
apt {
    arguments {
        androidManifestFile variant.outputs[0]?.processResources?.manifestFile
}

{% endhighlight %}


