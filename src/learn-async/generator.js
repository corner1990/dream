// generator 函数
function* gen() {
    const num1 = yield 1;
    console.log('num1', num1);

    const num2 = yield 2;
    console.log('num2', num2)

    return 3;
}

const g = gen();
console.log(g)

console.log(g.next())

console.log(g.next(111))

console.log(g.next(222))

