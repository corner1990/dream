// 设计原则
// 扩展开放，修改封闭demo
// function parseJSON(response) {
//   return response.json();
// }

// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }

//   const error = new Error(response.statusText);
//   error.response = response;
//   throw error;
// }


// export default function request(url, options) {
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(data=>{data})
//     .catch(err => ({ err }));
// }

// 理氏替换原则
// class Person {

//   buy () {
//     console.log('买东西')
//   }
// }

// class Man extends Person {
//   constructor(gender, name) {
//     super()
//     this.gender = gender
//     this.name = name
//   }
//   buy () {
//     console.log('买游戏机')
//   }
// }

// class Women extends Person {
//   constructor(gender, name) {
//     super()
//     this.gender = gender
//     this.name = name
//   }
//   buy () {
//     console.log('买包包')
//   }
// }

// let p = new Person()
// let m = new Man('男人')
// let w = new Women('女人')
// // 子类可以覆盖父类
// p.buy()
// m.buy()
// w.buy()

// let leo = {
//   marry (p:Penson) {
//     console.log(`leo 和 ${p.name} 结婚了！`)
//   }
// }

// leo.marry(new Women('女'，'如花'))
// leo.marry(new Man('男'，'武大郎'))


// 接口隔离

interface Person {
  fristName: string,
  lastName: string
}

interface Fly{
  fly: boolean
}

function greeting (obj:Person) {
  console.log(`${obj.fristName}${obj.lastName} say hello`)
}

let p = {fristName: 'zhang', lastName: 'san'}
greeting(p)
