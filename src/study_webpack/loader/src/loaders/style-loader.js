// 创建一个style标签，并插入到页面
module.exports = function (source) {
    let script = (`
        let style = document.createElement("style");
        style.innerText = ${JSON.stringify(source)};
        document.head.appendChild(style)
    `)
    // console.log('JSON.stringify(source)', JSON.stringify(source))
    return script
}