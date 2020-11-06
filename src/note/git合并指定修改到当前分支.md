# GIT 合并指定修改到当前分支

> 最近因为偷懒，没有重新拉建立分支，导致在发布测试的时候有问题，多个任务的代码揉到了一起，而我这次是希望发布部分代码. 所以就有了下边的命令

### `git cherry-pick`基本用法

```bash
`git cherry-pick` 的作用，就是 将指定的提交合并到其他分支

$ git cherry-pick <commit hash>
# 将指定的提交，合并到当前分支，并且会产生一个新的提交及记录<commit hash>

# 将提交 xxx 应用到 dev分支
$ git checkout dev
$ git cherry-pick xxx

```
### 转移多个提交
~~~bash
> 一次转移多个提交记录
```
$ git cherry-pick <hash a> <hash b>

# 按照提交记录区间合并代码. 必须按照正确的顺序放置：提交 hashA 必须早于提交 hashB，否则命令将失败，但不会报错。
$ git cherry-pick hashA..hashB

# 使用上面的命令，提交 hashA 将不会包含在 Cherry pick 中。如果要包含提交 A，可以使用下面的语法
$ git cherry-pick hashA^..hashB 
```
~~~
### 配置
```bash
`git cherry-pick`命令的常用配置项如下。

（1）-e，--edit

打开外部编辑器，编辑提交信息。

（2）-n，--no-commit

只更新工作区和暂存区，不产生新的提交。

（3）-x

在提交信息的末尾追加一行(cherry picked from commit ...)，方便以后查到这个提交是如何产生的。

（4）-s，--signoff

在提交信息的末尾追加一行操作者的签名，表示是谁进行了这个操作。

（5）-m parent-number，--mainline parent-number

如果原始提交是一个合并节点，来自于两个分支的合并，那么 Cherry pick 默认将失败，因为它不知道应该采用哪个分支的代码变动。

-m 配置项告诉 Git，应该采用哪个分支的变动。它的参数parent-number是一个从1开始的整数，代表原始提交的父分支编号。

$ git cherry-pick -m 1 <commitHash>

上面命令表示，Cherry pick 采用提交commitHash来自编号1的父分支的变动。

一般来说，1号父分支是接受变动的分支（the branch being merged into），2号父分支是作为变动来源的分支（the branch being merged from）


```

​	

### 代码冲突

如果操作过程中发生代码冲突，Cherry pick 会停下来，让用户决定如何继续操作。

```bash
# 1--continue
	# 用户解决代码冲突后，第一步将修改的文件重新加入暂存区（git add .），第二步使用下面的命令，让 Cherry pick 过程继续执行。

$ git cherry-pick --continue

# 2--abort
	#发生代码冲突后，放弃合并，回到操作前的样子。

# 3--quit
	#发生代码冲突后，退出 Cherry pick，但是不回到操作前的样子。
```

### 转移代码到另一个代码库

​	Cherry pick 也支持转移另一个代码库的提交，方法是先将该库加为远程仓库。

```bash
# 1. 添加一个远程仓库target
$ git remote add target git://gitUrl

# 2. 远程代码抓取到本地
$ git fetch target

# 3. 检查一下要从远程仓库转移的提交，获取它的哈希值
$ git log target/master

# 4. 使用git cherry-pick命令转移提交。
$ git cherry-pick <commitHash>

```

### 最后

> 且行且珍惜