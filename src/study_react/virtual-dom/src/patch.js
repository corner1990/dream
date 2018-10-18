import { render, Element, setAttr } from './element'
let allPatchs;
let index = 0;
const ATTRS = 'ATTRS'
const TEXT = 'TEXT'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'

function patch (node, patchs) {
    // 给某个元素打补丁
    allPatchs = patchs
    let index = 0; // 默认那个需要打补丁
    
    walk(node)
}
function doPatch (node, patches) {
    patches.forEach(patch => {
        switch (patch.type) {
            case ATTRS:
            for (let key in patches.attrs) {
                let val = patches.attrs
                if (val) { // 如果有属性的话重新复制
                    setAttr(node ,key , val)
                } else { // 如果为空的话删除属性
                    node.removeAttribute(key)
                }
            }
            break
            case TEXT:
            node.textContent = patch.text
            break
            case REMOVE:
            break
            case REPLACE:
                let newNode = (patch.newNode  instanceof Element) ?
                    render(patch.newNode) :
                    document.createTextNode(patch.newNode)
                node.parentNode.replaceChild(newNode, node)
            break
            default:
            break
        }
    })
}

function walk (node) {
    // 拿到补丁
    let currentPatch = allPatchs[index++]
    // 拿到子节点
    let childNodes = node.childNodes
    childNodes.forEach(child => {
        walk(child)
    });
    if (currentPatch && currentPatch.length > 0) {
        doPatch(node, currentPatch)
    }
}
export default patch
