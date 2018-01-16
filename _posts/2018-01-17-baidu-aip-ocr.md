---
layout: post
title: 基于百度AI的文字识别-Python
tags: ["baidu","ocr"]
---

使用百度AI的文字识别库，做出的调用示例，其中filePath是图片的路径，可以自行传入一张带有文字的图片，进行识别。


### 安装

{% highlight Bash %}

pip install baidu-aip

{% endhighlight %}




### 示例


{% highlight Bash %}
# -*- coding: UTF-8 -*-   
from aip import AipOcr  
import json  
  
# 定义常量  
APP_ID = '987654321'  
API_KEY = 'GBatgyRGoerR9FZbV4LUSQYk'  
SECRET_KEY = '4laXPg7CVfyfB2MNUHLTximFlCz1c2jV'  
  
# 初始化AipFace对象  
aipOcr = AipOcr(APP_ID, API_KEY, SECRET_KEY)  
  
# 读取图片  
filePath = "img.png"  
def get_file_content(filePath):  
    with open(filePath, 'rb') as fp:  
        return fp.read()  
  
# 定义参数变量  
options = {  
  'detect_direction': 'true',  
  'language_type': 'CHN_ENG',  
}  
  
# 调用通用文字识别接口  
result = aipOcr.basicGeneral(get_file_content(filePath), options)  
print(json.dumps(result).decode("unicode-escape"))  

{% endhighlight %}
