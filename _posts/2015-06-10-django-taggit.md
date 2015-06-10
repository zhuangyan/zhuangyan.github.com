---
layout: post
title: django常用组件学习2——django-taggit
---
  标签(tag)是比较新兴的一种信息管理方式，与经典的分类的区别在于：

+  同一篇文章标签（Tag）可以用多个，但通常只能属于一个分类；
+  标签（Tag）一般是在写作完成后，根据文章大意进行添加的；
+  标签（Tag）可以把文章中重点词语提炼出来，有关键词的意义，但是分类没有；
+  标签（Tag）通常反映了您的主要关注点，比如财经、互联网、体育等等；
+  标签（Tag）给了我们一条联系他人的纽带，通过标签（Tag）可以找到您的“同好”。

现在很多网站，论坛，博客和软件都是支持标签（TAG）的那么我们怎么用django实现标签（TAG）功能呢，今天我就来学习一下django-taggit组件。


组件的github主页为https://github.com/alex/django-taggit
##基本使用方式：
我们按<a href="http://django-taggit.readthedocs.org/en/latest/getting_started.html" target="_blank">官方文档</a>来练习.
安装
{% highlight html %}
$ pip install django-taggit
{% endhighlight %}
一般不会有什么问题。
第二步，在项目中使用，我想在前面我学习django-filter的项目里，按照文档“Add "taggit" to your project’s INSTALLED_APPS setting.”
结果项目启动时报错。
{% highlight powershell %}
taggit.taggeditem: 'content_type' has a relation with model <class 'django.contrib.contenttypes.models.ContentType'>, which has either not been installed or is abstract.
{% endhighlight %}
