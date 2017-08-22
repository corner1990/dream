# Ubuntu系统部署

### 链接 
```
我用Mac  使用自带的终端链接
//打开终端 
 $ ssh 用户名@公网IP地址
 
 //栗子
 $ ssh admin@127.0.0.1
 输入管理员密码、登录到服务器
```
### 安装nvm

```
 1.首先安装必要的包 
 sudo apt-get update  
 sudo apt-get install build-essential libssl-dev  
 
 2.安装nvm ab任选一个即可
  a): curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash
  b): wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash 
  
  3.重启终端
  4.检查安装及使用：
	注意，此处需要重启terminal终端才能生效。
	使用nvm --help查看是否安装成功。
	使用nvm ls查看已经安装的版本。
	使用nvm ls-remote查看所有远端版本。
	使用nvm install安装某个版本，如nvm install v5.3.0。
	使用nvm use切换到某个版本，如nvm use v5.3.0使用5.3.0，nvm use system使用系统版本。

```
###  安装nginx
```javascript
javascript
//使用cd命令切换到下载目录 我直接安装在跟目录
cd /root
下载nginx:    wget http://nginx.org/download/nginx-1.8.0.tar.gz
下载openssl : wget http://www.openssl.org/source/openssl-fips-2.0.9.tar.gz
下载zlib    : wget http://zlib.net/zlib-1.2.7.tar.gz
下载pcre    : wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.40.tar.gz
如果没有安装c++编译环境，还得安装，通过yum install gcc-c++完成安装
//注意 上边的链接可能会失效 如果无效的话自己百度一个
//编译安装

openssl:
 tar zxvf openssl-fips-2.0.9.tar.gz
 cd openssl-fips-2.0.9
 ./config && make && make install
 
pcre:
 tar zxvf pcre-8.36.tar.gz
 cd pcre-8.36
 ./configure && make && make install

zlib:
 tar zxvf zlib-1.2.8.tar.gz
 cd zlib-1.2.8
 ./configure && make && make install
 
//上边按照步骤操作 一般不会有错 如果说出现解压失败的话可以重新现在or替换新的链接下载
//最后安装nginx

nginx:
 tar zxvf nginx-1.8.0.tar.gz
 cd nginx-1.8.0
 ./configure && make && make install

//启动nginx  
/usr/local/nginx/sbin/nginx

//如果出现了如下的错误
hankcs@ubuntu:~$ sudo /etc/init.d/nginx start
[sudo] password for hankcs: 
 * Starting nginx nginx                                                         nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
nginx: [emerg] still could not bind()

//修改这个配置文件
/etc/nginx/sites-available/default

listen 80;
listen [::]:80 default_server;

//修改为如下
listen 80;
listen [::]:80 ipv6only=on default_server;
```


### 安装yum

```javascript
//1.国内的软件源
 http://mirrors.163.com/centos/7/os/x86_64/Packages/
 http://mirrors.aliyun.com/centos/7/os/x86_64/Packages/

//2.下载软件 版本可能有变化，以网站为主 
//wget http://mirrors.163.com/centos/7/os/x86_64/Packages/yum-3.4.3-150.el7.centos.noarch.rpm 
yum-metadata-parser-1.1.4-10.el7.x86_64.rpm
yum-plugin-fastestmirror-1.1.31-40.el7.noarch.rpm
yum-3.4.3-150.el7.centos.noarch.rpm
python-iniparse-0.4-9.el7.noarch.rpm

//安装 python-iniparse-0.4-9.el7.noarch.rpm

```

