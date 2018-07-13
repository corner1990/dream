# git 本地配置

### 全局配置

- 全局用户名密码配置：

```
git config --global user.name "leo"
git config --global user.email "leo***cn"
```

- 用户名和密码存贮的位置

```
C:\Users\用户名\.gitconfig  文件
```

- 文件内容

```
[core]
        autocrlf = true
        excludesfile = C:\\Users\\lixinglong\\Documents\\gitignore_global.txt
[user]
        name = leo
        email = leo@***.cn                                                     
```

### 根据项目配置



- 配置及用户名密码

```
git config user.name "leo"
git config user.email "leo***cn"
```

- 用户名和密码存贮的位置是： 

```
对应的本地仓库的.git文件中的config文件
在当前项目目录下使用 cat .git/config,就可以看到配置文件内容
PS E:\dream> cat .git/config
[core]
        repositoryformatversion = 0
        filemode = false
        bare = false
        logallrefupdates = true
        symlinks = false
        ignorecase = true
[remote "origin"]
        url = https://github.com/***/***.git
        fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
        remote = origin
        merge = refs/heads/master
```

### 配置记住密码

```
[core]
        autocrlf = true
        excludesfile = C:\\Users\\lixinglong\\Documents\\gitignore_global.txt
[user]
        name = leo
        email = leo@***.cn
[credential]
	helper = store // 这样配置就会记住密码了
```

### git 

```
$ git config --global --list // 查看全局配置
$ git config --global user.name hoby // 修改提交名
$ git config --global alias.br branch // 修改简写
$ git config --unset alias.co // 删除配置项
$ git config --global core.ignorecase false // 关闭忽略大小写
具体配置可参考如下，其中：
【user】: 用户提交时显示在log里的信息
【alias】: 常用git命令简写
【core】: window系统和类linux系统回车键转换
【push】: 默认对应远端（当本地分支名与远程分支名不一致有用）

```

### git config 解析 

```
user.email=leo@xxx.com
user.name=leo
core.ignorecase=false            # 不许忽略文件名大小写
core.autocrlf=input              # 换行模式为 input，即提交时转换为LF，检出时不转换
core.filemode=false              # 不检查文件权限
core.safecrlf=true               # 拒绝提交包含混合换行符的文件
core.editor=vim
core.repositoryformatversion=0   # Internal variable identifying the repository format and layout version
core.bare=false                  # 默认不创建裸仓库
core.logallrefupdates=true       # log 所有 ref 的更新
core.precomposeunicode=true      # Mac专用选项，开启以便文件名兼容其他系统
push.default=simple                    # 只推送本地当前分支，且与上游分支名字一致
alias.lg=log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
pull.rebase=true                 # 强制开启 rebase 模式
credential.helper store // 记住密码

// 推荐配置
git config --global user.email “mtide@xxx.com"
git config --global user.name=mtide
sudo git config --system core.ignorecase false
sudo git config --system core.autocrlf input
sudo git config --system core.filemode false
sudo git config --system core.safecrlf true
sudo git config --system core.editor vim
sudo git config --system core.repositoryformatversion 0
sudo git config --system core.bare false
sudo git config --system core.logallrefupdates true
sudo git config --system core.precomposeunicode true
sudo git config --system push.default simple
sudo git config --system alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
sudo git config --system pull.rebase true
sudo git config credential.helper store // 记住密码


```

