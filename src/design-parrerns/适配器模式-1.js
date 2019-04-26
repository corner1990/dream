// 适配器模式
class Power {
	charge () {
		return  '220w'
	}
}

class Adptor {
	constructor () {
		this.power = new Power()
	}
	charge () {
		let v = this.power.charge
		return `${v()} => 19.5v`
	}
}

class Notepad {
	constructor () {
		this.adptor = new Adptor
	}
	use () {
		console.log(this.adptor.charge())
	}
}

let client = new Notepad()
client.use()

// 应用场景
