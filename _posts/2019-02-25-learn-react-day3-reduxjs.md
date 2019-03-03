---
layout: post
title: 自学react第三天
tags: ["react"]
---

　　Redux由Dan Abramov在2015年创建的科技术语。是受2014年Facebook的Flux架构以及函数式编程语言Elm启发。很快，Redux因其简单易学体积小在短时间内成为最热门的前端架构。

## 简介
Redux对于JavaScript应用而言是一个可预测状态的容器。换言之，它是一个应用数据流框架，而不是传统的像underscore.js或者AngularJs那样的库或者框架。
Redux最主要是用作应用状态的管理。简言之，Redux用一个单独的常量状态树（对象）保存这一整个应用的状态，这个对象不能直接被改变。当一些数据变化了，一个新的对象就会被创建（使用actions和reducers）。

## 示例1

~~~sh
git clone https://github.com/reduxjs/redux.git
cd redux/examples/counter-vanilla/
yarn
yarn start
~~~
然后就看到报错了:
~~~sh
redux/examples/counter-vanilla/index.html: Duplicate plugin/preset detected.
If you'd like to use two separate instances of a plugin,
they need separate names, e.g.

  plugins: [
    ['some-plugin', {}],
    ['some-plugin', {}, 'some unique name'],
  ]
~~~
查看package.json,一共就用到两个包
~~~sh
 "devDependencies": {
    "@babel/core": "^7.2.0",
    "parcel-bundler": "^1.6.1"
  }
~~~
那么一个是这两个包有冲突，当前都用的最新版本７.3.4和１.11.0
把其中的“parcel-bundler”指定为“1.6.1”就可以了！
成功启动命令行会显示
~~~sh
yarn run v1.10.1
warning package.json: No license field
$ parcel index.html --open
Server running at http://localhost:1234 
✨  Built in 101ms.
~~~
这里我们要了解的是“Parcel是和webpack类似的打包神器”。

然后我们来看示例的代码
~~~
<!DOCTYPE html>
<html>
  <head>
    <title>Redux basic example</title>
    <script src="https://unpkg.com/redux@latest/dist/redux.min.js"></script>
  </head>
  <body>
    <div>
      <p>
        Clicked: <span id="value">0</span> times
        <button id="increment">+</button>
        <button id="decrement">-</button>
        <button id="incrementIfOdd">Increment if odd</button>
        <button id="incrementAsync">Increment async</button>
      </p>
    </div>
    <script>
      function counter(state, action) {
        if (typeof state === 'undefined') {
          return 0
        }

        switch (action.type) {
          case 'INCREMENT':
            return state + 1
          case 'DECREMENT':
            return state - 1
          default:
            return state
        }
      }

      var store = Redux.createStore(counter)
      var valueEl = document.getElementById('value')

      function render() {
        valueEl.innerHTML = store.getState().toString()
      }

      render()
      store.subscribe(render)

      document.getElementById('increment')
        .addEventListener('click', function () {
          store.dispatch({ type: 'INCREMENT' })
        })

      document.getElementById('decrement')
        .addEventListener('click', function () {
          store.dispatch({ type: 'DECREMENT' })
        })

      document.getElementById('incrementIfOdd')
        .addEventListener('click', function () {
          if (store.getState() % 2 !== 0) {
            store.dispatch({ type: 'INCREMENT' })
          }
        })

      document.getElementById('incrementAsync')
        .addEventListener('click', function () {
          setTimeout(function () {
            store.dispatch({ type: 'INCREMENT' })
          }, 1000)
        })
    </script>
  </body>
</html>

~~~
这个例子展示了Redux 最核心的 API ---- createStore，通过 createStore 方法创建的 store 是一个对象
它本身又包含4个方法。

- getState()：获得store中当前的状态。
- dispath(action)：分发一个action，并返回这个 action，这是唯一能改变 store 中数据的方式。
- subscrible(listener)： 注册一个监听者，他在 store 发生变化时被调用。
- replaceReducer(nextReducer)：更新当前 store 里的reducer，一般只会在开发模式中调用该方法。

在实际应用中，我门最常用的是 getState() 和 dispatch() 这两个方法。至于subscribe() 和 replaceReducer() 方法，一般会在 Redux 与某个系统(如 React ) 做桥接的时候使用。


