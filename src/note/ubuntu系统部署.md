# Linux系统部署

### 链接 
```
我用Mac  使用自带的终端链接
//打开终端 
 $ ssh 用户名@公网IP地址
 
 //栗子
 $ ssh admin@127.0.0.1
 输入管理员密码、登录到服务器
```
### 系统部署是遇到的错误

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
SHA256:FhiDxUUEBbiKRSHu5TywcDhS1DOV6Ce9uUCu0Ea1LrA.
Please contact your system administrator.
Add correct host key in /Users/corner/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in /Users/corner/.ssh/known_hosts:4
RSA host key for 你的服务器地址 has changed and you have requested strict checking.
Host key verification failed.

//最后得解决方法
在终端使用终端删除原来的配置，具体步骤如下
1. $ vi .ssh
2. 使用上下键选择 known_hosts 文件，然后回车，删除你服务器的配置 大概如下
	你的服务器IP地址 ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAtLNvJz6i25pbuJIHMwAX/tPJbboD4el+7bB/pEZ3rTHAotugbDbRECPErP+OjQF1M1F3FMngdV7gtrfGcH0iKO9Zlhs0ZX6Xi6DmwJgvRFKSYPNXtejTdG+D+Zwc1SX2SS69kTiv6hRAt5vmu9P0NmDTDqp+3j+NLmI3N0zwlUVnasUTTijdtHV1NJF/q95eXOwnlWUTmPhAHMXk+QPb9c+Stzx7GKypzuBV0POgOXXbJRkUErG5z+NtPo/82M8yafOoumeP8YlmY7I2vl0+q+k9ovdabe8+Uzwho++7FnoCR2VViwCdCS/igad7cLHEjmKSrQBKinCD4yLGWxL25Q==

3.ssh-keygen -R +输入服务器的IP
4.重新连接服务器，进入第五步
5.Are you sure you want to continue connecting (yes/no)?
6.输入yes，然后回车
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
### 在安装完成上述步骤以后做一个Demo

```
const http = require('http');
const hostname = '0.0.0.0';
const port = 3000;
const server = http.createServer((req, res) => {
res.statusCode = 200;
res.setHeader('Content-Type', 'text/plain');
res.end('Hello World\n');
});
server.listen(port, hostname, () => {
console.log(`Server running at http://${hostname}:${port}/`);
});

//然后发现公网并不能访问，后来经过查资料，发现需要配置网络和安全组那里
1.进入exs控制面板
2.进入在左侧菜单找到网络和安全，选择子项目安全组
3.点击配置规则按钮
4.添加安全组规则
5.写自己服务监听的端口 格式：80/80
6.授权对象： 0.0.0.0/0   //这个具体我也不是很清楚反正这么写可以用
7.再使用浏览器访问,就可以了
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

