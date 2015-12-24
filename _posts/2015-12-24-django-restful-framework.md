---
layout: post
title: django常用组件学习3——DRF
---
DRF就是Django REST framework，官网是http://www.django-rest-framework.org/，我正在使用它来实现我们的移动APP数据接口，感觉非常的爽。
下面是对使用中出现的问题进行一些记录。

* 用户模型
  在django1.6及以上版本，默认使用django.contrib.auth.models.User进行签权。如果需要使用自定义的用户模型，需要扩展 AbstractUser类,并且在settings.py里进行设置：
  {% highlight python %}
    # settings.py
    AUTH_USER_MODEL = "myapp.NewUser"
  {% endhighlight %}
  自定义的User Model有三种方法 1）扩展 AbstractUser类 2)扩展 AbstractBaseUser类 3)使用OneToOneField。

 * 登录认证
   DRF支持多种签权方式，需要在settings.py里进行设置：
   {% highlight python %}
    # settings.py
    REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
         'rest_framework.authentication.SessionAuthentication',
         'rest_framework.authentication.BasicAuthentication',       
         'rest_framework_jwt.authentication.JSONWebTokenAuthentication'
    )
  }
  {% endhighlight %}
  我们项目采用的是JWT的签权方式，所以还可以对JWT_AUTH的参数进行特别设置：
  {% highlight python %}
    # settings.py
    JWT_AUTH = {
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=7),
    'JWT_RESPONSE_PAYLOAD_HANDLER': 'myapp.utils.response_payload_handler',
  }
  {% endhighlight %}
  默认的JWT_RESPONSE_PAYLOAD_HANDLER方法是“rest_framework_jwt.utils.jwt_response_payload_handler”，因为默认只返回一个"token"字符串，我们还需要返回用户的其他信息(比如用户ID)，所以我们要自己一个response_payload_handler方法
  {% highlight python %}
  def response_payload_handler(token, user=None, request=None):
     return {
            'token': token,
            'user_id': user.id
        }
  {% endhighlight %}  

  * 对列表和详情数据使用不用的序列化类
    使用<a href="https://github.com/chibisov/drf-extensions" target="_blank">drf-extensions</a>
    {% highlight python %}
    from django.contrib.auth.models import User
    from myapps.serializers import UserSerializer, UserDetailSerializer
    from rest_framework_extensions.mixins import DetailSerializerMixin

    class UserViewSet(DetailSerializerMixin, viewsets.ReadOnlyModelViewSet):
        serializer_class = UserSerializer
        serializer_detail_class = UserDetailSerializer
    queryset = User.objects.all()
    {% endhighlight %}  
    对不同的操作使用不同的序列化类也可以这样写：
    {% highlight python %}
    class DualSerializerViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.ListaGruppi
        if self.action == 'retrieve':
            return serializers.DettaglioGruppi
        return serializers.Default # I dont' know what you want for create/destroy/update.
    {% endhighlight %}  

*  关系表的序列化
   这个按<a href="http://www.django-rest-framework.org/api-guide/relations/" target="_blank">官方文档</a>就可以了，最重要的是模型里不要忘记写“related_name”
   {% highlight python %}
    class Album(models.Model):
    album_name = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)

    class Track(models.Model):
        album = models.ForeignKey(Album, related_name='tracks')
        order = models.IntegerField()
        title = models.CharField(max_length=100)
        duration = models.IntegerField()

        class Meta:
            unique_together = ('album', 'order')
            ordering = ['order']

        def __unicode__(self):
            return '%d: %s' % (self.order, self.title)
   {% endhighlight %}

   {% highlight python %}
   class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ('order', 'title', 'duration')

    class AlbumSerializer(serializers.ModelSerializer):
        tracks = TrackSerializer(many=True, read_only=True)

        class Meta:
            model = Album
            fields = ('album_name', 'artist', 'tracks')
   {% endhighlight %}
