// import perf from './perf'
// import resource from './resource'
// import xhrHook from './xhrHook'
// import errCatch from './errCatch'
import beh from './beh'

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
    console.log('beh', res)
})

