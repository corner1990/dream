## Echarts学习
	ECharts，一个纯 Javascript 的图表库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器
	（IE8/9/10/11，Chrome，Firefox，Safari等），	底层依赖轻量级的 Canvas 类库 ZRender，	提供直观，
	生动，可交互，可高度个性化定制的数据可视化图表
	
### 安装
- [从官网下载](http://echarts.baidu.com/)
- 页面引用  


```
//简单页面引用
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!-- 引入 ECharts 文件 -->
    <script src="echarts.min.js"></script>
</head>
</html>

//vue 项目引用
//安装
npm install echarts --save
//在页面引入 echarts
import echarts from 'echarts'
import Vue  from 'vue'

Vue.use(echarts)

//按需引入 。。。。

```

### 简单实例
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>ECharts</title>
    <!-- 引入 echarts.js -->
    <script src="echarts.min.js"></script>
</head>
<body>
    <!-- 为ECharts准备一个具备大小（宽高）的Dom元素 -->
    <div id="main" style="width: 600px;height:400px;"></div>
    <script type="text/javascript">
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
        	//图表标题
            title: {
                text: 'ECharts 入门示例'
            },
            //工具箱
            toolbox: {},
            tooltip: {},
            //图例
            legend: {
                data:['销量']
            },
            //x轴
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            //数据
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    </script>
</body>
</html>
```
### 常用配置
- `title` 标题组件

```
title:{
	show: true,
	text: '我是标题',
	subtext: '我是副标题',
	left: '我是位置 可以是像素 也可以是left,center,right',
	//right:''
	borderColor:'#dd0302',
	borderWidth: '1px',
	borderStyle:'solid',
	textStyle:{
		//这里是文字的配置项
	}
}
```

- `toolbox` 工具栏组件

```
toolbox:{
	//是否显示
	show: true,
	//具体显示功能
	featrue: {
		//保存图片
		saveAsImage:{
			show: true,
		},
		//配置项还原
		restore:{
			show: true,
		},
		//数据视图
		dataView:{
			show: true,
		},
		//缩放视图
		dataZoom:{
			show: true,
		},
		//动态类型切换
		magictype:{
			type:['line', 'bar']
		}
	},
}
```

- ‘tooltip’弹窗组件

```
tooltip:{
	//设置默认触发的时机是x轴或者某个item
	trigger: 'axis' | 'item'
}
```

- `markline`标记线和`markpoint`标记点

```
series:{
	//标记点
	markPoint:{
		data: [
			{type: 'max', name: '最大值'},
			{type: 'min', name: '最小值'}
		]
	},
	//标记线
	markLine:{
		data:[
			{type: 'average', name: '平均值'}
		]
	}
}
```

### 常用的其他图表
- 饼状图

```
//其他数据同上 区别在series里边

series: {
	name: '饼图',
	type: 'pie',
	radius: '50%',
	center: ['50%', '60%'],
	data: [
		{value: 350, name: '测试'},
		{value: 350, name: '测试'},
		{value: 350, name: '测试'},
		{value: 350, name: '测试'}		
	]
}
```

- 仪表盘

```
series: {
	name: '仪表盘',
	type: 'gauge',
	detail: {formatter: '{value}%'},
	data: [{value: 32, name: '完成率'}]
	
}
```