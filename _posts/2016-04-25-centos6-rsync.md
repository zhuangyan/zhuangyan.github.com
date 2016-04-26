---
layout: post
title: centos6.5上进行两台服务器之间的文件双向同步
tags: ["服务器", "centos"]
---

  由于用户的头像在PC端和APP端都可以进行更改，所以需要同步两台服务器的头像目录，为便可以相互访问。Django服务器的存储目录为“/home/django/wwwroot/stores/avatar”，PHP服务器的存储目录为“/usr/local/nginx/html/data/upload/shop/avatar”。我选择了用“unison+inotify”的方案来解决，步骤如下：

## 保证两台服务器之间可以通过ssh无密码访问
分别在server1（192.168.1.120）和server2（192.168.1.121）下，创建秘钥
{% highlight Bash %}
[root@template ~]# cd /home/src/
[root@template ~]# mkdir ~/.ssh
[root@template ~]# chmod 700 ~/.ssh
{% endhighlight %}
生成RSA密钥
{% highlight Bash %}
[root@template ~]# ssh-keygen -t rsa 
{% endhighlight %}
(然后连续三次回车)
添加密钥到授权密钥文件中
{% highlight Bash %}
[root@template ~]# cd ~/.ssh
[root@template ~]# ssh "-p 22" 192.168.1.120 cat /root/.ssh/id_rsa.pub >> authorized_keys  #小写p
[root@template ~]# ssh "-p 22" 192.168.1.121 cat /root/.ssh/id_rsa.pub >> authorized_keys
[root@template ~]# scp  -P 22 authorized_keys 192.168.1.121:/root/.ssh/  #大写P 
[root@template ~]# chmod 600 /root/.ssh/authorized_keys
{% endhighlight %}
在服务器server2上操作
{% highlight Bash %}
[root@template ~]# chmod 600 /root/.ssh/authorized_keys
{% endhighlight %}
分别在两台机器上执行如下测试
{% highlight Bash %}
[root@template ~]# ssh -p 22 192.168.1.120 date
[root@template ~]# ssh -p 22 192.168.1.121 date
{% endhighlight %}
至此用户授权完成。

## 软件安装，server1和server2都得安装

### 首先安装ocaml

{% highlight Bash %}
[root@template src]# wget http://caml.inria.fr/pub/distrib/ocaml-4.02/ocaml-4.02.3.tar.gz
[root@template src]# tar xvf ocaml-4.02.3.tar.gz
[root@template src]# cd ocaml-4.02.3
[root@template ocaml-4.02.3]# ./configure
[root@template ocaml-4.02.3]# make world opt
[root@template ocaml-4.02.3]# make install
[root@template ocaml-4.02.3]# cd ..
{% endhighlight %}

### 安装unison 

{% highlight Bash %}
[root@template src]# yum -y install ctags-etags
[root@template src]# wget wget http://www.seas.upenn.edu/~bcpierce/unison//download/releases/stable/unison-2.48.3.tar.gz
[root@template src]# tar xvf unison-2.48.3.tar.gz
[root@template src]# cd unison-2.48.3
[root@template unison-2.48.3]# make UISTYLE=text THREADS=true
[root@template unison-2.48.3]# cp unison /usr/local/bin
[root@template unison-2.48.3]# cd ..
{% endhighlight %}

### 安装inotify 

{% highlight Bash %}
[root@template src]# curl -O https://cloud.github.com/downloads/rvoicilas/inotify-tools/inotify-tools-3.14.tar.gz
[root@template src]# tar xvf inotify-tools-3.14.tar.gz
[root@template src]# cd inotify-tools-3.14
[root@template inotify-tools-3.14]# ./configure
[root@template inotify-tools-3.14]# make
[root@template inotify-tools-3.14]# make install
[root@template inotify-tools-3.14]# cd ..
{% endhighlight %}

到此所需的软件都已安装完毕，可以在server1服务器上执行这个命令，来查看两台服务器之间是否可以同步文件
{% highlight Bash %}
[root@template src]# unison -batch /home/django/wwwroot/stores/avatar ssh://192.168.1.121//usr/local/nginx/html/data/upload/shop/avatar
{% endhighlight %}
如果这时候抱如下错误：
{% highlight Bash %}
[root@template src]# /usr/local/bin/inotifywait: error while loading shared libraries: libinotify
{% endhighlight %}
可以执行下这个命令： 
{% highlight Bash %}
[root@template src]# ln -sv /usr/local/lib/libinotify* /usr/lib/
{% endhighlight %}
执行成功后，看目录下的文件是否同步。 

## 创建.sh脚本来执行同步

server1上创建脚本/root/inotify.sh(chmod a+x /root/inotify.sh) :

{% highlight Bash %}
#/bin/bash
ip2="192.168.1.121"
src2="/home/django/wwwroot/stores/avatar/"
dst2="/usr/local/nginx/html/data/upload/shop/avatar/"
/usr/local/bin/inotifywait -mrq -e create,delete,modify,move $src2 | while read line; do
/usr/local/bin/unison -batch $src2 ssh://$ip2/$dst2
echo -n "$line " >> /usr/local/logs/inotify.log
echo `date | cut -d " " -f1-4` >> /usr/local/logs/inotify.log
done
{% endhighlight %}

server2上创建脚本/root/inotify.sh(chmod a+x /root/inotify.sh) :

{% highlight Bash %}
#/bin/bash
ip2="192.168.1.120"
src2="/usr/local/nginx/html/data/upload/shop/avata/"
dst2="/home/django/wwwroot/stores/avatar/"
/usr/local/bin/inotifywait -mrq -e create,delete,modify,move $src2 | while read line; do
/usr/local/bin/unison -batch $src2 ssh://$ip2/$dst2
echo -n "$line " >> /usr/local/logs/inotify.log
echo `date | cut -d " " -f1-4` >> /usr/local/logs/inotify.log
done
{% endhighlight %}
最后分别在server1和server2上执行上面两个脚本，这样两台服务器的目录会保持相互实时同步了！！！
