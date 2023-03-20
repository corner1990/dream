
function fn(num) {
    return new Promise((resolve) => {
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

// 完成最终效果
function generatorToAsync(generatorFn) {
    return function() {
        const gen = generatorFn.apply(this, arguments);

        return new Promise((resolve, reject) => {
            function go(key, val) {
                let res;
                try {
                     // 这里有可能会执行返回reject状态的Promise
                    res = gen[key](val);
                }
                catch (err) {
                     // 报错的话会走catch，直接reject
                    return reject(err);
                }
                // 解构运行后的结果
                const { value, done } = res;

                if (done) {
                    // 执行完毕，直接返回结果
                    resolve(value)
                } else {
                    // 继续循环执行一直到执行结束
                    return Promise.resolve(value).then((value) => go('next', value), err => go('throw', err))
                }
            }

            go('next')
        })
    }
}


const asyncFn = generatorToAsync(gen);

asyncFn().then(res => 
    console.log('000', res))