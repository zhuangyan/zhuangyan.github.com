---
layout: post
title: 自学react第二天
tags: ["react"]
---

JSX是一种JavaScript的语法扩展，运用于React架构中，其格式比较像是模版语言，但事实上完全是在JavaScript内部实现的。元素是构成React应用的最小单位，JSX就是用来声明React当中的元素，React使用JSX来描述用户界面。


### 为什么选择JSX？

React 拥抱渲染逻辑与其他 UI 逻辑固有耦合的事实：事件如何处理，状态如何随时间变化以及数据如何准备显示。

通过将标签和逻辑放在单独的文件中，而不是人为分离 技术 ，伴有松散耦合单元的 React 关注点分离 称为“组件（components）”。 我们将在组件(Components) 和 属性(Props) 中详细说明组件 ， 但如果你不习惯在 JS 中添加标签，这篇演讲可能会说服你。

React 不强制你使用JSX ，但大多数人发现它在 JavaScript 代码中使用 UI 时作为视觉辅助工具很有帮助。 它还允许 React 显示更多有用的错误和警告消息。

### JSX说明

我们可以将JSX理解为React.createElement(component, props, ...children)方法的语法糖。JSX的代码：

~~~js
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
~~~

最终会被编译成一个React Element 对象：
~~~js

React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
~~~

我们可以使用“闭标签”来表示没有子元素的情况：

~~~js
<div className="sidebar" />
~~~

它会编译成：

~~~js
React.createElement(
  'div',
  {className: 'sidebar'},
  null
)
~~~

如果你想尝试各种JSX是如何转换成JavaScript代码的，你可以打开这个网站试试：<a target="_blank" href="https://babeljs.io/repl">the online Babel compiler。</a>

### 在JSX中嵌入表达式

在下面的例子中，我们声明了一个名为 name 的变量，然后在 JSX 中使用 花括号 将其括起来：

~~~js
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
~~~
你可以用 花括号 把任意的 JavaScript 表达式 嵌入到 JSX 中。例如，2 + 2， user.firstName， 和 formatName(user)，这些都是可用的表达式。

在下面的例子中，我们将调用 JavaScript 函数 formatName(user) 的结果嵌入到 h1 元素中。

### JSX 也是一个表达式

编译之后，JSX 表达式就变成了常规的 JavaScript 对象。

这意味着你可以在 if 语句或者是 for 循环中使用 JSX，用它给变量赋值，当做参数接收，或者作为函数的返回值：
~~~js
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
~~~

### 用 JSX 指定属性值

您可以使用双引号来指定字符串字面量作为属性值：
~~~js
const element = <div tabIndex="0"></div>;
~~~
您也可以用花括号嵌入一个 JavaScript 表达式作为属性值:

~~~js
const element = <img src={user.avatarUrl}></img>;
~~~
在属性中嵌入 JavaScript 表达式时，不要使用引号将花括号括起来。您应该使用引号（用于字符串值）或大括号（用于表达式），但不能同时使用同一个属性。

### 用 JSX 指定子元素

如果是空标签，您应该像 XML 一样，使用 />立即闭合它：

~~~js
const element = <img src={user.avatarUrl} />;
~~~
JSX 标签可能包含子元素：
~~~js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
~~~

### JSX 防止注入攻击

在JSX中嵌入用户输入是安全的：
~~~js
const title = response.potentiallyMaliciousInput;
// 这样是安全的:
const element = <h1>{title}</h1>;
~~~

默认情况下， 在渲染之前, React DOM 会格式化(escapes) JSX中的所有值. 从而保证用户无法注入任何应用之外的代码. 在被渲染之前，所有的数据都被转义成为了字符串处理。 以避免 XSS(跨站脚本) 攻击。

### JSX 表示对象
Babel 将JSX编译成 React.createElement() 调用。

下面的两个例子是是完全相同的：

~~~js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
~~~

~~~js

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
~~~

React.createElement() 会执行一些检查来帮助你编写没有bug的代码，但基本上它会创建一个如下所示的对象：
~~~js
// 注意: 这是简化的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};
~~~
这些对象被称作“React元素”。你可以把他们想象成为你想在屏幕上显示内容的一种描述。React会读取这些对象，用他们来构建DOM，并且保持它们的不断更新。

