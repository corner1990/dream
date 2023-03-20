
function fn(num) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(num * 2)
        }, 1000)
    })
}

function* gen() {
    const num1 = yield fn(1);
    const num2 = yield fn(num1);
    const num3 = yield fn(num2);
    return num3;
}

const g = gen();

const next1 = g.next()

next1.value.then((res1) => {
    console.log('next1', next1); // 一秒后输出 next1 { value: Promise { 2 }, done: false }
    console.log('res1', res1) // 一秒后顺序输出 res1 2

    const next2 = g.next(res1);
    next2.value.then((res2) => {
        console.log('next2', next2); // 2秒后输出 next2 { value: Promise { 4 }, done: false }
        console.log('res2', res2) // 2秒后顺序输出 res2 4


        const next3 = g.next(res2);
        next3.value.then((res3) => {
            console.log('next3', next3); // 3秒后输出 next3 { value: Promise { 8 }, done: false }
            console.log('res3', res3) // 3秒后顺序输出 res3 8
    
            
        })

        
    })

    
    
})