
// 完成基本结构
// function* gen() {}

// function generatorToAsync (generatorFn) {
//     return function () {
//         return new Promise((resolve, reject) => {

//         })
//     }
// }

// const asyncFn = generatorToAsync(gen);

// console.log(asyncFn()) // 返回一个状态值为pending的promise



// ### 加入操作
function fn(num) {
    return new Promise(res => {
        setTimeout(() => {
            res(num * 2)
        }, 1000)
    })
}

function* gen() {
    const num1 = yield fn(1);
    const num2 = yield fn(num1);
    const num3 = yield fn(num2);

    return num3;
}


function generatorToAsync(generatorFn) {
    return function() {
        return new Promise((resolve, reject) => {
            const g = generatorFn();

            const next1 = g.next();

            next1.value.then((res1) => {
                console.log('res1', res1);

                const next2 = g.next(res1);

                next2.value.then((res2) => {
                    console.log('res1', res2)

                    const next3 = g.next(res2);

                    next3.value.then((res3) => {
                        console.log('res3', res3);
                        resolve(g.next(res3).value)
                    })
                })
            })
        })
    }
}

// 模拟调用
// const asyncFn = generatorToAsync(gen);

// asyncFn().then(res => {
//     console.log('async res', res) // 3秒后输出 8
// })

// 下边调用结果同上
// async function asyncFn() {
//     const num1 = await fn(1)
//     const num2 = await fn(num1)
//     const num3 = await fn(num2)
//     return num3
// }

// asyncFn().then(res => console.log(res)) // 3秒后输出 8

