---
layout: post
title: 调用startActivityForResult后onActivityResult立刻响应，返回当前页onActivityResult不响应的问题 
---
做为新手被这个问题困扰了一上午，下午才想起百度搜索。原来很多人都遇到过同样的问题，原因是和Activity的加载方式有关。
在AndroidManifest.xml中设置android:launchMode="singleInstance"或者在运行时设置intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)都会导致无法接收返回值的问题。

参考:http://developer.android.com/reference/android/app/Activity.html

>Note that this method should only be used with Intent protocols that are defined to return a result. In other protocols (such as ACTION_MAIN or ACTION_VIEW), you may not get the result when you expect. For example, if the activity you are launching uses the singleTask launch mode, it will not run in your task and thus you will immediately receive a cancel result.


