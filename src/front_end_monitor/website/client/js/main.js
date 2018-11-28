$(function() {
    // $.ajax({
    //     url: '/api/user',
    //     success: res => {
    //         console.log('res', res)
    //     }
    // })
    console.log('start')
    function a () {
        b()
    }

    function b () {
        c()
    }

    function c () {
        x = y + x
    }
    a()
    console.log('end')
})