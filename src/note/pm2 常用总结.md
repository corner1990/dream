# pm2 常用总结

#### 安装

``` 
npm install -g pm2
```

#### 运行

```
pm2 start app.js
```

#### 查看运行状态

```
pm2 list
```

#### 追踪资源情况

```
pm2 monit
```

#### 查看应用部署状态

```
pm2 describle <程序ID>
//显示应用详细信息和运行状态
```

### 其他常用命令

```
//查看日志
pm2 logs
//重启应用
pm2 restart <appId>
//停止应用
pm2 stop app.js || all
//注：app.js  停止单个程序 all 停止所有程序
//强健的
```





