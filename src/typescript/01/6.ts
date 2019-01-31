// void 类型

function greeting (name:string = 'leo'):void {
    console.log(`hello ${name}`)
}

greeting('leo')

let xx:never;
xx = (() => {throw new Error('worng')})()