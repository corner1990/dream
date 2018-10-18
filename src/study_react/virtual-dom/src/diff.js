// 完成补丁
// const ATTRS = 'ATTRS'
// const TEXT = 'TEXT'
// const REMOVE = 'REMOVE'
// const REPLACE = 'REPLACE'
// let Index = 0;
// function diff (oldTree, newTree) {
//     let patches = {}
//     let index = 0; // 为了避免index变化，使用唯一的下标
//     walk(oldTree, newTree, Index, patches)
//     return patches
// }

// // 子节点对比
// function diffChildren (oldChildren, newChildren, index, patches) {
//     // 比较老的第一个和新的第一个
//     oldChildren.forEach((child, idx) => {
//         // 索引不应该是idx
//         // index 每次调用都应该增加， 每次传递给walk的时候是递增的, 所有的人都基于一个index来实现
//         // walk(child, newChildren[idx], ++index, patches)
//         walk(child, newChildren[idx], ++Index, patches)
//     });
// }

// // 属性对比
// function diffAttr (oldAttrs, newAttrs) {
//     let patch = {}
//     for (let key in oldAttrs) {
//         if (oldAttrs[key] !== newAttrs[key]) {
//             patch[key] = newAttrs[key] // 有可能是undefined
//         }
//     }

//     // 判断是否有新增属性， （老街店没哟新节点的属性）
//     for (let key in newAttrs) {
//         if (!oldAttrs.hasOwnProperty(key)) {
//             patch[key] = oldAttrs[key] 
//         }
//     }
//     return patch
// }
// function isString (node) {
//     return Object.prototype.toString.call(node) === '[object String]'
// }

// // 递归树 比较后的结果放入补丁包
// function walk (oldNode, newNode, index, patches) {
//     let currentPatch = []
//     if (!newNode) {
//         currentPatch.push({type: REMOVE, index})
//     } else
//     // 文本节点是否变化
//     if (isString(oldNode) && isString(newNode)) {
//         if (oldNode !== newNode) {
//             currentPatch.push({type: TEXT, text: newNode})
//         }
//     } else  if (oldNode.type === newNode.type) {
//         // 比较属性是否有更改
//         let attrs = diffAttr(oldNode.props, newNode.props)
//         if (Object.keys(attrs).length > 0) {
//             currentPatch.push({type: ATTRS, attrs})
//         }

//         // 如果有儿子节点， 遍历子节点
//         diffChildren(oldNode.children, newNode.children, index, patches)
//     } else if(newNode) {
//         // 说明节点被替换了
//         currentPatch.push({type: REPLACE, newNode})
//     }
//     // 当前补丁包中有改动，才在大的补丁包中保存不同之处
//     if(currentPatch.length) {
//         patches[index] = currentPatch
//     }
// }

// export default diff




// 更新dom
const ATTRS = 'ATTRS'
const TEXT = 'TEXT'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
let Index = 0;

function diff (oldTree, newTree) {
    let patches = {}
    let index = 0; // 为了避免index变化，使用唯一的下标
    walk(oldTree, newTree, Index, patches)
    return patches
}

// 子节点对比
function diffChildren (oldChildren, newChildren, index, patches) {
    // 比较老的第一个和新的第一个
    oldChildren.forEach((child, idx) => {
        // 索引不应该是idx
        // index 每次调用都应该增加， 每次传递给walk的时候是递增的, 所有的人都基于一个index来实现
        // walk(child, newChildren[idx], ++index, patches)
        walk(child, newChildren[idx], ++Index, patches)
    });
}

// 属性对比
function diffAttr (oldAttrs, newAttrs) {
    let patch = {}
    for (let key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            patch[key] = newAttrs[key] // 有可能是undefined
        }
    }

    // 判断是否有新增属性， （老街店没哟新节点的属性）
    for (let key in newAttrs) {
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = oldAttrs[key] 
        }
    }
    return patch
}
function isString (node) {
    return Object.prototype.toString.call(node) === '[object String]'
}

// 递归树 比较后的结果放入补丁包
function walk (oldNode, newNode, index, patches) {
    let currentPatch = []
    if (!newNode) {
        currentPatch.push({type: REMOVE, index})
    } else
    // 文本节点是否变化
    if (isString(oldNode) && isString(newNode)) {
        if (oldNode !== newNode) {
            currentPatch.push({type: TEXT, text: newNode})
        }
    } else  if (oldNode.type === newNode.type) {
        // 比较属性是否有更改
        let attrs = diffAttr(oldNode.props, newNode.props)
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({type: ATTRS, attrs})
        }

        // 如果有儿子节点， 遍历子节点
        diffChildren(oldNode.children, newNode.children, index, patches)
    } else if(newNode) {
        // 说明节点被替换了
        currentPatch.push({type: REPLACE, newNode})
    }
    // 当前补丁包中有改动，才在大的补丁包中保存不同之处
    if(currentPatch.length) {
        patches[index] = currentPatch
    }
}



export default diff