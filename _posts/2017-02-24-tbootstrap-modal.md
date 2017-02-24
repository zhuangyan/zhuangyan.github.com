---
layout: post
title: Bootstrap模式对话框学习
tags: ["bootstrap","前端"]
---
  bootstrap的模式对话框在2.X版本中用的挺好的，换到3.X遇到了一些问题！

### 版本变化

模态框组件（V3.0）的HTML结构发生了很大的改变。.modal-header、.modal-body和.modal-footer部分目前包含在了.modal-content和.modal-dialog中，为的是增强移动设备上的样式和行为特性。

在加载remote内容的时候，2.0时加载到.modal-body元素中，然而在3.0是加载到.modal-content中，所以可能需要在加载内容里把.modal-header、.modal-body和.modal-footer的结构写一遍。

### 缓存问题

modal的remote属性的人可能都有相同的疑惑：就是点击弹出modal后再次点击会从缓存中加载内容，而不会再次走后台，解决办法就是只要让modal本身的属性发生变化，它便会不会加载缓存。现在可以用一个简单的方法解决此问题：
{% highlight javascript %}
$('body').on('hidden.bs.modal', '.modal', function () {
    $(this).removeData('bs.modal');
});
{% endhighlight %}

在公共的js页面中加入此段代码，即可禁止所有modal加载缓存的内容！

### 尺寸问题

默认的对话框大小样式为modal-md，还有一个大点的modal-lg样式，和一个小点的modal-sm可选择。添加到.modal-dialog后即可。


