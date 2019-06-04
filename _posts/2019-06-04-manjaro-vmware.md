---
layout: post
title: manjaro上安装vmware遇到的问题及解决
tags: ["manjaro","vmware"]
---

　　在公司的新电脑上安装了manjaro linux用于开发，但是有些软件还是需要在windows上运行，所以还要安装虚拟机，但是遇到了些问题，用了很长时间才解决．

## 问题描述

    启动报如下错误：
    ~~~
    Could not open /dev/vmmon: No such file or directory. Please make sure that the kernel module `vmmon’ is loaded
    ~~~

    这个错误在网上说明就是内核版本问题，解决方案是执行

    ~~~
    sudo modprobe --force-vermagic -a vmw_vmci vmmon
    ~~~

    但是我执行命令又报如下错误:

　　　<img src="/static/img/2019/vmware01.jpg" width = "800px" title="错误"/>

## 解决

先执行
~~~
sudo vmware-modconfig --console --install-all
~~~
再执行
~~~
sudo  modprobe --force-vermagic -a vmw_vmci vmmon
~~~

## 永久解决

上面的命令生效后，可以启动vmware,但是系统重启后还要重新执行一次，所以需要把它放入到开机自动执行脚本里
~~~
sudo vim /usr/lib/systemd/system/rc-local.service
~~~

内容为：
~~~
[Unit]
Description="/etc/rc.local Compatibility" 
#Wants=sshdgenkeys.service
#After=sshdgenkeys.service
#After=network.target

[Service]
Type=forking
ExecStart=/etc/rc.local start
TimeoutSec=0
StandardInput=tty
RemainAfterExit=yes
SysVStartPriority=99

[Install]
WantedBy=multi-user.target
~~~

然后，我们创建 /etc/rc.local 文件：
~~~
sudo touch /etc/rc.local
sudo chmod +x /etc/rc.local
~~~

编辑rc.local的内容为：
~~~
#!/bin/bash
# rc.local
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other# value on error.
#
# In order to enable or disable this script just change the execution# bits.
#
# By default this script does nothing.#log
vmware-modconfig --console --install-all
modprobe --force-vermagic -a vmw_vmci vmmon

exit 0
~~~

最后：
~~~
sudo systemctl enable rc-local.service
~~~

