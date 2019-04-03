// 简单工厂
class Plant {
	constructor (name) {
		this.name = name
	}
	grow () {
		console.log('我正在生长')
	}
}

class Apple extends Plant {
	constructor (name, flavour) {
		super(name)
		this.flavour = flavour
	}
}
class Orange extends Plant {
	constructor (name, flavour) {
		super(name)
		this.flavour = flavour
	}
}

// let app  = new Apple()

// 直接new有什么缺点
// 1. 耦合， 互相知道对方的存在
// 2. 依赖具体实现
// 简单工厂模式
// 隐藏实现，方便使用，减少耦合

class Factory {
	static create (type) {
		switch (type) {
		case 'apple':
			return new Apple('苹果', '甜的');
		case 'orange':
			return new Orange('桔子', '酸的')
		default:
			throw new Error('你要的类没有的哦，换个别的把。。。')
		}
	}
}

let apple = Factory.create('apple')
let orange = Factory.create('orange')
console.log(apple.flavour)
