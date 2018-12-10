module.exports = (ctx, next) => {
    let apiMap = {
        '/api/list': [
            {name: 1},
            {name: 2},
            {name: 3},
            {name: 4},
            {name: 5}
        ],
        '/api/user': {
            name: 'leo',
            age: 19
        },
        '/api/detail': {}
    }

    for (let key in apiMap) {
        if (ctx.path.includes(key)) {
            ctx.body = apiMap[key]
            break
        }
    }
    return next()
}