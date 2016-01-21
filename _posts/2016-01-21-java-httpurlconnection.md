---
layout: post
title: HttpURLConnection使用总结
---
我写的APP服务接口差不多完成了，现在开始帮助开发Android程序，有很多东西还不熟悉。
我们的Android程序使用HttpURLConnection请求数据接口服务，初次使用，遇到一些问题记录一下：

* 最普通的GET请求
  解压后按照标准的 python setup.py install方式安装，结果报错：
  {% highlight java %}
    url = new URL(MJConstant.SERVER_PATH + "api/meetings/"); //请求会议列表接口
    HttpURLConnection urlConn = (HttpURLConnection) url.openConnection();
    urlConn.setRequestMethod("GET");
    urlConn.setDoOutput(false);
    urlConn.setReadTimeout(5 * 1000);//设置超时时间
    urlConn.setRequestProperty("Authorization", "JWT " + HttpClientService.getToken());//请求头里加入签权信息
    urlConn.connect();
    //获得response数据
    InputStream is = urlConn.getInputStream();
    InputStreamReader isr = new InputStreamReader(is);
    //使用缓冲一行行的读入，加速InputStreamReader的速度
    BufferedReader buffer = new BufferedReader(isr);
    String inputLine = null;

    while ((inputLine = buffer.readLine()) != null) {
        resultData.append(inputLine);
        resultData.append("\n");
    }
    buffer.close();
    isr.close();
    urlConn.disconnect();
    String mStrContent = resultData.toString();
    //下面就是对数据的解析
  {% endhighlight %}

* 获得返回的错误信息
  上面的请求在返回正常数据时是没问题的，但有时发生服务器错误返回HTTP 500或者Authorization不正确返回HTTP 403状态时.
  “urlConn.getInputStream()”会报“FileNotFoundException”的错误。
  我在<a href ="http://stackoverflow.com/questions/5379247/filenotfoundexception-while-getting-the-inputstream-object-from-httpurlconnectio" target="_blank">stackoverflow</a>找到了解决办法!
  {% highlight java %}
    InputStream is = urlConn.getInputStream();
    if(urlConn.getResponseCode()>=400){
      InputStreamReader isr = new InputStreamReader(is);
    }else{
      InputStreamReader isr = new InputStreamReader(is);
  }
  {% endhighlight %}

*向服务器POST JSON数据
{% highlight java %}
      HttpURLConnection urlConn = (HttpURLConnection) url.openConnection();
      urlConn.setRequestMethod("POST");
      urlConn.setDoOutput(true);
      urlConn.setDoInput(true);
      urlConn.setReadTimeout(5 * 1000);
      urlConn.setRequestProperty("Authorization", "JWT " + HttpClientService.getToken());
      urlConn.setUseCaches(false);
      urlConn.setInstanceFollowRedirects(true);
      urlConn.setRequestProperty("Content-Type",
              "application/json");
      urlConn.connect();
      //POST请求
      DataOutputStream out = new DataOutputStream(
              urlConn.getOutputStream());
      JSONObject obj = new JSONObject();
      obj.put("confirm_status", confirm_status);
      out.writeBytes(obj.toString());
      out.flush();
      out.close();
{% endhighlight %}

