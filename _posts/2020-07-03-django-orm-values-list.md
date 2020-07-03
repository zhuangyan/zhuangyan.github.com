---
layout: post
title: Django QuerySet values_list方法的一个坑
tags: ["python","django"]
---


&emsp;&emsp;我的程序上线又出Bug了，这次又是开发环境没问题，生产环境不能用．原因是我对QuerySet的values_list方法返回值类型理解有问题．

## 🌩️开发过程
&emsp;&emsp;我想把数据库里一个表的一些ID取出来，然后传到模板中，赋值给js的一个array类型变量．
我想django orm里的values_list方法返回值不就是一个列表里，然后再加个flat=true的参数，就是id的列表．
网上很多文章也是这么写的，比如下图：
<img src="/static/img/2020/values_list1.png" width = "800px" title="values_list1"/>

所以我就的代码就是这样的：

视图：
~~~
ids_list = Products.objects.filter(ProductClass_id=51,status=200).values_list("id",flat=True)
ids = str(ids_list)
~~~
模板
~~~
<script type="text/javascript" language="javascript">
var ids={{ ids }};
</script>
~~~
## 🌩️测试过程

&emsp;&emsp;上线前我当然是测试过的，数据大概是这样的！
~~~
>>> ids_list =  Products.objects.filter(ProductClass_id=51,status=200).values_list("id",flat=True)
>>> ids = str(ids_list)
>>> print(ids)
[14698, 12682, 5898]
>>> 
~~~
生成的前端代码里就是：
~~~
<script type="text/javascript" language="javascript">
var ids=[14698, 12682, 5898];
</script>
~~~
测试没问题就提交上线了！
## 🌩️问题描述
&emsp;&emsp;上线后就有个反应页面显示有问题，我马上想到是js的问题，查看页面源码发现，生成的js变量是这样的．
~~~
var ids=[3428, 3438, 3442, 3444, 3445, 2821, 2832, 2926, 3079, 3096, 675, 3101, 3108, 3115, 3122, 3123, 3124, 3129, 3131, 3132, '...(remaining elements truncated)...'];
~~~
很明显生产库的数据比较多，后面的ids省略后就这样了，难道list的元素太多都会这样．我本地测试一下：
~~~
>>> ids_list = [i for i in range(100)]
>>> ids = str(ids_list)
>>> print(ids)
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
~~~
100个元素没有问题，然后又测试了1000个，10000个元素都没有问题，那么问题就是values_list得到的数据类型就不是list.
打印出来看一下：
~~~
>>> ids_list =  Products.objects.filter(ProductClass_id=51,status=200).values_list("id",flat=True)
>>> print(type(ids_list))
<class 'django.db.models.query.ValuesListQuerySet'>
~~~
这个明白了，ValuesListQuerySet直接转str,只有显示前20个元素，后面就是'...(remaining elements truncated)...'了．
## 🌩️最终修改
修改很简单，直接把ValuesListQuerySet强转成list就可以了，如下：
~~~
ids_list =  list(Products.objects.filter(ProductClass_id=51,status=200).values_list("id",flat=True))
~~~
这个坑就在于我一直以为values_list再加上flat＝true,返回类型就是list,还有在20个值以下，print出来的效果也和list一样．









