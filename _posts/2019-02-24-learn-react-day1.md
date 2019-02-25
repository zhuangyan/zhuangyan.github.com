---
layout: post
title: 自学react第一天
tags: ["react"]
---
不知道为什么就想学学前端了！按照官网教程来创建第一个项目！
https://reactjs.org/docs/create-a-new-react-app.html


### 官网示例

~~~sh
npx create-react-app my-app
cd my-app
npm start
~~~

然后命令行中就显示

~~~sh
Compiled successfully!

You can now view my-app in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://10.10.10.122:3000/

Note that the development build is not optimized.
To create a production build, use yarn build.
~~~
并在浏览器中打开默认的模板页面！

看着好简单呦！

### 学习１，NPX
它是npm v5.2.0引入的一条命令，引入这个命令的目的是为了提升开发者使用包内提供的命令行工具的体验。
主要特点

* 1、临时安装可执行依赖包，不用全局安装，不用担心长期的污染。
* 2、可以执行依赖包中的命令，安装完成自动运行。
* 3、自动加载node_modules中依赖包，不用指定$PATH。
* 4、可以指定node版本、命令的版本，解决了不同项目使用不同版本的命令的问题。

### 学习2，YARN

虽然我们是用npm start启动的工程，但是在命令行中，我们看到了
~~~sh
To create a production build, use yarn build.
~~~
所以说react默认还是推荐我们使用yarn的，在你安装了yarn时，可以用“yarn start"来启动。
yarn的优点有：

* 速度快 。速度快主要来自以下两个方面：
    - 并行安装：无论 npm 还是 Yarn 在执行包的安装时，都会执行一系列任务。npm 是按照队列执行每个 package，也就是说必须要等到当前 package 安装完成之后，才能继续后面的安装。而 Yarn 是同步执行所有任务，提高了性能。
    - 离线模式：如果之前已经安装过一个软件包，用Yarn再次安装时之间从缓存中获取，就不用像npm那样再从网络下载了。

* 安装版本统一：为了防止拉取到不同的版本，Yarn 有一个锁定文件 (lock file) 记录了被确切安装上的模块的版本号。每次只要新增了一个模块，Yarn 就会创建（或更新）yarn.lock 这个文件。这么做就保证了，每一次拉取同一个项目依赖时，使用的都是一样的模块版本。npm 其实也有办法实现处处使用相同版本的 packages，但需要开发者执行 npm shrinkwrap 命令。这个命令将会生成一个锁定文件，在执行 npm install 的时候，该锁定文件会先被读取，和 Yarn 读取 yarn.lock 文件一个道理。npm 和 Yarn 两者的不同之处在于，Yarn 默认会生成这样的锁定文件，而 npm 要通过 shrinkwrap 命令生成 npm-shrinkwrap.json 文件，只有当这个文件存在的时候，packages 版本信息才会被记录和更新。

* 更简洁的输出：npm 的输出信息比较冗长。在执行 npm install 的时候，命令行里会不断地打印出所有被安装上的依赖。相比之下，Yarn 简洁太多：默认情况下，结合了 emoji直观且直接地打印出必要的信息，也提供了一些命令供开发者查询额外的安装信息。

* 多注册来源处理：所有的依赖包，不管他被不同的库间接关联引用多少次，安装这个包时，只会从一个注册来源去装，要么是 npm 要么是 bower, 防止出现混乱不一致。

* 更好的语义化： yarn改变了一些npm命令的名称，比如 yarn add/remove，感觉上比 npm 原本的 install/uninstall 要更清晰。

### 学习３：react-scripts

我们打开package.json看一下项目配置
~~~sh
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.8.3",
    "react-dom": "^16.8.3",
    "react-scripts": "2.1.5"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}
~~~

其中出现最多的就是react-scripts，根据谷歌对react-scripts的解释：

>> React, JSX, ES6, and Flow syntax support.
Language extras beyond ES6 like the object spread operator.
Import CSS and image files directly from JavaScript.
Autoprefixed CSS, so you don’t need -webkit or other prefixes.
A build script to bundle JS, CSS, and images for production, with sourcemaps.
A dev server that lints for common errors.

大概就是说es6、css依赖啊 图片依赖之类的都已经通过react-scripts配置好了。 
其实babel-core，webpack，等等这些 你都没下载，配置。 
这些活，react-scripts 都帮你做了。

最后你要知道react-scripts主要是对webpack命令和配置的一些封装，当它封装的方法不能满足你的需求的，你可以通过命令”yarn eject“来把react-scripts 封装的一些webpack配置等全部解压到项目目录。
执行命令时会提醒你:

~~~sh
yarn run v1.10.1
$ react-scripts eject
NOTE: Create React App 2 supports TypeScript, Sass, CSS Modules and more without ejecting: https://reactjs.org/blog/2018/10/01/create-react-app-v2.html

? Are you sure you want to eject? This action is permanent. 
~~~

所以说像我这样的新手不要轻易执行这样的操作。如果对webpac非常熟悉了，再来进行webpack的扩展吧。
除了eject还有另外三种对webpack的扩展方式

* 替换 react-scripts 包
* 使用 react-app-rewired
* scripts 包 + override 组合



