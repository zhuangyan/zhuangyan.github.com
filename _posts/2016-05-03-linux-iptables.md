---
layout: post
title: iptables学习笔记
tags: ["linux", "iptables"]
---

  以前只会用service iptables stop和service iptables start 关闭和开放防火墙，现在有空学习iptables规则的详细设置了。

##  关闭所有的 INPUT FORWARD OUTPUT

下面是命令实现：
{% highlight Bash %}
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT DROP
{% endhighlight %}

再用命令 iptables -L -n 查看 是否设置好， 好看到全部 DROP 了

这样的设置好了，我们只是临时的， 重启服务器还是会恢复原来没有设置的状态

还要使用 service iptables save 进行保存

看到信息 firewall rules 防火墙的规则 其实就是保存在 /etc/sysconfig/iptables

可以打开文件查看 vi /etc/sysconfig/iptables



##  开放某个端口

下面我只打开22端口，看我是如何操作的，就是下面2个语句
{% highlight Bash %}
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A OUTPUT -p tcp --sport 22 -j ACCEPT
{% endhighlight %}

再查看下 iptables -L -n 是否添加上去, 看到添加了
{% highlight Bash %}
Chain INPUT (policy DROP)
target     prot opt source               destination
ACCEPT     tcp -- 0.0.0.0/0            0.0.0.0/0           tcp dpt:22
Chain FORWARD (policy DROP)
target     prot opt source               destination
Chain OUTPUT (policy DROP)
target     prot opt source               destination
ACCEPT     tcp -- 0.0.0.0/0            0.0.0.0/0           tcp spt:22
{% endhighlight %}

现在Linux服务器只打开了22端口，用putty.exe测试一下是否可以链接上去。

可以链接上去了，说明没有问题。

最后别忘记了保存 对防火墙的设置

通过命令：service iptables save 进行保存

{% highlight Bash %}
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A OUTPUT -p tcp --sport 22 -j ACCEPT
{% endhighlight %}

针对这2条命令进行一些讲解吧

-A 参数就看成是添加一条 INPUT 的规则

-p 指定是什么协议 我们常用的tcp 协议，当然也有udp 例如53端口的DNS

到时我们要配置DNS用到53端口 大家就会发现使用udp协议的

而 --dport 就是目标端口 当数据从外部进入服务器为目标端口

反之 数据从服务器出去 则为数据源端口 使用 --sport

-j 就是指定是 ACCEPT 接收 或者 DROP 不接收

## 禁止某个IP访问

1台Linux服务器,2台windows xp 操作系统进行访问

Linux服务器ip 192.168.1.99

xp1 ip: 192.168.1.2

xp2 ip: 192.168.1.8

下面看看我2台xp 都可以访问的

192.168.1.2 这是 xp1 可以访问的，

192.168.1.8 xp2 也是可以正常访问的。

那么现在我要禁止 192.168.1.2 xp1 访问， xp2 正常访问，

下面看看演示

通过命令 iptables -A INPUT -p tcp -s 192.168.1.2 -j DROP

这里意思就是 -A 就是添加新的规则， 怎样的规则呢？ 由于我们访问网站使用tcp的，

我们就用 -p tcp , 如果是 udp 就写udp，这里就用tcp了， -s就是 来源的意思，

ip来源于 192.168.1.2 ，-j 怎么做 我们拒绝它 这里应该是 DROP

好，看看效果。好添加成功。下面进行验证 一下是否生效
一直出现等待状态 最后 该页无法显示 ，这是 192.168.1.2 xp1 的访问被拒绝了。
再看看另外一台 xp 是否可以访问， 是可以正常访问的 192.168.1.8 是可以正常访问的

## 如何删除规则

首先我们要知道 这条规则的编号，每条规则都有一个编号
通过 iptables -L -n --line-number 可以显示规则和相对应的编号
{% highlight Bash %}
num target     prot opt source               destination
1    DROP       tcp -- 0.0.0.0/0            0.0.0.0/0           tcp dpt:3306
2    DROP       tcp -- 0.0.0.0/0            0.0.0.0/0           tcp dpt:21
3    DROP       tcp -- 0.0.0.0/0            0.0.0.0/0           tcp dpt:80
{% endhighlight %}
多了 num 这一列， 这样我们就可以 看到刚才的规则对应的是 编号2
那么我们就可以进行删除了
iptables -D INPUT 2
删除INPUT链编号为2的规则。
再 iptables -L -n 查看一下 已经被清除了。

## 过滤无效的数据包

假设有人进入了服务器，或者有病毒木马程序，它可以通过22，80端口像服务器外传送数据。
它的这种方式就和我们正常访问22，80端口区别。它发向外发的数据不是我们通过访问网页请求
而回应的数据包。
下面我们要禁止这些没有通过请求回应的数据包，统统把它们堵住掉。
iptables 提供了一个参数 是检查状态的，下面我们来配置下 22 和 80 端口，防止无效的数据包。
{% highlight Bash %}
iptables -A OUTPUT -p tcp --sport 22 -m state --state ESTABLISHED -j ACCEPT
{% endhighlight %}

可以看到和我们以前使用的：
{% highlight Bash %}
iptables -A OUTPUT -p tcp --sport 22 -j ACCEPT
{% endhighlight %}

多了一个状态判断。
同样80端口也一样， 现在删掉原来的2条规则，
{% highlight Bash %}
iptables -L -n --line-number    这个是查看规则而且带上编号。我们看到编号就可以删除对应的规则了。
iptables -D OUTPUT 1     这里的1表示第一条规则。
{% endhighlight %}

当你删除了前面的规则， 编号也会随之改变。看到了吧。
好，我们删除了前面2个规则，22端口还可以正常使用，说明没问题了
下面进行保存，别忘记了，不然的话重启就会还原到原来的样子。
{% highlight Bash %}
service iptables save    进行保存。
Saving firewall rules to /etc/sysconfig/iptables:          [ OK ]
{% endhighlight %}
其实就是把刚才设置的规则写入到 /etc/sysconfig/iptables 文件中。

## DNS端口53设置

下面我们来看看如何设置iptables来打开DNS端口，DNS端口对应的是53
大家看到我现在的情况了吧，只开放22和80端口， 我现在看看能不能解析域名。
{% highlight Bash %}
host www.google.com    输入这个命令后，一直等待，说明DNS不通出现下面提示 ：
;; connection timed out; no servers could be reached
ping 一下域名也是不通
[root@localhost ~pingwww.google.com
ping: unknown hostwww.google.com
{% endhighlight %}
我这里的原因就是 iptables 限制了53端口。
有些服务器，特别是Web服务器减慢，DNS其实也有关系的，无法发送包到DNS服务器导致的。
下面演示下如何使用 iptables 来设置DNS 53这个端口，如果你不知道 域名服务端口号，你
可以用命令 : grep domain /etc/services
{% highlight Bash %}
[root@localhost ~grep domain /etc/services
domain          53/tcp                          # name-domain server
domain          53/udp
domaintime      9909/tcp                        # domaintime
domaintime      9909/udp                        # domaintime
{% endhighlight %}

看到了吧， 我们一般使用 udp 协议。
好了， 开始设置。。。
{% highlight Bash %}
iptables -A OUTPUT -p udp --dport 53 -j ACCEPT
{% endhighlight %}
这是我们 ping 一个域名，数据就是从本机出去，所以我们先设置 OUTPUT，
我们按照ping这个流程来设置。
然后 DNS 服务器收到我们发出去的包，就回应一个回来
{% highlight Bash %}
iptables -A INPUT -p udp --sport 53 -j ACCEPT
{% endhighlight %}

同时还要设置
{% highlight Bash %}
iptables -A INPUT -p udp --dport 53 -j ACCEPT
iptables -A OUTPUT -p udp --sport 53 -j ACCEPT
{% endhighlight %}

好了， 下面开始测试下， 可以用 iptables -L -n 查看设置情况，确定没有问题就可以测试了
{% highlight Bash %}

[root@localhost ~iptables -L -n
Chain INPUT (policy DROP)
target     prot opt source               destination
ACCEPT     tcp -- 0.0.0.0/0            0.0.0.0/0           tcp dpt:22
ACCEPT     tcp -- 0.0.0.0/0            0.0.0.0/0           tcp dpt:80
ACCEPT     udp -- 0.0.0.0/0            0.0.0.0/0           udp spt:53
ACCEPT     udp -- 0.0.0.0/0            0.0.0.0/0           udp dpt:53
Chain FORWARD (policy DROP)
target     prot opt source               destination
Chain OUTPUT (policy DROP)
target     prot opt source               destination
ACCEPT     tcp -- 0.0.0.0/0            0.0.0.0/0           tcp spt:22 state ESTABLISHED
ACCEPT     tcp -- 0.0.0.0/0            0.0.0.0/0           tcp spt:80 state ESTABLISHED
ACCEPT     udp -- 0.0.0.0/0            0.0.0.0/0           udp dpt:53
ACCEPT     udp -- 0.0.0.0/0            0.0.0.0/0           udp spt:53
{% endhighlight %}

可以测试一下 是否 DNS 可以通过iptables 了。
{% highlight Bash %}

[root@localhost ~hostwww.google.com
www.google.comis an alias forwww.l.google.com.
www.l.google.comis an alias for www-china.l.google.com.
www-china.l.google.com has address 64.233.189.104
www-china.l.google.com has address 64.233.189.147
www-china.l.google.com has address 64.233.189.99
{% endhighlight %}

正常可以解析 google 域名。
ping 方面可能还要设置些东西。
用 nslookup 看看吧
{% highlight Bash %}

[root@localhost ~nslookup
>www.google.com
Server:         192.168.1.1
Address:        192.168.1.1#53
Non-authoritative answer:
www.google.comcanonical name =www.l.google.com.
www.l.google.com        canonical name = www-china.l.google.com.
Name:   www-china.l.google.com
Address: 64.233.189.147
Name:   www-china.l.google.com
Address: 64.233.189.99
Name:   www-china.l.google.com
Address: 64.233.189.104
{% endhighlight %}

说明本机DNS正常， iptables 允许53这个端口的访问。

## iptables对ftp的设置

现在我开始对ftp端口的设置，按照我们以前的视频，添加需要开放的端口
ftp连接端口有2个 21 和 20 端口，我现在添加对应的规则。
{% highlight Bash %}

[root@localhost rootiptables -A INPUT -p tcp --dport 21 -j ACCEPT
[root@localhost rootiptables -A INPUT -p tcp --dport 20 -j ACCEPT
[root@localhost rootiptables -A OUTPUT -p tcp --sport 21 -j ACCEPT
[root@localhost rootiptables -A OUTPUT -p tcp --sport 20 -j ACCEPT
{% endhighlight %}

好，这样就添加完了，我们用浏览器访问一下ftp,出现超时。
所以我刚才说 ftp 是比较特殊的端口，它还有一些端口是 数据传输端口，
例如目录列表， 上传 ，下载 文件都要用到这些端口。
而这些端口是 任意 端口。。。 这个 任意 真的比较特殊。
如果不指定什么一个端口范围， iptables 很难对任意端口开放的，
如果iptables允许任意端口访问， 那和不设置防火墙没什么区别，所以不现实的。
那么我们的解决办法就是 指定这个数据传输端口的一个范围。
下面我们修改一下ftp配置文件。
我这里使用vsftpd来修改演示，其他ftp我不知道哪里修改，大家可以找找资料。
[root@localhost rootvi /etc/vsftpd.conf
在配置文件的最下面 加入
pasv_min_port=30001
pasv_max_port=31000
然后保存退出。
这两句话的意思告诉vsftpd, 要传输数据的端口范围就在30001到31000 这个范围内传送。
这样我们使用 iptables 就好办多了，我们就打开 30001到31000 这些端口。
{% highlight Bash %}
[root@localhost rootiptables -A INPUT -p tcp --dport 30001:31000 -j ACCEPT
[root@localhost rootiptables -A OUTPUT -p tcp --sport 30001:31000 -j ACCEPT
[root@localhost rootservice iptables save
{% endhighlight %}

最后进行保存， 然后我们再用浏览器范围下 ftp。可以正常访问
用个账号登陆上去，也没有问题，上传一些文件上去看看。
看到了吧，上传和下载都正常。。 再查看下 iptables 的设置
{% highlight Bash %}
[root@localhost rootiptables -L -n
Chain INPUT (policy DROP)
target     prot opt source               destination
ACCEPT     tcp -- 0.0.0.0/0            0.0.0.0/0          tcp dpt:22
ACCEPT     tcp -- 0.0.0.0/0            0.0.0.0/0          tcp dpt:21
ACCEPT     tcp -- 0.0.0.0/0            0.0.0.0/0          tcp dpt:20
ACCEPT     tcp -- 0.0.0.0/0            0.0.0.0/0          tcp dpts:30001:31000
Chain FORWARD (policy DROP)
target     prot opt source               destination
Chain OUTPUT (policy DROP)
target     prot opt source               destination
ACCEPT     tcp -- 0.0.0.0/0            0.0.0.0/0          tcp spt:22
ACCEPT     tcp -- 0.0.0.0/0            0.0.0.0/0          tcp spt:21
ACCEPT     tcp -- 0.0.0.0/0            0.0.0.0/0          tcp spt:20
ACCEPT     tcp -- 0.0.0.0/0            0.0.0.0/0          tcp spts:30001:31000
{% endhighlight %}
这是我为了演示ftp特殊端口做的简单规则，大家可以添加一些对数据包的验证
例如 -m state --state ESTABLISHED,RELATED 等等要求更加高的验证



