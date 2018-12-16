document.getElementById('btn').addEventListener('click', function () {
    import('./lazy.js').then(obj => {
        console.log(obj.name)
    })
}, false)