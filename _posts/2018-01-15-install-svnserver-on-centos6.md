---
layout: post
title: Centos6下搭建SVN服务器
tags: ["svn"]
---

Subversion是一个自由，开源的版本控制系统。Subversion将文件存放在中心版本库里。这个版本库很像一个普通的文件服务器，不同的是，它可以记录每一次文件和目录的修改情况。这样就可以籍此将数据恢复到以前的版本，并可以查看数据的更改细节。Subversion是Apache基金会下的一个项目，官网 https://subversion.apache.org/ 。



### 1.安装
{% highlight Bash %}

yum -y install subversion

{% endhighlight %}



### 2.创建SVN版本库


{% highlight Bash %}
　　 mkdir -p /opt/svn/repos/svn1                      ##创建目录
    svnadmin create /opt/svn/repos/svn1               ##创建SVN版本库
{% endhighlight %}

### 3.配置版本库

cd /opt/svn/repos/svn1/conf 并且 vim passwd（添加用户）：

{% highlight Bash %}

[users]
# harry = harryssecret
# sally = sallyssecret
#
user1 = 123
user2 = 123

{% endhighlight %}

vim authz（添加权限）：

{% highlight Bash %}

[svn1:/]
user1 = rw
user2 = rw

#svn1是具体版本库的标签

{% endhighlight %}


vim svnserve.conf(取消一些注释)：
{% highlight Bash %}

[general]
anon-access = none                    #非授权用户无法访问
auth-access = write                   #授权用户有写权限
password-db = passwd                  #密码数据所在目录
authz-db = authz  


{% endhighlight %}

### 4.启动SVN

{% highlight Bash %}

svnserve -d -r /opt/svn/repos/ --listen-port 81    #注意目录，不包含svn1

ps aux | grep svnserve            #查看服务是否启动

{% endhighlight %}


### 5.测试SVN

{% highlight Bash %}

 svn checkout svn://10.1.1.102:81/svn1

{% endhighlight %}

### 6.如果想创建多个版本库
{% highlight Bash %}

mkdir -p /opt/svn/repos/svn2                      ##创建目录

svnadmin create /opt/svn/repos/svn2

重复步骤3的配置方法

killall svnserve                                  #关闭svn服务
svnserve -d -r /opt/svn/repos/　　　　　　　　　　　　#启动svn，注意目录，不包含svn2

{% endhighlight %}


### 7.删除版本库

{% highlight Bash %}
rm -rf svn2/
{% endhighlight %}

### 8.同个SVN库下根据不同的权限访问不同的目录

{% highlight Bash %}
　[groups]
　chanpin = user1,user2
　yanfa = user3,user4

[svn1:/]
test = rw
other = rw
anyone = rw
@chanpin = rw
@yanfa = rw

[svn1:/chanpin]
other = rw
@chanpin = rw
* =

[svn1:/yanfa]
anyone = rw
@yanfa = rw
* =
{% endhighlight %}
