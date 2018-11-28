(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

    // 用户行为监控
    //  获取元素下标
    let getIndex = el => {
        let subs = [...el.parentNode.children];
        // 过滤相同的元素
        subs = subs.filter(node => node.nodeName === el.nodeName);
        let tagName = el.tagName.toLocaleLowerCase();
        for (var i = 0; i < subs.length; i++) {
            if (el === subs[i]) {
                return `${tagName}[${i++}]`
            }
        }
    };
    let getXpath = (el, paths = []) => {
        // let myLabel = getIndex(el)

        let xpath = [];
        let currentEl = el;
        while (currentEl !== document.body) {
            xpath.unshift(getIndex(currentEl));
            currentEl = currentEl.parentNode;
        }
        console.log('xpath', xpath.join('/'));
        debugger

    };

    var beh = {
        init (cb) {
            console.log('inint beh');
            document.addEventListener('click', e => {
                e = e || window.event;
                let target = e.target || e.srcHTML;
                getXpath(target);
                //  //*[@id="root"]/div/header
                console.log('target', target);
            });
        }
    };

    // import perf from './perf'

    // perf.init()

    // resource.init(res => {
    //     console.log('resource', res)
    // })

    // xhrHook.init(function (res) {
    //     console.log('xhrHook', res)
    // })

    // errCatch.init(function (res) {
    //     console.log('errCatch', res)
    // })

    beh.init(function (res) {
        console.log('beh', res);
    });

})));
//# sourceMappingURL=bundle.umd.js.map
