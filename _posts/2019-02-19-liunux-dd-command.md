---
layout: post
title: 在Linux系统下用dd命令制作ISO镜像U盘启动盘
tags: ["linux"]
---
Linux dd命令用于读取、转换并输出数据。

dd可从标准输入或文件中读取数据，根据指定的格式来转换数据，再输出到文件、设备或标准输出。

dd命令的用处很多，如测试硬盘的读写速度，硬盘备份，硬盘修复，增加swap分区文件大小等．

本文主要讲解用dd命令制作ISO镜像U盘启动盘的过程：

### 确认 U 盘路径：

~~~sh
sudo fdisk -l
~~~

### umount U 盘
/dev/sdb 是我的 U 盘设备。

~~~sh
sudo umount /dev/sdb*   
~~~

### 格式化 U 盘：

~~~sh
sudo mkfs.vfat /dev/sdb -I  
~~~

### 使用dd命令写入ISO数据：

~~~sh
sudo dd if=xxx.iso of=/dev/sdb
~~~

请耐心等待，我写入ubuntu18.4到usb2.0U盘用了10分钟