---
layout: post
title: Lodash学习
tags: ["前端"]
---

　　今天在知乎看到了＂如何看待前端面试不知道 lodash 被嘲讽不可思议？"的问题,感觉这个事件就像＂python程序员不知道requests"一样，或者相当于写c++的没听说过boost，或者写java的没听说过Apache commons。都是知名的实用工具库，你可以没用过，但是没听说过是不应该的．
GitHub 上 lodash 仓库的 Star 数量 37.8k，和 jQuery Vue 等是一个级别的。

## 简介
        是一个一致性、模块化、高性能的 JavaScript 实用工具库，内部封装了很多字符串、数组、对象等常见数据类型的处理函数。

## 安装

浏览器环境：
~~~
<script src="lodash.js"></script>
~~~

npm：
~~~
$ npm i -g npm
$ npm i --save lodash
~~~


nodejs：
~~~
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
 
// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');
 
// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');
~~~

## 常用函数

首先要明白的是lodash的所有函数都不会在原有的数据上进行操作，而是复制出一个新的数据而不改变原有数据。类似immutable.js的理念去处理。

### chunk,将数组进行切分
~~~
const arr = [1,2,3,4,5,6,7,8,9];
_.chunk(arr,2);
// =>[[1,2],[3,4],[5,6],[7,8],[9]]
~~~

python 可以这样做
~~~
In [1]: arr = [1,2,3,4,5,6,7,8,9]                                               

In [2]: [arr[i:i + 2] for i in range(0, len(arr), 2)]             
[[1, 2], [3, 4], [5, 6], [7, 8], [9]]
~~~

### compact，去除假值。
~~~
_.compact(['1','2',' ',0])
// => ['1','2']
~~~

python代码
~~~
In [1]:arr = ['1','2',' ',0]
In [2]: [a for a in arr if a and len(str(a).strip())]        
['1', '2']
~~~

### uniq，数组去重
~~~
_.uniq([1,1,3])
// => [1,3]
~~~


python代码
~~~
In [1]:arr = [1,1,3]
In [1]:list(set(arr)) 
[1,3]
~~~

### startsWith和endsWith
~~~
_.startsWith('abc', 'a');
// => true
 
_.startsWith('abc', 'b');
// => false
 
_.startsWith('abc', 'b', 1);
// => true

_.endsWith('abc', 'c');
// => true
 
_.endsWith('abc', 'b');
// => false
 
_.endsWith('abc', 'b', 2);
// => true
~~~

和python用法基本相同，除了endswith的第二个参数
~~~
In [1]: s = "abc"                                                               

In [2]: s.startswith("a")                                                       
Out[2]: True

In [3]: s.startswith("b")                                                       
Out[3]: False

In [4]: s.startswith("b",1)                                                     
Out[4]: True

In [5]: s.endswith("c")                                                         
Out[5]: True

In [6]: s.endswith("b")                                                         
Out[6]: False

In [7]: s.endswith("b",0,2)                                                     
Out[7]: True

~~~


