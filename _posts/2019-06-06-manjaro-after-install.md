---
layout: post
title: manjaro安装完后的配置
tags: ["manjaro"]
---

　　manjaro安装的最大问题是卡在了UEFI的引导上，这个不多说了，主要记录下首次进入系统后需要做的设置！

## 更改国内源



~~~
sudo pacman-mirrors -GB testing -c China
~~~



## 增加Arch linuxcn源

在/etc/pacman.conf文件末尾添加两行：
~~~
[archlinuxcn]
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
~~~



## 更新系统

~~~
 sudo pacman -Syu
~~~

## 安装archlinuxcn-keyring

~~~
 sudo pacman -S archlinuxcn-keyring
 sudo pacman -Syu

~~~

## 修改Home下的目录为英文

修改目录映射文件名；

~~~
vim ~/.config/user-dirs.dirs
~~~

修改为以下内容：

~~~
XDG_DESKTOP_DIR="$HOME/Desktop"
XDG_DOWNLOAD_DIR="$HOME/Download"
XDG_TEMPLATES_DIR="$HOME/Templates"
XDG_PUBLICSHARE_DIR="$HOME/Public"
XDG_DOCUMENTS_DIR="$HOME/Documents"
XDG_MUSIC_DIR="$HOME/Music"
XDG_PICTURES_DIR="$HOME/Pictures"
XDG_VIDEOS_DIR="$HOME/Videos"
~~~

将Home目录下的中文目录名改为对应的中文名；

~~~
cd ~
mv 公共 Public
mv 模板 Templates
mv 视频 Videos
mv 图片 Pictures
mv 文档 Documents
mv 下载 Download
mv 音乐 Music
mv 桌面 Desktop
~~~

重启系统。

## 安装搜狗输入法

~~~
 sudo pacman -S fcitx-im    #默认全部安装
 sudo pacman -S fcitx-configtool
 sudo pacman -S fcitx-sogoupinyin
~~~
新建~/.xprofile文件，加入如下内容

~~~
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx"
~~~

## 安装和使用oh-my-zsh
### 安装

oh-my-zsh 的配置
查看本地有哪几种shell

~~~
cat /etc/shells
~~~

manjaro 默认已经安装了 zsh
切换到zsh，输入密码，连续回车确认

~~~
chsh -s /bin/zsh
~~~

在manjaro的gnome桌面中如果需要默认启动终端的时候就是zsh需要在终端中进行配置

- 打开终端，编辑>>>>首选项>>>>命令
- 勾选**“运行自定义命令而不是shell”** 选项
- 在下面的**“自定义命令**”中填写  zsh

### 安装 oh-my-zsh的配置文件

~~~
via curl
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
~~~

或者 

~~~
via wget
sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
~~~

替换zsh的配置文件为oh-my-zsh

~~~
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
~~~

### 更改主题

~~~
vim ~/.zshrc
~~~

找到ZSH_THEME=更改为

~~~
ZSH_THEME="agnoster"
~~~

### 安装插件

安装zsh-autosuggestions

~~~
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/plugins/zsh-autosuggestions
~~~

安装zsh-syntax-highlighting

~~~
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.oh-my-zsh/plugins/zsh-syntax-highlighting
~~~

在~/.zshrc中找到

~~~
plugins=(
  git
)
~~~

在括号中git的下一行添加插件名称使其生效

~~~
plugins=(
  git
  zsh-syntax-highlighting
  zsh-autosuggestions
)
~~~

## 安装yay

>> yay 是下一个最好的 AUR 助手。它使用 Go 语言写成，宗旨是提供最少化用户输入的 pacman 界面、yaourt 式的搜索，而几乎没有任何依赖软件。yay 的特性：yay 提供 AUR 表格补全，并且从 ABS 或 AUR 下载 PKGBUILD支持收窄搜索，并且不需要引用 PKGBUILD 源yay 的二进制文件除了 pacman 以外别无依赖

你可以从 git 克隆并编译安装。
~~~
git clone https://aur.archlinux.org/yay.git

cd yay

makepkg -si
~~~

使用 yay：

搜索：

~~~
yay -Ss <package-name>
~~~
安装：
~~~
yay -S <package-name>
~~~

## JDK设置

###　卸载自带的openJDK
~~~
sudo pacman -R jdk8-openjdk
sudo pacman -R jre8-openjdk
sudo pacman -R jre8-openjdk-headless
~~~

### 使用yay安装jdk

~~~
yay jdk
~~~
我选择的是＂oracle jdk 12"

查看jdk状态
~~~
archlinux-java status
~~~


设置默认jdk
~~~
sudo archlinux-java set java-12-jdk
~~~

