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
这里因为还需要把“django.contrib.contenttypes”加入到 “INSTALLED_APPS” 中。
然后运行manage.py syncdb 会生成表【TAGGIT_TAG】和【TAGGIT_TAGGEDITEM】。我们可以查看一下这两个表的结构：
{% highlight powershell %}
PS .\manage.py dbshell
SQLite version 3.8.7.2 2014-11-18 20:57:56
Enter ".help" for usage hints.
sqlite> .schema taggit_tag
CREATE TABLE "taggit_tag" (
    "id" integer NOT NULL PRIMARY KEY,
    "name" varchar(100) NOT NULL UNIQUE,
    "slug" varchar(100) NOT NULL UNIQUE
);
sqlite> .schema taggit_taggeditem
CREATE TABLE "taggit_taggeditem" (
    "id" integer NOT NULL PRIMARY KEY,
    "tag_id" integer NOT NULL REFERENCES "taggit_tag" ("id"),
    "object_id" integer NOT NULL,
    "content_type_id" integer NOT NULL REFERENCES "django_content_type" ("id")
);
CREATE INDEX "taggit_taggeditem_5659cca2" ON "taggit_taggeditem" ("tag_id");
CREATE INDEX "taggit_taggeditem_846f0221" ON "taggit_taggeditem" ("object_id");
CREATE INDEX "taggit_taggeditem_37ef4eb4" ON "taggit_taggeditem" ("content_type_id");
{% endhighlight %}
下面我们来修改模型：
{% highlight python %}
from taggit.managers import TaggableManager
class Cars(models.Model):
    # ... 原有字段略
    tags = TaggableManager()
    class Meta:
        db_table = 'office_cars'    
{% endhighlight %}
在命令行测试一下：
{% highlight python %}
.\manage.py shell
In [1]: from apps.office.cars.models import Cars
In [2]: car = Cars()
In [3]: car.car=u'测试车1'
In [4]: car.save()
In [5]: car.tags.add(u'宝马',u'跑车')
In [6]: car2 = Cars()
In [7]: car2.car=u'测试车2'
In [8]: car2.save()
In [9]: car2.tags.add(u'摩托','跑车')
In [10]: car2.tags.all()
Out[10]: [<Tag: 摩托>, <Tag: 跑车]
In [11]: Cars.objects.filter(tags__name__in=[u"跑车"])
Out[12]: [<Cars: 测试车1>,<Cars: 测试车2>]
{% endhighlight %}
##结合ModelForm使用：
使用forms接回request参数时会把输入的标签参数进行智能的分隔处理，分隔规则如下表。
<table class="docutils" border="1">
<colgroup>
<col width="21%">
<col width="32%">
<col width="47%">
</colgroup>
<thead valign="bottom">
<tr class="row-odd"><th class="head">Tag input string</th>
<th class="head">Resulting tags</th>
<th class="head">Notes</th>
</tr>
</thead>
<tbody valign="top">
<tr class="row-even"><td>apple ball cat</td>
<td><code class="docutils literal"><span class="pre">["apple",</span> <span class="pre">"ball",</span> <span class="pre">"cat"]</span></code></td>
<td>No commas, so space delimited</td>
</tr>
<tr class="row-odd"><td>apple, ball cat</td>
<td><code class="docutils literal"><span class="pre">["apple",</span> <span class="pre">"ball</span> <span class="pre">cat"]</span></code></td>
<td>Comma present, so comma delimited</td>
</tr>
<tr class="row-even"><td>“apple, ball” cat dog</td>
<td><code class="docutils literal"><span class="pre">["apple,</span> <span class="pre">ball",</span> <span class="pre">"cat",</span> <span class="pre">"dog"]</span></code></td>
<td>All commas are quoted, so space delimited</td>
</tr>
<tr class="row-odd"><td>“apple, ball”, cat dog</td>
<td><code class="docutils literal"><span class="pre">["apple,</span> <span class="pre">ball",</span> <span class="pre">"cat</span> <span class="pre">dog"]</span></code></td>
<td>Contains an unquoted comma, so comma delimited</td>
</tr>
<tr class="row-even"><td>apple “ball cat” dog</td>
<td><code class="docutils literal"><span class="pre">["apple",</span> <span class="pre">"ball</span> <span class="pre">cat",</span> <span class="pre">"dog"]</span></code></td>
<td>No commas, so space delimited</td>
</tr>
<tr class="row-odd"><td>“apple” “ball dog</td>
<td><code class="docutils literal"><span class="pre">["apple",</span> <span class="pre">"ball",</span> <span class="pre">"dog"]</span></code></td>
<td>Unclosed double quote is ignored</td>
</tr>
</tbody>
</table>
注意：当“commit=False”时，需要用“save_m2m()”方法保存多对多关系数据，如下：
{% highlight python %}
if request.method == "POST":
    form = MyFormClass(request.POST)
    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = request.user
        obj.save()
        # Without this next line the tags won't be saved.
        form.save_m2m()
{% endhighlight %}
##其他：
+  默认使用【TAGGIT_TAG】和【TAGGIT_TAGGEDITEM】表保存标签及与记录的关联关系数据，但是我们可以通过继承TaggedItemBase来自定义模型来保存相关数据。
   参考<a href="http://django-taggit.readthedocs.org/en/latest/custom_tagging.html" target="_blank"> custom_tagging</a>
+  实际应用中我们需要在前端实时提示现有的标签及使用情况，可以参与项目<a href="https://github.com/frankwiles/django-taggit-suggest" target="_blank">django-taggit-suggest</a>及项目<a href="https://github.com/feuervogel/django-taggit-templatetags">django-taggit-templatetags</a>以及文章<a href="http://charlesleifer.com/blog/suggesting-tags-django-taggit-and-jquery-ui/" target="_blank">Suggesting tags with django-taggit and jQuery UI</a>
