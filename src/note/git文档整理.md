# git

### git简介

- 是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理。 [1]  Git 是 [Linus Torvalds](https://baike.baidu.com/item/Linus Torvalds/9336769) 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

- 常见的版本管理工具 [SVN](https://tortoisesvn.net/), CVS， ClearCase，集中式版本控制工具，版本库是集中存放在中央服务器的，team里每个人work时从中央服务器下载代码，是必须联网才能工作，局域网或互联网。个人修改后然后提交到中央版本库，ClearCase是IBM公司的，是收费的，一般使用ClearCase的公司都是大公司；svn, cvs是开源的，cvs是最早的版本控制工具，不稳定，svn解决了cvs的不稳定性，现在是开源社区的主流集中式版本控制工具。

  

### git的特点

- 适合[分布式开发](https://baike.baidu.com/item/分布式开发)，强调个体。
- 公共服务器压力和数据量都不会太大。
- 速度快、灵活。
- 任意两个开发者之间可以很容易的解决冲突。
- 离线工作。

### git的缺点

- 资料少（起码中文资料很少）。
- 学习周期相对而言比较长。
- 不符合常规思维。
- 代码保密性差，一旦开发者把整个库克隆下来就可以完全公开所有代码和版本信息。

### 安装git

- linux上安装git

  - 如果你用Debian或Ubuntu Linux，通过一条`sudo apt-get install git`就可以直接完成Git的安装，非常简单。
  - Debian或Ubuntu Linux，要把命令改为`sudo apt-get install git-core`，因为以前有个软件也叫GIT（GNU Interactive Tools），结果Git就只能叫`git-core`了。由于Git名气实在太大，后来就把GNU Interactive Tools改成`gnuit`，`git-core`正式改为`git`。
  - 其他Linux版本，可以直接通过源码安装。先从Git官网下载源码，然后解压，依次输入：`./config`，`make`，`sudo make install`这几个命令安装就好了。
- mac os 安装
  - 一是安装homebrew，然后通过homebrew安装Git，具体方法请参考homebrew的文档：[http://brew.sh/](http://brew.sh/)。
  - 第二种方法更简单，也是推荐的方法，就是直接从AppStore安装Xcode，Xcode集成了Git，不过默认没有安装，你需要运行Xcode，选择菜单“Xcode”->“Preferences”，在弹出窗口中找到“Downloads”，选择“Command Line Tools”，点“Install”就可以完成安装了。
- win 安装git
  - 在Windows上使用Git，可以从Git官网直接[下载安装程序](https://git-scm.com/downloads)，（网速慢的同学请移步[国内镜像](https://pan.baidu.com/s/1kU5OCOB#list/path=%2Fpub%2Fgit)），然后按默认选项安装即可。
  - 安装完成后，在开始菜单里找到“Git”->“Git Bash”，蹦出一个类似命令行窗口的东西，就说明Git安装成功！

### git 全局配置

- `git config --global user.name "Your Name"`配置用户名
- `git config --global user.email "email@example.com"`配置email

## 创建版本库

> 什么是版本库呢？版本库又名仓库，英文名**repository**，你可以简单理解成一个目录，这个目录里面的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。

- 创建一个版本库非常简单，首先，选择一个合适的地方，创建一个空目录

  ```bash
  $ mkdir learngit
  $ cd learngit
  $ pwd
  /Users/michael/learngit
  ```

  


  > `pwd`命令用于显示当前目录。在我的Mac上，这个仓库位于`/Users/michael/learngit`。
  >
  >  如果你使用Windows系统，为了避免遇到各种莫名其妙的问题，请确保目录名（包括父目录）不包含中文。

- 通过`git init`命令把这个目录变成Git可以管理的仓库

  ```bash
  git init
  empty Git repository in /Users/michael/learngit/.git/
  
  ```
```
  
  + 瞬间Git就把仓库建好了，而且告诉你是一个空的仓库（empty Git repository），可以发现当前目录下多了一个`.git`的目录，这个目录是Git来跟踪管理版本库的，没事千万不要手动修改这个目录里面的文件，不然改乱了，就把Git仓库给破坏了。
  + 如果你没有看到`.git`目录，那是因为这个目录默认是隐藏的，用`ls -ah`命令就可以看见。

### 把文件添加到仓库

- 新增readme.text文件, 内容如下

```
  第一次添加文件到git
  ```

- 第一步，参加道缓存区

  ```bash
  $ git add readme.txt
  ```

- 第二步，用命令`git commit`告诉Git，把文件提交到仓库

  ```bash
  $ git commit -m "wrote a readme file"
  [master (root-commit) eaadf4e] wrote a readme file
   1 file changed, 2 insertions(+)
   create mode 100644 readme.txt
  ```

  - 简单解释一下`git commit`命令，`-m`后面输入的是本次提交的说明，可以输入任意内容，当然最好是有意义的，这样你就能从历史记录里方便地找到改动记录。
  - 嫌麻烦不想输入`-m "xxx"`行不行？确实有办法可以这么干，但是强烈不建议你这么干，因为输入说明对自己对别人阅读都很重要。实在不想输入说明的童鞋请自行Google，我不告诉你这个参数。
  - `git commit`命令执行成功后会告诉你，`1 file changed`：1个文件被改动（我们新添加的readme.txt文件）；`2 insertions`：插入了两行内容（readme.txt有两行内容）。

## 版本操作

- 修改readme.text文件

  ```
  第一次添加文件到git
  第二次修改git文件
  ```

- 运行`git status`命令看看结果

  ```bash
  $ git status
  On branch master
  Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git checkout -- <file>..." to discard changes in working directory)
  
  	modified:   readme.txt
  
  no changes added to commit (use "git add" and/or "git commit -a")
  
  # git status命令可以让我们时刻掌握仓库当前的状态，上面的命令输出告诉我们，readme.txt被修改过了，但还没有准备提交的修改。
  ```

- 查看两次文件修改

  - 虽然Git告诉我们`readme.txt`被修改了，但如果能看看具体修改了什么内容，自然是很好的。比如你休假两周从国外回来，第一天上班时，已经记不清上次怎么修改的`readme.txt`，所以，需要用`git diff`这个命令看看

  ```bash
  $ git diff readme.txt 
  diff --git a/readme.txt b/readme.txt
  index 46d49bf..9247db6 100644
  --- a/readme.txt
  +++ b/readme.txt
  @@ -1,2 +1,2 @@
  -Git is a version control system.
  +Git is a distributed version control system.
   Git is free software.
   
  ```

  + `git diff`顾名思义就是查看difference，显示的格式正是Unix通用的diff格式，可以从上面的命令输出看到，我们在第一行添加了一个`distributed`单词。

- 版本回退

  - 查看修改历史

  ```bash
  git log
  
  commit bb05abd2aa9095104d1e4d4c60e6c04c7444c833 (HEAD -> master)
  Author: corner1990 <804160646@qq.com>
  Date:   Sat Jun 8 11:52:42 2019 +0800
  
      第三次提交
  
  commit 18c6b8cf4848b4fd9b68b7441f84f9725c0ef58e
  Author: corner1990 <804160646@qq.com>
  Date:   Sat Jun 8 11:49:48 2019 +0800
  
      第二次提交代码
  
  commit df1b88ff4178515b5d9b13ce21c18a33b6728dee
  Author: corner1990 <804160646@qq.com>
  Date:   Sat Jun 8 11:46:38 2019 +0800
  
      第一次提交
      
  #  git log --pretty=oneline 减少log输出
  ```

  - 把`readme.txt`回退到上一个版本，也就是`add distributed`的那个版本

    ```bash
    git reset --hard HEAD^
    ```

  - 查看现在的版本

    ```bash
    git log
    
    commit 18c6b8cf4848b4fd9b68b7441f84f9725c0ef58e (HEAD -> master)
    Author: corner1990 <804160646@qq.com>
    Date:   Sat Jun 8 11:49:48 2019 +0800
    
        第二次提交代码
    
    commit df1b88ff4178515b5d9b13ce21c18a33b6728dee
    Author: corner1990 <804160646@qq.com>
    Date:   Sat Jun 8 11:46:38 2019 +0800
    
        第一次提交
        
    # 这里可以发现我们的版本已经回退到了上一个版本
    ```

  - 查看readme.txt文件内容

    ```
    第一次添加文件道git
    第二次修改git文件
    ```

  - —hard 传递参数

    > 最新的那个版本`append GPL`已经看不到了！想再回去已经回不去了，肿么办？
    >
    > 办法其实还是有的，只要上面的命令行窗口还没有被关掉，你就可以顺着往上找啊找啊，找到那个`append GPL`的`commit id`是`1094adb...`，于是就可以指定回到未来的某个版本：

    ```bash
    git reset --hard bb05ab
    
    # 现在使用git log 查看，已经回退回来了
    ```

- 工作区和暂存区

  > Git和其他版本控制系统如SVN的一个不同之处就是有暂存区的概念。

  - `工作区（Working Directory）`: 就是你在电脑里能看到的目录，比如我的`learngit`文件夹就是一个工作区
  - `版本库（Repository）`: 工作区有一个隐藏目录`.git`，这个不算工作区，而是Git的版本库。
  - Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支`master`，以及指向`master`的一个指针叫`HEAD`。

  - 分支和`HEAD`的概念我们以后再讲。

  - 前面讲了我们把文件往Git版本库里添加的时候，是分两步执行的：

    第一步是用`git add`把文件添加进去，实际上就是把文件修改添加到暂存区；

    第二步是用`git commit`提交更改，实际上就是把暂存区的所有内容提交到当前分支。

    因为我们创建Git版本库时，Git自动为我们创建了唯一一个`master`分支，所以，现在，`git commit`就是往`master`分支上提交更改。

    你可以简单理解为，需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。

    俗话说，实践出真知。现在，我们再练习一遍，先对`readme.txt`做个修改，比如加上一行内容：

    ```
    第一次添加文件道git
    第二次修改git文件
    第三次修改git文件
    ```

  - 然后，在工作区新增一个`LICENSE`文本文件（内容随便写）。

  - `git status`: 查看状态

    ```bash
    git status
    On branch master
    Changes not staged for commit:
      (use "git add <file>..." to update what will be committed)
      (use "git checkout -- <file>..." to discard changes in working directory)
    
    	modified:   readme.txt
    
    Untracked files:
      (use "git add <file>..." to include in what will be committed)
    
    	license.txt
    
    no changes added to commit (use "git add" and/or "git commit -a")
    
    # Git非常清楚地告诉我们，readme.txt被修改了，而license还从来没有被添加过，所以它的状态是Untracked。
    ```

  - 使用两次命令`git add`，把`readme.txt`和`LICENSE`都添加后，用`git status`再查看一下：

    ```bash
    git add readme.txt
    git add license.txt
    
    # 然后输入 git status 查看状态 发现输入如下
    git status
    On branch master
    Changes to be committed:
      (use "git reset HEAD <file>..." to unstage)
    
    	new file:   license.txt
    	modified:   readme.txt
    	
    # 所以，git add命令实际上就是把要提交的所有修改放到暂存区（Stage），然后，执行git commit就可以一次性把暂存区的所有修改提交到分支。
    # 一旦提交，状态就会干净， 使用git status查看
    
    git status
    On branch master
    nothing to commit, working tree clean
    ```

​    

- 管理修改

  - 已经完全掌握了暂存区的概念。下面，我们要讨论的就是，为什么Git比其他版本控制系统设计得优秀，因为Git跟踪并管理的是修改，而非文件。
  - 你会问，什么是修改？比如你新增了一行，这就是一个修改，删除了一行，也是一个修改，更改了某些字符，也是一个修改，删了一些又加了一些，也是一个修改，甚至创建一个新文件，也算一个修改。

  ```bash
  # 为什么说Git管理的是修改，而不是文件呢？我们还是做实验。第一步，对readme.txt做一个修改，比如加一行内容
  # 当前文件修改后
  第一次添加文件道git
  第二次修改git文件
  第三次修改git文件
  第四次修改
  随便添加一点什么
  
  # 使用git add 提交文件
  # 在到修改readme.txt文件
  第一次添加文件道git
  第二次修改git文件
  第三次修改git文件
  第四次修改
  随便添加一点什么
  我又随便添加了一点东西
  
  # 然后提交 git commit -m 第二次修改后提交
  # 到此过程： 第一次修改 -> git add -> 第二次修改 -> git commit
  # 提交后，用git diff HEAD -- readme.txt命令可以查看工作区和版本库里面最新版本的区别
  git diff HEAD -- readme.txt
  diff --git a/readme.txt b/readme.txt
  index 5e485d5..e59ad72 100644
  --- a/readme.txt
  +++ b/readme.txt
  @@ -3,3 +3,4 @@
   第三次修改git文件
   第四次修改
   随便添加一点什么
  +我又随便添加了一点东西
  
  # 那怎么提交第二次修改呢？你可以继续git add再git commit，也可以别着急提交第一次修改，先git add第二次修改，再git commit，就相当于把两次修改合并后一块提交了：
  # 第一次修改 -> git add -> 第二次修改 -> git add -> git commit
  
  
  
  
  ```

  

  

## 撤销修改

  - 当某些时候我们提交错了东西，但是已经提交了，那我们是需要撤销修改的，不能这样子提交

```bash
# 1.在readme.txt 里随便添加一点东西
第一次添加文件道git
第二次修改git文件
第三次修改git文件
第四次修改
随便添加一点什么
我又随便添加了一点东西
这是一个错误的示范

# 2.git statu 查看状态
git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")

# 3. 使用 git checkout readme.txt 放弃修改
# 查看readme.txt 文件
第一次添加文件道git
第二次修改git文件
第三次修改git文件
第四次修改
随便添加一点什么

# 命令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况
	# 一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
	# 一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
	#	总之，就是让这个文件回到最近一次git commit或git add时的状态
	# git checkout -- file命令中的--很重要，没有--，就变成了“切换到另一个分支”的命令，我们在后面的分支管理中会再次遇到git checkout命令
	
# 文件提交到暂存区后的撤销
# 4. 修改文件如下
第一次添加文件道git
第二次修改git文件
第三次修改git文
第四次修改
随便添加一点什么
我又开始乱来，哈哈哈
# 5. git add . 添加到暂存区
# 6. git status 查看， 可以看到readme.txt还没有被提交到工作区
git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   readme.txt

# Git同样告诉我们，用命令git reset HEAD <file>可以把暂存区的修改撤销掉（unstage），重新放回工作区
# 7. git reset HEAD readme.txt
# 8. 使用 git status 查看文件，发现文件已经从暂存区撤销了
# 9. 使用 git checkout -- readme.txt 将文件恢复到上一个版本
# 10. 查看最新状态
git status
On branch master
nothing to commit, working tree clean


```

### 删除文件

- 新增test.txt文件

  ```bash
  # 1. 添加文件 git add test.txt
  $ git status
  On branch master
  Changes to be committed:
    (use "git reset HEAD <file>..." to unstage)
  
  	new file:   test.txt
  	
  # 2. 删除text.txt文件
  # rm test.txt
  git status
  On branch master
  Changes to be committed:
    (use "git reset HEAD <file>..." to unstage)
  
  	new file:   test.txt
  
  Changes not staged for commit:
    (use "git add/rm <file>..." to update what will be committed)
    (use "git checkout -- <file>..." to discard changes in working directory)
  
  	deleted:    test.txt
  	
  # 有两个选择，一是确实要从版本库中删除该文件，那就用命令git rm删掉，并且git commit
  # a. git删除文件： git rm test.txt
  # b. 提交修改 git commit -m 删除test.txt文件
  
  # 另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版
  $ git checkout -- test.txt
  ```

  

## 远程仓库

### 添加远程仓库

> 已经在本地创建了一个Git仓库后，又想在GitHub创建一个Git仓库，并且让这两个仓库进行远程同步，这样，GitHub上的仓库既可以作为备份，又可以让其他人通过该仓库来协作，真是一举多得。

- 登陆GitHub，然后，在右上角找到“Create a new repo”按钮，创建一个新的仓库

- 在Repository name填入`learngit`，其他保持默认设置，点击“Create repository”按钮，就成功地创建了一个新的Git仓库：

- 目前，在GitHub上的这个`learngit`仓库还是空的，GitHub告诉我们，可以从这个仓库克隆出新的仓库，也可以把一个已有的本地仓库与之关联，然后，把本地仓库的内容推送到GitHub仓库。

```bash
  # 创建新仓库
  …or create a new repository on the command line
  echo "# help" >> README.md
  git init
  git add README.md
  git commit -m "first commit"
  git remote add origin https://github.com/corner1990/help.git
  git push -u origin master
  
  # 克隆到本地
  …or push an existing repository from the command line
  git remote add origin https://github.com/corner1990/help.git
  git push -u origin master
  
  # 从别的仓库合并代码过来
  …or import code from another repository
  You can initialize this repository with code from a Subversion, Mercurial, or TFS project.
```


- 我们根据GitHub的提示，在本地的`learngit`仓库下运行命令

	```bash
  git remote add origin https://github.com/corner1990/help.git
  ```

- 将本地文件推送到远程仓库

  > 本地库的内容推送到远程，用`git push`命令，实际上是把当前分支`master`推送到远程

  ```bash
  # 推送后会有如下信息
  git push -u origin master
  Counting objects: 16, done.
  Delta compression using up to 8 threads.
  Compressing objects: 100% (11/11), done.
  Writing objects: 100% (16/16), 1.33 KiB | 1.33 MiB/s, done.
  Total 16 (delta 3), reused 0 (delta 0)
  remote: Resolving deltas: 100% (3/3), done.
  To https://github.com/corner1990/help.git
   * [new branch]      master -> master
  Branch master set up to track remote branch master from origin.
  
  
  # 由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。
  # 推送成功后，可以立刻在GitHub页面中看到远程库的内容已经和本地一模一样
  ```

- SSH警告

  - 当你第一次使用Git的`clone`或者`push`命令连接GitHub时，会得到一个警告

  ```bash
  The authenticity of host 'github.com (xx.xx.xx.xx)' can't be established.
  RSA key fingerprint is xx.xx.xx.xx.xx.
  Are you sure you want to continue connecting (yes/no)?
  
  # 这是因为Git使用SSH连接，而SSH连接在第一次验证GitHub服务器的Key时，需要你确认GitHub的Key的指纹信息是否真的来自GitHub的服务器，输入yes回车即可。
  # Git会输出一个警告，告诉你已经把GitHub的Key添加到本机的一个信任列表里了
  Warning: Permanently added 'github.com' (RSA) to the list of known hosts.
  
  # 这个警告只会出现一次，后面的操作就不会有任何警告了。
  # 如果你实在担心有人冒充GitHub服务器，输入yes前可以对照GitHub的RSA Key的指纹信息是否与SSH连接给出的一致
  ```

### 远程克隆仓库

- 讲了先有本地库，后有远程库的时候，如何关联远程库。

  + 现在，假设我们从零开发，那么最好的方式是先创建远程库，然后，从远程库克隆。

  + 首先，登陆GitHub，创建一个新的仓库，名字叫`hello`
  + 我们勾选`Initialize this repository with a README`，这样GitHub会自动为我们创建一个`README.md`文件。创建完毕后，可以看到`README.md`文件
  + 远程库已经准备好了，下一步是用命令`git clone`克隆一个本地库

  ```bash
  $ git clone xxx
  Cloning into 'gitskills'...
  remote: Counting objects: 3, done.
  remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 3
  Receiving objects: 100% (3/3), done.
  ```

  - 注意把Git库的地址换成你自己的，然后进入`hello`目录看看，已经有`README.md`文件了

  ```bash
  $ cd hello
  $ ls
  README.md
  
  # 从远程克隆仓库到本地时，会将远程仓库的仓库吗作为这个仓库的目录顶部目录名
  # 如果有多个人协作开发，那么每个人各自从远程克隆一份就可以了。
  
  # 你也许还注意到，GitHub给出的地址不止一个，实际上，Git支持多种协议，默认的git://使用ssh，但也可以使用https等其他协议。
  
  # 使用https除了速度慢以外，还有个最大的麻烦是每次推送都必须输入口令，但是在某些只开放http端口的公司内部就无法使用ssh协议而只能用https。
  ```





## 分支管理

### 分支

> 分支其实就是从某个提交对象往回看的历史
>
> 我们每次新增，修改，删除等操作，一直到最后提交，包括查看修改历史，都会通过这个指针

### 创建与合并分支

> 已经知道，每次提交，Git都把它们串成一条时间线，这条时间线就是一个分支。截止到目前，只有一条时间线，在Git里，这个分支叫主分支，即`master`分支。`HEAD`严格来说不是指向提交，而是指向`master`，`master`才是指向提交的，所以，`HEAD`指向的就是当前分支。

- 一开始的时候，`master`分支是一条线，Git用`master`指向最新的提交，再用`HEAD`指向`master`，就能确定当前分支，以及当前分支的提交点. 每次提交，`master`分支都会向前移动一步，这样，随着你不断提交，`master`分支的线也越来越长
- 当我们创建新的分支，例如`dev`时，Git新建了一个指针叫`dev`，指向`master`相同的提交，再把`HEAD`指向`dev`，就表示当前分支在`dev`上. Git创建一个分支很快，因为除了增加一个`dev`指针，改改`HEAD`的指向，工作区的文件都没有任何变化！
- 从现在开始，对工作区的修改和提交就是针对`dev`分支了，比如新提交一次后，`dev`指针往前移动一步，而`master`指针不变
- 在`dev`上的工作完成了，就可以把`dev`合并到`master`上。Git怎么合并呢？最简单的方法，就是直接把`master`指向`dev`的当前提交，就完成了合并
- 合并完分支后，甚至可以删除`dev`分支。删除`dev`分支就是把`dev`指针给删掉，删掉后，我们就剩下了一条`master`分支

### 创建分支

- 我们创建`dev`分支，然后切换到`dev`分支

```bash
$ git checkout -b dev
Switched to a new branch 'dev'

# git checkout命令加上-b参数表示创建并切换，相当于以下两条命令
	# $ git branch dev
	# $ git checkout dev
```

- 查看当前分支： `git branch`

```bash
$ git branch
* dev
  master
  
# git branch命令会列出所有分支，当前分支前面会标一个*号

# 接下来的修改都会在 dev分支上 
# 1. 比如对readme.txt做个修改： 新增 dev 分支操作
# 2. 然后提交。 git add readmet.txt, git commit -m 'dev分支第一次修改'
```

- 切换分支： `git checkout 分支名称`

```bash
$ git checkout master
Switched to branch 'master'
Your branch is up-to-date with 'origin/master'.

# 1. 查看当前分支，会发现readme.txt并没有修改
```

- 合并dev分支的修改到当前分支: `git merge 分支名称`

```bash
git merge dev
Updating b45d754..f38807b
Fast-forward
 readme.txt | 1 +
 1 file changed, 1 insertion(+)
 
# git merge命令用于合并指定分支到当前分支。合并后，再查看readme.txt的内容，就可以看到，和dev分支的最新提交是完全一样的。
# 注意到上面的Fast-forward信息，Git告诉我们，这次合并是“快进模式”，也就是直接把master指向dev的当前提交，所以合并速度非常快。
# 合并完成以后就可以删除之前的分支了
```

- 删除分支: `git branch -d 分支名称`

```bash
# 1. 删除dev 分支
$ git branch -d dev
Deleted branch dev (was f38807b).

# 2. 查看分支，发现dev分支已经被删除
git branch
* master
```

- 分支操作命令集锦

```basic
查看分支：git branch

创建分支：git branch <name>

切换分支：git checkout <name>

创建+切换分支：git checkout -b <name>

合并某分支到当前分支：git merge <name>

删除分支：git branch -d <name>
```



### 解决冲突

> 凡是多人操作，肯定就会有各种不一样，这个时候我们操作的时候就会出现冲突，出现后就需要解决

- 准备新的`dev1`分支，继续我们的新分支开发
- 修改`readme.txt`；

```basic
 第四次修改
 随便添加一点什么
 dev 分支上操作
+学习解决冲突`
```

- 在`dev1`分支上提交

```bash
$  git add readme.txt
$  git commit -m 学习解决冲突之模拟冲突
[dev1 3b048c1] 学习解决冲突之模拟冲突
 1 file changed, 1 insertion(+)
```

- 切换到`master`分支

```bash
$   git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)
```

- 修改`readme.txt`

```basic
第四次修改
 随便添加一点什么
 dev 分支上操作
+master 分支上修改，模拟发生冲突

# 到了这里，我们分别在dev1分支上和master分支上做了修改，在当我们合并两个分支的时候就会有冲突
```

- 合并修改后的两个分支

```bash
$ git merge dev1
Auto-merging readme.txt
CONFLICT (content): Merge conflict in readme.txt
Automatic merge failed; fix conflicts and then commit the result.

# 果然冲突了！Git告诉我们，readme.txt文件存在冲突，必须手动解决冲突后再提交。git status也可以告诉我们冲突的文件
# 查看当前状态： git status
$ git status
On branch master
Your branch is ahead of 'origin/master' by 2 commits.
  (use "git push" to publish your local commits)

You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)

	both modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")

# 查看readme.txt内容
第一次添加文件道git
第二次修改git文件
第三次修改git文件
第四次修改
随便添加一点什么
dev 分支上操作
<<<<<<< HEAD
master 分支上修改，模拟发生冲突
=======
学习解决冲突`
>>>>>>> dev1

# Git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容，我们修改如下后保存
第一次添加文件道git
第二次修改git文件
第三次修改git文件
第四次修改
随便添加一点什么
dev 分支上操作
master 分支上修改，模拟发生冲突
学习解决冲突

$ git add readme.txt
$ git commit -m 解决冲突
[master c337048] 解决冲突

```

- 结局冲突后查看合并: `git log --graph`

```visual basic
*   commit c337048d4df2d489b8a93b7556c35e21b9f6cdbf (HEAD -> master)
|\  Merge: 7a2091c 3b048c1
| | Author: corner1990 <804160646@qq.com>
| | Date:   Sat Jun 8 14:06:06 2019 +0800
| |
| |     解决冲突’
| |
| * commit 3b048c138dcebcc133701bde7359e836fd454d32 (dev1)
| | Author: corner1990 <804160646@qq.com>
| | Date:   Sat Jun 8 13:55:17 2019 +0800
| |
| |     学习解决冲突之模拟冲突
| |
* | commit 7a2091c124a12fe3d3196fad05cbf6fd3e2b788e
|/  Author: corner1990 <804160646@qq.com>
|   Date:   Sat Jun 8 14:03:19 2019 +0800
|
|       修改后提交
|
* commit f38807bae55d1d8d17677b6e609ff380d551fd44
| Author: corner1990 <804160646@qq.com>
| Date:   Sat Jun 8 13:42:12 2019 +0800
|
|     dev分支第一次修改
```



### 分支管理策略

> 合并分支时，如果可能，Git会用`Fast forward`模式，但这种模式下，删除分支后，会丢掉分支信息。
>
> 如果要强制禁用`Fast forward`模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息

- 新建dev2分支

```bash
$ git checkout -b dev2
Switched to a new branch 'dev2'

# 1. 修改readme.txt文件，并提交一个新的commit
dev 分支上操作
 master 分支上修改，模拟发生冲突
 学习解决冲突
+学习fast forward

# 2. 提交修改
# 切换到master分支
$ git checkout master
Switched to branch 'master'

# 准备合并dev2分支，请注意--no-ff参数，表示禁用Fast forward
$ git merge --no-ff  -m "从dev2分支合并代码过来" dev2
Merge made by the 'recursive' strategy.
 readme.txt | 1 +
 1 file changed, 1 insertion(+)
 

```

- 查看合并后的log

```basic
$  git log --graph

*   commit f36829d2a25c13ee3b014e4f21756ca9ba9dfd79 (HEAD -> master)
|\  Merge: c337048 2fcd2f1
| | Author: corner1990 <804160646@qq.com>
| | Date:   Sat Jun 8 14:15:28 2019 +0800
| |
| |     从dev2分支合并代码过来
| |
| * commit 2fcd2f1489e64d2ed212a624d114489a541e4241 (dev2)
|/  Author: corner1990 <804160646@qq.com>
|   Date:   Sat Jun 8 14:13:10 2019 +0800
|
|       学习
|
*   commit c337048d4df2d489b8a93b7556c35e21b9f6cdbf
|\  Merge: 7a2091c 3b048c1
| | Author: corner1990 <804160646@qq.com>
| | Date:   Sat Jun 8 14:06:06 2019 +0800
| |
| |     解决冲突’
| |
| * commit 3b048c138dcebcc133701bde7359e836fd454d32 (dev1)
| | Author: corner1990 <804160646@qq.com>
| | Date:   Sat Jun 8 13:55:17 2019 +0800
| |
```

- 分支管理原则
  - `master`分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活
  - 干活都在`dev`分支上，也就是说，`dev`分支是不稳定的，到某个时候，比如1.0版本发布时，再把`dev`分支合并到`master`上，在`master`分支发布1.0版本；
  - 你和你的小伙伴们每个人都在`dev`分支上干活，每个人都有自己的分支，时不时地往`dev`分支上合并就可以了。



### BUG分支

> 在工作中，bug就像家常便饭一样。有了bug就需要修复，在Git中，由于分支是如此的强大，所以，每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。

- 当你接到一个修复一个代号10的bug的任务时，很自然地，你想创建一个分支`issue-10`来修复它，但是，等等，当前正在`dev`上进行的工作还没有提交
- 修改readme.txt, 模拟工作还没有弄完

```basic
master 分支上修改，模拟发生冲突
 学习解决冲突
 学习fast forward
+处理到一半，临时保存
```

- 查看当前分支状态

```bash
$ git status
On branch master
Your branch is ahead of 'origin/master' by 6 commits.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

- 使用 `git stash`临时存储代码，并不会提交到缓存区

```bash
$ git stash
Saved working directory and index state WIP on master: f36829d 从dev2分支合并代码过来

# 然后使用 git status 查看分支，发现分支已经没有修改了
# 1. 首先确定要在哪个分支上修复bug，假定需要在master分支上修复，就从master创建临时分支
$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 6 commits.
  (use "git push" to publish your local commits)

$ git checkout -b issue-10
Switched to a new branch 'issue-10'

# 2. 现在修复bug，需要把“hello ”改为“hello world”，然后提交
$ git add readme.txt 
$ git commit -m "fix bug 10"
[issue-101 4c805e2] fix bug 10
 1 file changed, 1 insertion(+), 1 deletion(-)
 
 # 3. 修复完成后，切换到master分支，并完成合并，最后删除issue-10分支
 $ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 6 commits.
  (use "git push" to publish your local commits)

$ git merge --no-ff -m "merged bug fix 10" issue-10
Merge made by the 'recursive' strategy.
 readme.txt | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
 
# 4. 接着回到dev分支干活了, 工作区是干净的，刚才的工作现场存到哪去了？用git stash list命令看看
$ git stash list
stash@{0}: WIP on master: f36829d 从dev2分支合并代码过来

# 5. 工作现场还在，Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法
	# 一是用git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除；
	# 另一种方式是用git stash pop，恢复的同时把stash内容也删了
	
$ git stash pop
On branch master
Your branch is ahead of 'origin/master' by 6 commits.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (dd5fd8ee741317497decfac02502e0808461a6a5)


# 可以多次stash，恢复的时候，先用git stash list查看，然后恢复指定的stash，用命令：
$ git stash apply stash@{0}
```

### Feature分支

> 总有无穷无尽的新的功能要不断添加进来
>
> 添加一个新功能时，你肯定不希望因为一些实验性质的代码，把主分支搞乱了，所以，每添加一个新功能，最好新建一个feature分支，在上面开发，完成后，合并，最后，删除该feature分支。

- 准备开发

```bash
$ git checkout -b feature-dev
Switched to a new branch 'feature-dev'

# 1. 新建一个feature-dev.txt 文本文件
# 2. 在新建的文件内随便写点东西
# 3. 提交修改
# 4. 切换回dev分支准备合并代码
$   git checkout dev

# 5. 当我们忽然不想要这个分支上的代码，然后强行删除分支
$ git branch -d feature-dev
error: The branch 'feature-dev' is not fully merged.
If you are sure you want to delete it, run 'git branch -D feature-dev'.

# 提示我么没有合并分支，删除后无法恢复，并且需要使用 `git branch -D feature-dev` 强行删除
# 6. 强行删除分支
$ git branch -D feature-dev
Deleted branch feature-dev (was 83464a5).

```



### 多人协作开发

- 当你从远程仓库克隆时，实际上Git自动把本地的`master`分支和远程的`master`分支对应起来了，并且，远程仓库的默认名称是`origin`
- 查看远程仓库信息, 要查看远程库的信息，用`git remote`

```bash
$ git remote
origin

# 用git remote -v显示更详细的信息
$ git remote -v
origin	https://github.com/xxx/xx.git (fetch)
origin	https://github.com/xxx/xx.git (push)
```

- 推送分支

```bash
# 推送更新到master分支上
$ git push origin master

# 推送更新到dev分支上
$ git push origin dev

# 并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？

	# master分支是主分支，因此要时刻与远程同步；
	# dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
	# bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；
	# feature-dev分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。
	
```

- 抓取分支
  - 在远程仓库创新新分支
  - 使用`git fetch `获取最新状态
  - 切换到需要开发的分支上，然后操作同上

```bash
# 1. 远程创建分支， 创建test分支
# 2. 本地拉去远程分支 git fetch
$ git fetch
From https://github.com/corner1990/help
 * [new branch]      test       -> origin/test
 
# 3. 完成开发， 提交修改
# 4. git pull 拉去当前分支最新状态
# 5. 没有冲突，直接 git push 更新远程仓库代码
# 6. 有冲突，解决冲突后重新提交代码

# 查看远程库信息，使用git remote -v；
# 本地新建的分支如果不推送到远程，对其他人就是不可见的；
# 从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；
# 在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；
# 建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；
# 从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。

```

### Reabse

- 常规提交

```basic
$ git log --graph --pretty=oneline --abbrev-commit
* 53aa3c6 (HEAD -> master, origin/test, origin/master, dev) 替吉奥
*   f36829d 从dev2分支合并代码过来
|\
| * 2fcd2f1 (dev2) 学习
|/
*   c337048 解决冲突’
|\
| * 3b048c1 (dev1) 学习解决冲突之模拟冲突
* | 7a2091c 修改后提交
|/
* f38807b dev分支第一次修改
* b45d754 测试提交
* 36c18a3 第四次提交
* bb05abd 第三次提交
* 18c6b8c 第二次提交代码
* df1b88f 第一次提交

# 这样子看起来很乱，有时候我们回希望这是一条直线， 使用 rebase 实现
```

- 模拟实现

```basic
# 在和远程分支同步后，我们对readme.txt这个文件做了两次提交。用git log命令看

$ git log --graph --pretty=oneline --abbrev-commit
* 52b2336 (HEAD -> master) readme2
* b40b673 readme1
* 53aa3c6 (origin/test, origin/master, dev) 替吉奥
*   f36829d 从dev2分支合并代码过来
|\
| * 2fcd2f1 (dev2) 学习
|/
*   c337048 解决冲突’
|\
| * 3b048c1 (dev1) 学习解决冲突之模拟冲突
* | 7a2091c 修改后提交
|/
* f38807b dev分支第一次修改
* b45d754 测试提交
* 36c18a3 第四次提交
* bb05abd 第三次提交
* 18c6b8c 第二次提交代码
* df1b88f 第一次提交

```

- 远端修改文件
- 推送更新

```bash
git push
To https://github.com/corner1990/help.git
 ! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'https://github.com/corner1990/help.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

# 提示本地不是最新代码
```

- 获取最新代码

```bash
# 获取最新版本
$ git pull
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 1), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
From https://github.com/corner1990/help
   52b2336..858d8eb  master     -> origin/master
Auto-merging readme.txt
CONFLICT (content): Merge conflict in readme.txt
Automatic merge failed; fix conflicts and then commit the result.

# 查看状态
$ git status
On branch master
Your branch and 'origin/master' have diverged,
and have 1 and 1 different commits each, respectively.
  (use "git pull" to merge the remote branch into yours)

You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)

	both modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")

```





## 自定义git

### 忽略特殊文件

- 新建`.gitignore` [gitignore配置](https://github.com/github/gitignore)

- 忽略文件的原则是：

1. 忽略操作系统自动生成的文件，比如缩略图等；

2. 忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库；

3. 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。

4. 全局
    通过修改全局配置 git config 中的 excludesfile 指定全局忽略文件。设置方法：
   $ git config --global core.excludesfile ~/.gitignore
       修改 ~/.gitignore 这个文件将作用于所有 git 项目，并且作用于项目实例中的所有被跟踪的目录。比如说我们可以在该文件中添加 *.o 来忽略所有 .o 文件。

5. 局部
   忽略文件默认为当前目录的 .gitignore ，但它只作用于当前目录下。上面说到，在全局的 .gitignore 文件中添加 *.o 会忽略所有目录下产生的 .o 文件，但在当前目录下的 .gitignore 中添加 *.o 却只能忽略当前目录下的 .o 文件。
   <二>、语法
   .gitignore 的语法规范如下：

   ·所有空行或者以注释符号 ＃ 开头的行都会被 Git 忽略；
      ·可以使用标准的 glob 模式匹配。 * 匹配模式最后跟反斜杠（/）说明要忽略的是目录。 * 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。

      glob 模式匹配：
      ·星号（*）匹配零个或多个任意字符；
      ·[abc] 匹配任何一个列在方括号中的字符（这个例子要么匹配一个 a，要么匹配一个 b，要么匹配一个 c）；
      ·问号（?）只匹配一个任意字符；
      ·[0-9a-zA-Z] 在方括号中使用短划线分隔两个字符，表示所有在这两个字符范围内的都可以匹配（比如 [0-9a-zA-Z] 表示匹配所有 0 到 9 的数字和所有字母）；
      ·\ 转义字符。

```bash
# 注：理论上来说，在要忽略的格式文件后面添加注释是允许的，但经过我的验证，结果发现这样子操作并不能达到预期的效果。
# 忽略*.o和*.a文件
*.[oa]
# 忽略*.b和*.B文件，my.b除外
*.[bB]
!my.b
# 忽略dbg文件和dbg目录
dbg
# 只忽略dbg目录，不忽略dbg文件
dbg/
# 只忽略dbg文件，不忽略dbg目录
dbg
!dbg/
# 只忽略当前目录下的dbg文件和目录，子目录的dbg不在忽略范围内
/dbg
```






