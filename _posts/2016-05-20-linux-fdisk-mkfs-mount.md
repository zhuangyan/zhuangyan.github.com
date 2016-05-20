---
layout: post
title: linux服务器挂载新硬盘操作
tags: ["linux"]
---

  整理记录给服务器新硬盘格式化，分区并挂载到目录的操作。

##  查看现有硬盘情况


{% highlight Bash %}
[root@template ~]# fdisk -l

Disk /dev/vda: 21.5 GB, 21474836480 bytes
16 heads, 63 sectors/track, 41610 cylinders
Units = cylinders of 1008 * 512 = 516096 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x000eb3c7

   Device Boot      Start         End      Blocks   Id  System
/dev/vda1   *           3         409      204800   83  Linux
Partition 1 does not end on cylinder boundary.
/dev/vda2             409        8731     4194304   82  Linux swap / Solaris
Partition 2 does not end on cylinder boundary.
/dev/vda3            8731       41611    16571392   83  Linux
Partition 3 does not end on cylinder boundary.

Disk /dev/vdb: 322.1 GB, 322122547200 bytes
16 heads, 63 sectors/track, 624152 cylinders
Units = cylinders of 1008 * 512 = 516096 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x00000000
{% endhighlight %}

/dev/vdb 就是新增加的硬盘，还没有进行分区

##  分区

{% highlight Bash %}
[root@template ~]# fdisk /dev/vdb
Device contains neither a valid DOS partition table, nor Sun, SGI or OSF disklabel
Building a new DOS disklabel with disk identifier 0x6d4e96f4.
Changes will remain in memory only, until you decide to write them.
After that, of course, the previous content won't be recoverable.

Warning: invalid flag 0x0000 of partition table 4 will be corrected by w(rite)

WARNING: DOS-compatible mode is deprecated. It's strongly recommended to
         switch off the mode (command 'c') and change display units to
         sectors (command 'u').

Command (m for help): n
Command action
   e   extended
   p   primary partition (1-4)
p
Partition number (1-4): 1
First cylinder (1-624152, default 1): 
Using default value 1
Last cylinder, +cylinders or +size{K,M,G} (1-624152, default 624152): 
Using default value 624152

Command (m for help): w
The partition table has been altered!

Calling ioctl() to re-read partition table.
Syncing disks.
{% endhighlight %}

我只为了一个主分区(p)

## 格式化

把唯一的分区vdb1格式化为ext4格式
{% highlight Bash %}
[root@template ~]# mkfs -t ext4 /dev/vdb1
mke2fs 1.41.12 (17-May-2010)
Filesystem label=
OS type: Linux
Block size=4096 (log=2)
Fragment size=4096 (log=2)
Stride=0 blocks, Stripe width=0 blocks
19660800 inodes, 78643144 blocks
3932157 blocks (5.00%) reserved for the super user
First data block=0
Maximum filesystem blocks=4294967296
2400 block groups
32768 blocks per group, 32768 fragments per group
8192 inodes per group
Superblock backups stored on blocks: 
	32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208, 
	4096000, 7962624, 11239424, 20480000, 23887872, 71663616

Writing inode tables: done                            
Creating journal (32768 blocks): done
Writing superblocks and filesystem accounting information: done

This filesystem will be automatically checked every 20 mounts or
180 days, whichever comes first.  Use tune2fs -c or -i to override.
{% endhighlight %}


## 挂载


{% highlight Bash %}
[root@template ~]# mkdir /storage
[root@template ~]# mount /dev/vdb1 /storage
{% endhighlight %}


然后要所挂载信息保存到/etc/fstab中，这样下载重启后就会自动挂载了
{% highlight Bash %}
[root@template ~]# vi /etc/fstab
{% endhighlight %}
按G到最后一行，再按o新增一行，输入“/dev/vdb1               /storage                ext4    defaults        1 2 ”


## 最后再查看一下磁盘使用情况


{% highlight Bash %}
[root@template /]# df -Th
Filesystem     Type   Size  Used Avail Use% Mounted on
/dev/vda3      ext4    16G  9.4G  5.5G  64% /
tmpfs          tmpfs  7.8G     0  7.8G   0% /dev/shm
/dev/vda1      ext4   194M   34M  151M  19% /boot
/dev/vdb1       ext4   985G  200M  935G   1% /storage
{% endhighlight %}
