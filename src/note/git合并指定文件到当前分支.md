> 前言，最近接到领导通知，说要将上一周完成的功能代码合并到另外一个分支上。然后我就切换目标分支，发现代码的提交记录已经滞后了很多，又不能将代码全部合并过来，就只能研究如何将部分代码合并过来。话不多说，撸起袖子加油干...

### 操作
```
git checkout 目标分支
git checkout --patch 文件所在分支 文件物理路径/文件名
```
- 然后会出现提示
>  Apply this hunk to index and worktree [y,n,q,a,d,/,K,j,J,g,e,?]

### 提示解析
- y - 存储这个hunk
- n - 不存储这个hunk
- q - 离开，不存储这个hunk和其他hunk
- a - 存储这个hunk和这个文件后面的hunk
- d - 不存储这个hunk和这个文件后面的hunk
- g - 选择一个hunk
- / - 通过正则查找hunk
- J - 不确定是否存储这个hunk，看下一个hunk
- k - 不确定是否存储这个hunk，看上一个不确定的hunk
- K -不确定是否存储这个hunk，看上一个hunk
- s - 把当前的hunk分成更小的hunks
- e - 手动编辑当前的hunk
- ? - 输出帮助信息

### 合并文件
> 对照上边的描述操作即可
### 加入当前分支没有该文件
1. 新建该文件
2. 使用命令`git checkout 分支 filename`讲文件拷贝到当前分支

### 结束语
> 需求驱动技术... never

