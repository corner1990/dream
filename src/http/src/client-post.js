const XMLHttpRequest = require('./xhr');

const xhr = new XMLHttpRequest();
        
    // 建立链接
    xhr.open('GET', 'http://localhost:3333/getList', false)
    xhr.setRequestHeader('res', 'hello')
    // 监听参数变化
    xhr.onreadystatechange = () => {
       
        if (xhr.readyState == 4) {
            if (xhr.status === 200) {
                console.log('res', xhr.responseText)
            }
        }
    }

    xhr.onload = () => {
        console.log('readyState', xhr.readyState);
        console.log('status', xhr.status);
        console.log('getAllResonseHeaders', xhr.getAllResponseHeaders());
        console.log('response', xhr.response)
    }
    // 发送请求
    xhr.send(JSON.stringify({ name: 'leo', age: 12 }));