// 虚拟对象类
export class Element {
    constructor (type, props, children) {
        this.type = type
        this.props = props
        this.children = children
    }
}
/**
 * 
 * @param {Element dom} node dom元素
 * @param {string} key 
 * @param {*} val 
 */
function setAttr(node, key, value) {
    switch(key) {
        case 'value':
        // node是一个input或者textarea的时候直接设置value
        if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
            node.value = value
        } else {
            node.setAttribute(key, value)
        }
        break;
        case 'style':
            node.style.cssText = value
        break;
        default:
            node.setAttribute(key, value)
        break;
    }
}
// render 可以将vnode转化成真是dom
export const render = (elObj) => {
    let el = document.createElement(elObj.type)
    for (let key in elObj.props) {
        // 设置属性的方法
        setAttr(el, key, elObj.props[key])
    }
    // 处理子元素，如果是虚拟dom，继续渲染，如果不是，继续徐然
    elObj.children.forEach(child => {
        child = (child instanceof Element) ? render(child) : document.createTextNode(child)
        // 添加子元素到当前元素
        el.appendChild(child)
    });
    return el;
}


export const renderDom = (el, target) => {
    target.appendChild(el)
}
// 创建虚拟dom
export const createElement = (type, props, children) => (new Element(type, props, children))