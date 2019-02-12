---
layout: post
title: beeprint:比 pprint 更好的打印工具
tags: ["python"]
---
beeprint是一个国人写的打印工具，类似 [pprint] ，主要是调试的时候用．

项目地址:https://github.com/panyanyany/beeprint

## 安装方式

~~~sh
pip install beeprint
~~~

## 示例

测试环境为python3.6
### import
~~~python
In [1]: from beeprint import pp                                                 
In [2]: from pprint import pprint      
~~~

### 字典
~~~python
In [3]: mydict = {'data': {'type': 'profile', 
   ...:   'id': 'someid', 
   ...:   'attributes': {'created_at': '2018-07-12T22:10:10Z'}, 
   ...:   'relationships': {'identity_searches': {'links': {'related': '/aaaa'}}
   ...: }}}                                                                     

In [4]: pprint(mydict)                                                          
{'data': {'attributes': {'created_at': '2018-07-12T22:10:10Z'},
          'id': 'someid',
          'relationships': {'identity_searches': {'links': {'related': '/aaaa'}}},
          'type': 'profile'}}

In [5]: pp(mydict)                                                              
{
  'data': {
    'attributes': {
      'created_at': '2018-07-12T22:10:10Z',
    },
    'id': 'someid',
    'relationships': {
      'identity_searches': {
        'links': {
          'related': '/aaaa',
        },
      },
    },
    'type': 'profile',
  },
}
~~~

### 列表
~~~python

In [6]: mylist = ['a', 'b', 'c', 'd', 'e']                                      

In [7]: mylist.append(u''' 
   ...: 美比丑好，明比涩强。 
   ...: 简胜于繁，繁强于难。 
   ...: 平言莫绕，宜疏莫密。 
   ...: 行文如水，易懂为王。 
   ...: 勿提特例，皆循此规。 
   ...: 实虽胜纯，识错必究。 
   ...: 若需留证，亦要言明。 
   ...: 不明其理，追根问底。 
   ...: 必有一法，可解谜题。 
   ...: 汝非龟叔，求之故难。 
   ...: 立足当下，行必有方。 
   ...: 行难言喻，所思欠妥。 
   ...: 行易言表，所思可嘉。 
   ...: 名正易识，善莫大焉！ 
   ...: ''')                                                                    



In [8]: pprint(mylist)                                                          
['a',
 'b',
 'c',
 'd',
 'e',
 '\n'
 '美比丑好，明比涩强。\n'
 '简胜于繁，繁强于难。\n'
 '平言莫绕，宜疏莫密。\n'
 '行文如水，易懂为王。\n'
 '勿提特例，皆循此规。\n'
 '实虽胜纯，识错必究。\n'
 '若需留证，亦要言明。\n'
 '不明其理，追根问底。\n'
 '必有一法，可解谜题。\n'
 '汝非龟叔，求之故难。\n'
 '立足当下，行必有方。\n'
 '行难言喻，所思欠妥。\n'
 '行易言表，所思可嘉。\n'
 '名正易识，善莫大焉！\n']

In [9]: pp(mylist)                                                              
[
  'a',
  'b',
  'c',
  'd',
  'e',
  '\n美比丑好，明比涩强。\n简胜于繁，繁强于难。\n平言莫绕，宜疏莫密。\n行文如水
   ，易懂为王。\n勿提特例，皆循此规。\n实虽胜纯，识错必究。\n若需留证，亦要言明
   ...(3 hidden lines)',
]
~~~

注：pprint(mylist)在python2下的输出为
~~~
['a',
 'b',
 'c',
 'd',
 'e',
 u'\n\u7f8e\u6bd4\u4e11\u597d\uff0c\u660e\u6bd4\u6da9\u5f3a\u3002\n\u7b80\u80dc\u4e8e\u7e41\uff0c\u7e41\u5f3a\u4e8e\u96be\u3002\n\u5e73\u8a00\u83ab\u7ed5\uff0c\u5b9c\u758f\u83ab\u5bc6\u3002\n\u884c\u6587\u5982\u6c34\uff0c\u6613\u61c2\u4e3a\u738b\u3002\n\u52ff\u63d0\u7279\u4f8b\uff0c\u7686\u5faa\u6b64\u89c4\u3002\n\u5b9e\u867d\u80dc\u7eaf\uff0c\u8bc6\u9519\u5fc5\u7a76\u3002\n\u82e5\u9700\u7559\u8bc1\uff0c\u4ea6\u8981\u8a00\u660e\u3002\n\u4e0d\u660e\u5176\u7406\uff0c\u8ffd\u6839\u95ee\u5e95\u3002\n\u5fc5\u6709\u4e00\u6cd5\uff0c\u53ef\u89e3\u8c1c\u9898\u3002\n\u6c5d\u975e\u9f9f\u53d4\uff0c\u6c42\u4e4b\u6545\u96be\u3002\n\u7acb\u8db3\u5f53\u4e0b\uff0c\u884c\u5fc5\u6709\u65b9\u3002\n\u884c\u96be\u8a00\u55bb\uff0c\u6240\u601d\u6b20\u59a5\u3002\n\u884c\u6613\u8a00\u8868\uff0c\u6240\u601d\u53ef\u5609\u3002\n\u540d\u6b63\u6613\u8bc6\uff0c\u5584\u83ab\u5927\u7109\uff01\n']
~~~

### 元组
~~~python

In [10]: tup = ('spam', ('eggs', ('lumberjack', ('knights', ('ni', ('dead',('par
    ...: rot', ('fresh fruit',))))))))   

In [11]: pprint(tup)                                                            
('spam',
 ('eggs',
  ('lumberjack', ('knights', ('ni', ('dead', ('parrot', ('fresh fruit',))))))))

In [12]: pp(tup)                                                                
(
  'spam',
  (
    'eggs',
    (
      'lumberjack',
      (
        'knights',
        (
          'ni',
          ('dead', ('parrot', ('fresh fruit',))),
        ),
      ),
    ),
  ),
)
~~~

### 类及实例
~~~python
In [13]: class Complex: 
    ...:     def __init__(self, realpart, imagpart): 
    ...:         self.r = realpart 
    ...:         self.i = imagpart 
    ...:                                                                        


In [14]: pprint(Complex)                                                        
<class '__main__.Complex'>

In [15]: pp(Complex)                                                            
class(Complex)

In [16]: x = Complex(3.0, -4.5)                                                 

In [17]: pprint(x)                                                              
<__main__.Complex object at 0x7fd4565d5668>

In [18]: pp(x)                                                                  
instance(Complex):
  i: -4.5,
  r: 3.0
~~~

