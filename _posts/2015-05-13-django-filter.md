---
layout: default
title: django常用组件学习1——django-filter
categories: [django]
comments: true
---
我们平常用django做的列表页面都会有很多查询条件。在提交查询时，views里会接收查询表单传递过来的参数，然后在queryset中根据查询条件进行过滤，最后要把过滤结果和本次查询参数在传到模板页面进行显示。django-filter组件把以上操作进行了封装，简化代码量。

pypi主页：https://pypi.python.org/pypi/django-filter
github项目主页：https://github.com/alex/django-filter

使用方式：
我对我们ERP项目的车辆管理列表用django-filter重写一下，进行学习。
车辆模型如下:

```python
class Cars(models.Model):
    STATU_CHOICE = (
        (0, '空闲中'),
        (1, '使用中'),
    )

    un_id = models.IntegerField(u'机构编号', db_column='un_id', blank=True, null=True)
    car = models.CharField(u'车牌号', max_length=10)
    brand = models.CharField(u'车辆品牌',max_length=20, blank=True, null=True)
    site = models.IntegerField(u'座位数', max_length=2, blank=True, null=True)
    path = models.ImageField(u'车辆图片',upload_to='/', blank=True, null=True)
    company = models.CharField(u'保险公司', max_length=30, blank=True, null=True)
    time = models.DateTimeField(u'投保时间', blank=True, null=True)
    person = models.CharField(u'经办人', max_length=5, blank=True, null=True)
    statu = models.IntegerField(u'使用状态',choices=STATU_CHOICE, blank=True, null=True)
    adder = models.CharField(u'添加人', max_length = 100) 

    addtime = models.DateTimeField(auto_now_add = True) 
    adderip = models.IPAddressField(default = u'0.0.0.0')
    status  = models.IntegerField(choices = utils.CHOICES_STATUS, default = 200)

    class Meta:
        db_table = 'office_cars'
```

新建一个FilterSet

```python
class CarsFilter(django_filters.FilterSet):
    class Meta:
        model = Cars
        fields = ['car', 'site']
```

views中修改如下：

```python
    querys = Cars.objects.filter(un_id=Mine.Unit.id, status=200)
    f = CarsFilter(request.GET, queryset=querys)

    context = {
        'request': request,
        'opera':opera,
        'filter':f,
    }
    return render_to_response('cars_list.html', context)
```

模板cars_list.html的代码：

{% highlight html+django %}
{% raw %}
    {% block body_search %}
    <section id="serach-console">
        <hgroup>
            <form action="?method=search" method="get">
                查找:
                {{ filter.form }}
                <input class="button" type="submit" value="搜索" />
            </form>

        </hgroup>
    </section>
{% endblock %}

{% block body_contents %}
    <section id="editor-console">
        {% load pagination_tags %}
        <table class="data-list" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <th width="2%"><input type="checkbox" id="check-console" value="-1"></th>
                <th width="10%">车牌号</th>
                <th width="10%">品牌</th>
                <th width="10%">座位数</th>
                <th width="10%">图片</th>
                <th width="10%">保险公司</th>
                <th width="10%">投保时间</th>
                <th width="10%">经办人</th>
                <th width="10%">使用状态</th>
            </tr>
            {% if filter %}
                {% autopaginate filter 30 %}
                {% for q in filter  %}
                    <tr>
                        <td><input type="checkbox" name="id" id="{{q.id}}" value="{{ q.id }}"></td>
                        <td align="center">{{q.car}}</td>
                        <td align="center">{{q.brand}}</td>
                        <td align="center">{{q.site}}</td>
                        <td align="center">
                            {% if q.path != '' %}
                                <a href="{{ q.path }}" target="_blank"><img src="{{ q.path }}" width="40px" height="30px"></a>
                            {% endif %}
                        </td>
                        <td align="center">{{q.company}}</td>
                        <td align="center">{{q.time|date:'Y-m-d'}}</td>
                        <td align="center">{{q.person}}</td>
                        <td align="center">{{q.get_statu_display}}</td>
                    </tr>
                {% endfor %}
            {% else %}
                <tr>
                    <td colspan="9" style="color:#e00">空记录！</td>
                </tr>
            {% endif %}
        </table>
        <div >{% paginate %}</div>
        <br/>
    </section>
{% endblock %}
{% endraw %}    
{% endhighlight %}
