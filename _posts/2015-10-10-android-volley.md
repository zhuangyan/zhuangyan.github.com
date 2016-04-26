---
layout: post
title: Android 网络通信框架Volley简介
tags: ["android","volley"]
---
 Volley主页 https://android.googlesource.com/platform/frameworks/volley
 http://www.youtube.com/watch?v=yhv8l9F44qo&feature=player_embedded

### 1什么是Volley

在这之前，我们在程序中需要和网络通信的时候，大体使用的东西莫过于AsyncTaskLoader，HttpURLConnection，AsyncTask，HTTPClient（Apache）等，在2013年的Google I/O 2013上，Volley发布了。Volley是Android平台上的网络通信库，能使网络通信更快，更简单，更健壮。
这是Volley名称的由来： a burst or emission of many things or a large amount at once
在Google IO的演讲上，其配图是一幅发射火弓箭的图，有点类似流星。见下图：
<em class="center"><img src="/static/img/volley1.png"></em>
其实，从这幅图，我们也可以看出来，Volley特别适合数据量不大但是通信频繁的场景。


#### 1.1Volley引入的背景

在以前，我们可能面临如下很多麻烦的问题。

比如以前从网上下载图片的步骤可能是这样的流程：

*  在ListAdapter#getView()里开始图像的读取。
*  通过AsyncTask等机制使用HttpURLConnection从服务器去的图片资源
*  在AsyncTask#onPostExecute()里设置相应ImageView的属性。

而在Volley下，只需要一个函数即可，详细见后面的例子。

再比如，屏幕旋转的时候，有时候会导致再次从网络取得数据。为了避免这种不必要的网络访问，我们可能需要自己写很多针对各种情况的处理，比如cache什么的。

再有，比如ListView的时候，我们滚动过快，可能导致有些网络请求返回的时候，早已经滚过了当时的位置，根本没必要显示在list里了，虽然我们可以通过ViewHolder来保持url等来实现防止两次取得，但是那些已经没有必须要的数据，还是会浪费系统的各种资源。


#### 1.2 Volley提供的功能
简单来说，它提供了如下的便利功能：

*  JSON，图像等的异步下载；
*  网络请求的排序（scheduling）
*  网络请求的优先级处理
*  缓存
*  多级别取消请求
*  和Activity和生命周期的联动（Activity结束时同时取消所有网络请求）
### 2 使用前的准备
引入Volley非常简单，首先，从git库先克隆一个下来：

{% highlight java %}
    git clone https://android.googlesource.com/platform/frameworks/volley  
{% endhighlight %}

然后编译为jar包，再在自己的工程里import进来。

注意，这个库要求最低SDK版本为Froyo，即至少要设置android:minSdkVersion为8以上。

### 3 使用例子
下面简单看看如何使用Volley
#### 3.1 最简单的get请求
这个例子很简单，从网络取得JSON对象，然后打印出来。
{% highlight java %}

    mQueue = Volley.newRequestQueue(getApplicationContext());  
    mQueue.add(new JsonObjectRequest(Method.GET, url, null,  
                new Listener() {  
                    @Override  
                    public void onResponse(JSONObject response) {  
                        Log.d(TAG, "response : " + response.toString());  
                    }  
                }, null));  
    mQueue.start();  
{% endhighlight %}    
#### 3.2 给ImageView设置图片源
{% highlight java %}
    // imageView是一个ImageView实例  
    // ImageLoader.getImageListener的第二个参数是默认的图片resource id  
    // 第三个参数是请求失败时候的资源id，可以指定为0  
    ImageListener listener = ImageLoader.getImageListener(imageView, android.R.drawable.ic_menu_rotate, android.R.drawable.ic_delete);  
    mImageLoader.get(url, listener);    
{% endhighlight %} 
ImageLoader的方法都需要从主线程里来调用。
#### 3.3 使用NetworkImageView
Volley提供了一个新的控件NetworkImageView来代替传统的ImageView，这个控件的图片属性可以通过
{% highlight java %}
      mImageView.setImageUrl(url, imageLoader)     
{% endhighlight %} 
来设定。而且，这个控件在被从父控件detach的时候，会自动取消网络请求的，即完全不用我们担心相关网络请求的生命周期问题。
示例代码如下：
{% highlight java %}
      mImageLoader = new ImageLoader(mRequestQueue, new BitmapLruCache());  
... ...  
   
if(holder.imageRequest != null) {  
    holder.imageRequest.cancel();  
}  
holder.imageRequest = mImageLoader.get(BASE_UR + item.image_url, holder.imageView, R.drawable.loading, R.drawable.error);   
{% endhighlight %} 
注意，这里使用的不是ImageView控件，而是Volley新提供的com.android.volley.NetworkImageView。

另外，注意这里：
{% highlight java %}
    mImageLoader = new ImageLoader(mRequestQueue, new BitmapLruCache());  
{% endhighlight %} 
ImageLoader构造函数的第二个参数是一个ImageCache的实例（严格来说，是实现ImageCache接口的某具体类的实例）
ImageCache的定义如下（在ImageLoader.java里）：
{% highlight java %}
    /** 
 *  Simple cache adapter interface. If provided to the ImageLoader, it 
 *  will be used as an L1 cache before dispatch to Volley. Implementations 
 *  must not block. Implementation with an LruCache is recommended. 
     */  
    public interface ImageCache {  
        public Bitmap getBitmap(String url);  
        public void putBitmap(String url, Bitmap bitmap);  
    }  
{% endhighlight %} 
下面的网址一个lru的cache实现例子，请参考：

https://github.com/suwa-yuki/VolleySample/blob/master/src/jp/classmethod/android/sample/volley/BitmapCache.java
#### 3.4 使用自己定制的request
我们也可以通过继承Request根据自己的需求来定制自己的request
{% highlight java %}
    @Override  
    protected Response parseNetworkResponse(NetworkResponse response) {  
        try {  
            String json = new String(  
                    response.data, HttpHeaderParser.parseCharset(response.headers));  
            return Response.success(  
                    gson.fromJson(json, clazz), HttpHeaderParser.parseCacheHeaders(response));  
        } catch (UnsupportedEncodingException e) {  
            return Response.error(new ParseError(e));  
        } catch (JsonSyntaxException e) {  
            return Response.error(new ParseError(e));  
        }  
    }  
{% endhighlight %} 
这段代码节选自： https://gist.github.com/ficusk/5474673

里面使用的gson（com.google.gson.Gson）是JSON的序列化和反序列化的库，可以在JSON和java model object之间进行转换。

以下是使用自定制request的例子：
{% highlight java %}
    @Override  
    mRequestQueue.add( new GsonRequest(url, ListResponse.class, null,  
        new Listener() {  
            public void onResponse(ListResponse response) {  
                appendItemsToList(response.item);  
                notifyDataSetChanged();  
            }  
        }  
    }  
{% endhighlight %} 
### 4 Volley的架构设计
Volley使用了线程池来作为基础结构，主要分为主线程，cache线程和network线程。
主线程和cache线程都只有一个，而NetworkDispatcher线程可以有多个，这样能解决比并行问题。如下图:
<em class="center"><img src="/static/img/volley2.png"></em>
如果在一个Activity里面启动了网络请求，而在这个网络请求还没返回结果的时候，如果Activity被结束了，则我们需要写如下代码作为防守：
{% highlight java %}
    @Override 
    public void onPostExecute(Result r) {  
        if (getActivity() == null) {  
            return;  
        }  
        // ...  
    }  
{% endhighlight %}
Activity被终止之后，如果继续使用其中的Context等，除了无辜的浪费CPU，电池，网络等资源，有可能还会导致程序crash，所以，我们需要处理这种一场情况。

使用Volley的话，我们可以在Activity停止的时候，同时取消所有或部分未完成的网络请求。

Volley里所有的请求结果会返回给主进程，如果在主进程里取消了某些请求，则这些请求将不会被返回给主线程。
比如，可以针对某些个request做取消操作：
{% highlight java %}
    @Override  
    public void onStop() {  
        for (Request <?> req : mInFlightRequests) {  
            req.cancel();  
        }  
        ...  
    }  
{% endhighlight %}
或者，取消这个队列里的所有请求：
{% highlight java %}
    @Override
    pubic void onStop() {  
    mRequestQueue.cancelAll(this);  
    ...  
}
{% endhighlight %}
也可以根据RequestFilter或者Tag来终止某些请求：
{% highlight java %}
    @Override
   public void onStop() {  
    mRequestQueue.cancelAll( new RequestFilter() {})  
    ...  
    // or  
    mRequestQueue.cancelAll(new Object());  
    ...   
}
{% endhighlight %}
### 5 总结

从演讲的例子来看，Volley应该是简化了网络通信的一些开发，特别是针对如下两种情况：

*  JSON对象
*  图片加载

但是这个东西也有不实用的地方，比如大数据（large payloads ），流媒体，这些case，还需要使用原始的方法，比如Download Manager等。
总之，如果你要编写网络程序，是不是可以考虑开始使用Volley呢？

Google IO2013网络框架Volley 演讲PDF下载: http://download.csdn.net/detail/t12x3456/5686041

转自：http://blog.csdn.net/t12x3456/article/details/9221611
