---
layout: post
title: 在centos7上用源码安装nginx
tags: ["bootstrap","前端"]
---


### 操作系统

以最小化方式安装的centos7,安装完成后连wget,ifconfig命令都没有。用yum安装下
{% highlight shell %}
[root@centos7 ~]# yum install -y wget net-tools.x86_64
{% endhighlight %}

换成163的yum源：
{% highlight shell %}
[root@centos7 ~]# mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
[root@centos7 ~]# wget http://mirrors.163.com/.help/CentOS7-Base-163.repo
[root@centos7 ~]# cp CentOS7-Base-163.repo /etc/yum.repos.d/
[root@centos7 ~]# yum clean all
[root@centos7 ~]# yum makecache
{% endhighlight %}

### 准备安装
相关库的安装
{% highlight shell %}
[root@centos7 ~]# yum -y install gcc gcc-c++ make zlib-devel pcre-devel openssl-devel
{% endhighlight %}

下载并解压源码
{% highlight shell %}
[root@centos7 src]#  wget http://nginx.org/download/nginx-1.11.10.tar.gz  
[root@centos7 ~]# tar -zxvf nginx-1.11.10.tar.gz 
[root@centos7 ~]# mkdir src
[root@centos7 ~]# cd src
[root@centos7 src]# tar -zxvf nginx-1.11.10.tar.gz 
[root@centos7 src]# cd nginx-1.11.10
{% endhighlight %}

### 编译及安装

{% highlight shell %}
[root@centos7 nginx-1.11.10]#  ./configure --user=nginx --group=nginx --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --lock-path=/var/run/nginx.lock --with-http_ssl_module --with-pcre
[root@centos7 nginx-1.11.10]# make
[root@centos7 nginx-1.11.10]# make install
{% endhighlight %}


### 调整及测试nginx

添加用户
{% highlight shell %}
 useradd -d /etc/nginx/ -s /sbin/nologin nginx
{% endhighlight %}

修改配置文件
{% highlight shell %}
vi /etc/nginx/nginx.conf
{% endhighlight %}
#user  nobody;替换为user nginx;

启动nginx
{% highlight shell %}
[root@centos7 nginx-1.11.10]# /usr/sbin/nginx
{% endhighlight %}

查看监听端口是否正确
{% highlight shell %}
[root@centos7 nginx-1.11.10]# netstat -tulpn | grep nginx
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      28586/nginx: master 
[root@centos7 nginx-1.11.10]# 
{% endhighlight %}
此时用浏览器访问服务器IP能看到nginx的默认页面，如果不能访问，关闭防火墙试试“systemctl stop firewalld.service”

nginx命令参数：
{% highlight shell %}
nginx -V = displays Nginx modules and configurations
nginx -h = help options
nginx = start Nginx process
nginx -s stop = stop Nginx process
nginx -s reload = reload Nginx process
{% endhighlight %}

要以系统服务管理nginx需要编写脚本：
{% highlight shell %}
/etc/init.d/nginx
{% endhighlight %}
输入以下内容：

{% highlight shell %}
#!/bin/sh
#
# nginx - this script starts and stops the nginx daemon
#
# chkconfig:   - 85 15
# description:  Nginx is an HTTP(S) server, HTTP(S) reverse \
#               proxy and IMAP/POP3 proxy server
# processname: nginx
# config:      /etc/nginx/nginx.conf
# pidfile:     /var/run/nginx.pid
# user:        nginx
# Source function library.
. /etc/rc.d/init.d/functions
# Source networking configuration.
. /etc/sysconfig/network
# Check that networking is up.
[ "$NETWORKING" = "no" ] && exit 0
nginx="/usr/sbin/nginx"
prog=$(basename $nginx)
NGINX_CONF_FILE="/etc/nginx/nginx.conf"
lockfile=/var/run/nginx.lock
start() {
[ -x $nginx ] || exit 5
[ -f $NGINX_CONF_FILE ] || exit 6
echo -n $"Starting $prog: "
daemon $nginx -c $NGINX_CONF_FILE
retval=$?
echo
[ $retval -eq 0 ] && touch $lockfile
return $retval
}
stop() {
echo -n $"Stopping $prog: "
killproc $prog -QUIT
retval=$?
echo
[ $retval -eq 0 ] && rm -f $lockfile
return $retval
}
restart() {
configtest || return $?
stop
start
}
reload() {
configtest || return $?
echo -n $"Reloading $prog: "
killproc $nginx -HUP
RETVAL=$?
echo
}
force_reload() {
restart
}
configtest() {
$nginx -t -c $NGINX_CONF_FILE
}
rh_status() {
status $prog
}
rh_status_q() {
rh_status >/dev/null 2>&1
}
case "$1" in
start)
rh_status_q && exit 0
$1
;;
stop)
rh_status_q || exit 0
$1
;;
restart|configtest)
$1
;;
reload)
rh_status_q || exit 7
$1
;;
force-reload)
force_reload
;;
status)
rh_status
;;
condrestart|try-restart)
rh_status_q || exit 0
;;
*)
echo $"Usage: $0 {start|stop|status|restart|condrestart|try-restart|reload|force-reload|configtest}"
exit 2
esac
{% endhighlight %}

设置系统服务
{% highlight shell %}
# cd /etc/systemd/system
# vi nginx.service
{% endhighlight %}

内容如下：

{% highlight shell %}
[Unit]
Description=nginx 
After=network.target 
  
[Service] 
Type=forking 
ExecStart=/etc/init.d/nginx start        
ExecReload=/etc/init.d/nginx restart        
ExecStop=/etc/init.d/nginx  stop        
PrivateTmp=true 
  
[Install] 
WantedBy=multi-user.target
{% endhighlight %}
设置自启动
{% highlight shell %}
# systemctl enable nginx.service
# systemctl start nginx.service
{% endhighlight %}