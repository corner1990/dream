// 抽象工厂模式
// 是指多个抽象对象时，使用一种工厂模式
// 可以向客户端提供一个接口，是客户端再不必指定产品的具体情况下，创建国歌产品族中的产品

class Factory {
	createButton () {
		// 创建按钮
	}
	createIcon () {
		// 创建图标
	}
}

// icon 类
class Icon {}

class AppleIcon {
	render () {
		console.log('绘制 apple icon')
	}
}
class WindowIcon {
	render () {
		console.log('绘制 Windows icon')
	}
}

// 按钮类
class Button {}

class AppleButton {
	render () {
		console.log('绘制 apple 按钮')
	}
}
class WindowButton {
	render () {
		console.log('绘制 Windows 按钮')
	}
}

/*
简单工厂: 一般就是一个函数返回产品的实例
工厂方法： 多了工厂方法， 想要创建产品，需要先创建工厂的实例额，再通过次工厂来创建实例
抽象工厂： 一个工厂可以创建多个产品
 */

// window 工厂
class WindowFactory extends Factory {
	createButton () {
		return new WindowButton();
	}
	createIcon () {
		return new WindowIcon()
	}
}

// apple 工厂
class AppleFactory extends Factory {
	createButton () {
		return new AppleButton();
	}
	createIcon () {
		return new AppleIcon()
	}
}

// 调用

let winFactory = new WindowFactory()
let appleFactory = new AppleFactory()
// 画一个按钮
winFactory.createButton().render()
appleFactory.createButton().render()
// 画一个icon
winFactory.createIcon().render()
appleFactory.createIcon().render()
