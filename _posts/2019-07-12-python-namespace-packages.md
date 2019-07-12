---
layout: post
title: python的命名空间包
tags: ["python"]
---

命名空间包允许您将单个包中的子包和模块拆分为多个独立的分发包（在本文档中称为分发包，以避免混淆）。例如，如果您具有以下包结构： 

~~~
mynamespace/
    __init__.py
    subpackage_a/
        __init__.py
        ...
    subpackage_b/
        __init__.py
        ...
    module_b.py
setup.py

~~~
你在代码中可以这样使用包：

~~~
from mynamespace import subpackage_a
from mynamespace import subpackage_b
~~~

然后您可以将这些子包分解为两个单独的分发版

~~~
command 'extension.oracleconnect' not found
~~~

现在可以单独安装、使用和版本控制每个子包。


名称空间包对于大量松散相关的包（例如单个公司的多个产品的大型客户机库库）集合很有用。
但是，名称空间包附带了几个注意事项，并非在所有情况下都适用。
一个简单的替代方法是在所有分发版上使用前缀，
例如import mynamespace_subpackage_a（甚至可以使用import mynamespace_subpackage_a as subpackage_a来保持导入对象的简短）。

## 创建一个命名空间包

有三种不同的方式：
### 1. naive namespace package 

在python3.3以后的推荐做法
代码结构如下：
~~~
setup.py
mynamespace/
    # No __init__.py here.
    subpackage_a/
        # Sub-packages have __init__.py.
        __init__.py
        module.py
~~~

mynamespace下不需要__init__.py文件，但必须明确列出setup.py中的所有包
~~~
from setuptools import setup

setup(
    name='mynamespace-subpackage-a',
    ...
    packages=['mynamespace.subpackage_a']
)
~~~


### 2. pkgutil-style namespace package

python 2.3引入了pkgutil模块和extend_path函数。这可用于声明需要与python 2.3+和python 3兼容的命名空间包。这是实现最高级别兼容性的建议方法。
要创建pkgutil样式的命名空间包，需要为命名空间包提供一个__init__.py文件：

~~~
setup.py
mynamespace/
    __init__.py  # Namespace package __init__.py
    subpackage_a/
        __init__.py  # Sub-package __init__.py
        module.py
~~~

命名空间的__init__.py文件需要包含如下代码
~~~
__path__ = __import__('pkgutil').extend_path(__path__, __name__)
~~~
使用名称空间包的每个分发必须包含相同的__init__.py。如果没有任何分发，它将导致命名空间逻辑失败，其他子包将不可导入。__init__.py中的任何附加代码都将无法访问。

### 3. pkg_resources-style namespace package

setuptools为setup（）提供pkg_resources.declare_namespace函数和namespace_packages参数。这些可以一起用于声明命名空间包。
虽然不再推荐这种方法，但它广泛存在于大多数现有的命名空间包中。如果要在使用此方法的现有命名空间包中创建新分发，建议继续使用此方法，因为不同的方法不交叉兼容，不建议尝试迁移现有包。


要创建pkg_resources-style名称空间包，需要为名称空间包提供一个__init__.py文件：

~~~
setup.py
mynamespace/
    __init__.py  # Namespace package __init__.py
    subpackage_a/
        __init__.py  # Sub-package __init__.py
        module.py
~~~

命名空间的__init__.py文件需要包含如下代码

~~~
__import__('pkg_resources').declare_namespace(__name__)
~~~
使用名称空间包的每个分发必须包含相同的__init__.py。如果没有任何分发，它将导致命名空间逻辑失败，其他子包将不可导入。__init__.py中的任何附加代码都将无法访问。




