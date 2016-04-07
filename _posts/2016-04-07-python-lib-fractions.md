---
layout: post
title: Python中分数的相关使用教程
---
这篇文章主要介绍了Python中分数的相关使用教程,主要涉及分数的计算、约分等简单操作，是Python学习过程当中的基础，需要的朋友可以参考下。

你可能不需要经常处理分数，但当你需要时，Python的Fraction类会给你很大的帮助。在该指南中，我将提供一些有趣的实例，用于展示如何处理分数，突出显示一些很酷的功能。

**1 基础**

Fraction类在Lib/fractions.py文件中，所以可以这样导入：


{% highlight python %}
from fractions import Fraction
{% endhighlight %}


有很多种实例化Fraction类的方法。

首先，你可以传入分子和分母：

{% highlight python %}
>>> Fraction(1, 2)
Fraction(1, 2)
{% endhighlight %}

或者利用另一个分数进行实例化：

{% highlight python %}
>>> f = Fraction(1, 2)
>>> Fraction(f)
Fraction(1, 2)
{% endhighlight %}

使用一个浮点数进行实例化：

{% highlight python %}
>>> Fraction(2.5)
Fraction(5, 2)
{% endhighlight %}

或者使用一个 decimal：

{% highlight python %}
>>> from decimal import Decimal
>>> Fraction(Decimal('1.1'))
Fraction(11, 10)
{% endhighlight %}

最后一种方法，可能是最有趣的一种方法，你可以使用一个字符串实例化Fraction类：

{% highlight python %}
>>> Fraction('9/16')
Fraction(9, 16)
{% endhighlight %}

本质上讲，Fraction类这么设计，目的就是为了让你在实例化该类之前不需要做很多处理。Fraction类知道如何处理多种不同的数据类型。

**2 自动约分**

约分并不是很难，但是对于一些复杂的分数，约分还是要费点事的。Fraction类在这方面特别有用，因为它能自动约分分数。

{% highlight python %}
>>> Fraction(153, 272)
Fraction(9, 16)
{% endhighlight %}

纯粹靠想，你可能无法约分153/172，但是Fraction类能很快地完成约分。

**3 二元运算**

你可以像对待整数和浮点数一样，在Fraction对象上执行二元运算。

两个分数进行相加操作：

{% highlight python %}
>>> Fraction(1, 2) + Fraction(3, 4)
Fraction(5, 4)
{% endhighlight %}

这样操作就很方便了，但是你也可以混合整数或浮点数。如你所料，Fraction对象和一个整数进行相加返回一个Fraction对象，但和一个浮点数进行相加返回一个浮点数。

{% highlight python %}
>>> Fraction(5, 16) + 3
Fraction(53, 16)
>>> Fraction(5, 16) + 3.0
3.3125
{% endhighlight %}

这里有一些其他的二元运算的例子：

{% highlight python %}
>>> Fraction(5, 16) - Fraction(1, 4)
Fraction(1, 16)
>>> Fraction(1, 16) * Fraction(3, 16)
Fraction(3, 256)
>>> Fraction(3, 16) / Fraction(1, 8)
Fraction(3, 2)
{% endhighlight %}

现在让我们试试乘方操作：

{% highlight python %}
>>> Fraction(1, 8) ** Fraction(1, 2)
0.3535533905932738
{% endhighlight %}

它返回一个浮点数，可能是因为分数不能进行合理的计算。实际上我们可以使用limit_denominator方法得到一个近似的Fraction值。

{% highlight python %}
>>> f = Fraction(1, 8) ** Fraction(1, 2)
>>> Fraction(f).limit_denominator()
Fraction(235416, 665857)
{% endhighlight %}

记住，你可以混合字符串和其他上边实例化部分中提到的数据类型。

{% highlight python %}
>>> Fraction("1/2") + Fraction(2.0)
Fraction(5, 2)
>>> Fraction(2) * Fraction("  1/2  ")
Fraction(1, 1)
{% endhighlight %}

**4 获取Fraction对象的属性**

你已经有了一个Fraction对象，并且已经做了一些计算，现在我们如何访问它的属性呢？

不阅读文档的话，你或许会尝试Fraction.numerator和Fraction.denominator，事实证明你是正确的。

{% highlight python %}
>>> f = Fraction(221, 234) + Fraction(1, 2)
>>> f.numerator
13
>>> f.denominator
9
{% endhighlight %}

或者作为一个字符串，打印整个分数：

{% highlight python %}
>>> print f
13/9
>>> a = str(f)
>>> a
'13/9
{% endhighlight %}

**5 GCD

**

这不是Fraction类的一部分，它是在fractions库中的。利用它你可以快速找到两个数的最大公约数。

</div>

首先导入：

{% highlight python %}
from fractions import gcd
{% endhighlight %}

一些例子：

{% highlight python %}
>>> gcd(100, 75)
25
>>> gcd(221, 234)
13
{% endhighlight %}

**6 总结**

希望你已经学到了一些关于在Python中处理分数的东西。如果你想阅读更多内容，可以查看文档。如果你感觉学起来非常有动力，可以看看源代码。

如果你有更有趣的分数使用方法，告诉我，我会将它们添加到指南中。
