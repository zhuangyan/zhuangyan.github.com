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

*向服务器发送文件

这个比较麻烦，但是有人给封装好了，拿来用吧！
{% highlight java %}
package cn.zhuangyan.test;

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;

public class HttpPostUtil {
    URL url;
    HttpURLConnection conn;
    String boundary = "--------zypost";
    Map<String, String> textParams = new HashMap<String, String>();
    Map<String, File> fileparams = new HashMap<String, File>();
    DataOutputStream ds;

    public HttpPostUtil(String url) throws Exception {
        this.url = new URL(url);
    }
    //重新设置要请求的服务器地址，即上传文件的地址。
    public void setUrl(String url) throws Exception {
        this.url = new URL(url);
    }
    //增加一个普通字符串数据到form表单数据中
    public void addTextParameter(String name, String value) {
        textParams.put(name, value);
    }
    //增加一个文件到form表单数据中
    public void addFileParameter(String name, File value) {
        fileparams.put(name, value);
    }
    // 清空所有已添加的form表单数据
    public void clearAllParameters() {
        textParams.clear();
        fileparams.clear();
    }
    // 发送数据到服务器，返回一个字节包含服务器的返回结果的数组
    public byte[] send() throws Exception {
        initConnection();
        try {
            conn.connect();
        } catch (SocketTimeoutException e) {
            // something
            throw new RuntimeException();
        }
        ds = new DataOutputStream(conn.getOutputStream());
        writeFileParams();
        writeStringParams();
        paramsEnd();
        InputStream in;
        System.out.println(conn.getResponseMessage());
        if(conn.getResponseCode()>=400)
        {
            in = conn.getErrorStream();
        }else {
            in = conn.getInputStream();
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        int b;
        while ((b = in.read()) != -1) {
            out.write(b);
        }
        conn.disconnect();
        return out.toByteArray();
    }
    //文件上传的connection的一些必须设置
    private void initConnection() throws Exception {
        conn = (HttpURLConnection) this.url.openConnection();
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);
        conn.setDoInput(true);
        conn.setUseCaches(false);
        conn.setInstanceFollowRedirects(true);
        conn.setConnectTimeout(10000); //连接超时为10秒
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Authorization","JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEiLCJ1c2VyX2lkIjoxLCJlbWFpbCI6IjFAMTM5LmNvbSIsImV4cCI6MTQ1Mzc2OTc2MH0.lbfFHcczHdWuYjnaqu7f9K0s6mafbq7_oWD7v-a3jcw");
        conn.setRequestProperty("Content-Type",
                "multipart/form-data; boundary=" + boundary);
    }
    //普通字符串数据
    private void writeStringParams() throws Exception {
        Set<String> keySet = textParams.keySet();
        for (Iterator<String> it = keySet.iterator(); it.hasNext();) {
            String name = it.next();
            String value = textParams.get(name);
            ds.writeBytes("--" + boundary + "\r\n");
            ds.writeBytes("Content-Disposition: form-data; name=\"" + name
                    + "\"\r\n");
            ds.writeBytes("\r\n");
            ds.writeBytes(encode(value) + "\r\n");
        }
    }
    //文件数据
    private void writeFileParams() throws Exception {
        Set<String> keySet = fileparams.keySet();
        for (Iterator<String> it = keySet.iterator(); it.hasNext();) {
            String name = it.next();
            File value = fileparams.get(name);
            ds.writeBytes("--" + boundary + "\r\n");
            ds.writeBytes("Content-Disposition: form-data; name=\"" + name
                    + "\"; filename=\"" + encode(value.getName()) + "\"\r\n");
            ds.writeBytes("Content-Type: " + getContentType(value) + "\r\n");
            ds.writeBytes("\r\n");
            ds.write(getBytes(value));
            ds.writeBytes("\r\n");
        }
    }
    //获取文件的上传类型，图片格式为image/png,image/jpg等。非图片为application/octet-stream
    private String getContentType(File f) throws Exception {

//    return "application/octet-stream";  // 此行不再细分是否为图片，全部作为application/octet-stream 类型
        ImageInputStream imagein = ImageIO.createImageInputStream(f);
        if (imagein == null) {
            return "application/octet-stream";
        }
        Iterator<ImageReader> it = ImageIO.getImageReaders(imagein);
        if (!it.hasNext()) {
            imagein.close();
            return "application/octet-stream";
        }
        imagein.close();
        return "image/" + it.next().getFormatName().toLowerCase();//将FormatName返回的值转换成小写，默认为大写

    }
    //把文件转换成字节数组
    private byte[] getBytes(File f) throws Exception {
        FileInputStream in = new FileInputStream(f);
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte[] b = new byte[1024];
        int n;
        while ((n = in.read(b)) != -1) {
            out.write(b, 0, n);
        }
        in.close();
        return out.toByteArray();
    }
    //添加结尾数据
    private void paramsEnd() throws Exception {
        ds.writeBytes("--" + boundary + "--" + "\r\n");
        ds.writeBytes("\r\n");
    }
    // 对包含中文的字符串进行转码，此为UTF-8。服务器那边要进行一次解码
    private String encode(String value) throws Exception{
        return URLEncoder.encode(value, "UTF-8");
    }
    public static void main(String[] args) throws Exception {
        HttpPostUtil u = new HttpPostUtil("http://192.168.4.34:8000/api/messages/");
        u.addTextParameter("media_type","2");
        u.addFileParameter("media", new File(
                "c:\\12014年2月桌面.jpg"));
        u.addTextParameter("group_id", "2");
        byte[] b = u.send();
        String result = new String(b);
        System.out.println(result);
    }
}

{% endhighlight %}