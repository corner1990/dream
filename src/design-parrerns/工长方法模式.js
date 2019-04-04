// 工厂方法模式
//  Factory Method， 又称多态性工厂模式, 给每个类设置一个工厂方法
// 在工厂方法模式中，核心的工厂类不在负责所有的产品创建，而是将具体的工作交给了子类去做
class Plant {
	constructor(name) {
		this.name = name;
	}
}

class Apple extends Plant {
	constructor(name, flavour) {
		super(name)
		this.flavour = flavour
	}
}

class Orange extends Plant {
	constructor(name, flavour) {
		super(name)
		this.flavour = flavour
	}
}

// 工厂一般是接口， 规定子类必须实现的方法
// 依赖抽象，而不依赖实现， 如果一个类要实现该接口，必须实现该接口中的所有方法
//
class Factory {
	create(name, flavout) {}
}

class AppleFactory extends Factory {
	static create(name, flavout) {
		return new Apple(name, flavout)
	}
}

class OrangeFactory extends Factory {
	static create(name, flavout) {
		return new Orange(name, flavout)
	}
}
// 默认调用
// let apple = AppleFactory.create('苹果', '甜的')
// let orange = OrangeFactory.create('桔子', '酸甜')


//  实现解耦合，使用一个配置对象
const settings = {
	apple: AppleFactory,
	orange: OrangeFactory
}


let apple = settings['apple'].create('苹果', '甜的')
let orange = settings['orange'].create('桔子', '酸甜')
console.log(apple)
console.log(orange)

// 再进一步解耦和
// 每个类保存为一个文件，然后动态导入
// let apple = require('./apple').create()
