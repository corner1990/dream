// 处理错误日志
/**
 * 解析处理错误
 */
let formatError = ({column, columnNumber, line, lineNumber, name: errTypell, message, stack}) => {
    let col = column || columnNumber
    let row = line || lineNumber
    // sourceURL不准确，准确的报错信息只有自己从stack里解析
    if (stack) {
        // matchUrl 有报错url和报错位置
        let matchUrl = /https?:\/\/[^\n]+/.exec(stack)
        let urlFirstStack = matchUrl ? matchUrl[0] : ""
        let regUrlCheck = /https?:\/\/(\S)*\.js/
        
        // 获取真正的url
        let resourceUrl = ''
        if (regUrlCheck.test(urlFirstStack)) {
            resourceUrl = regUrlCheck.exec(urlFirstStack)[0]
        }

        // 获取真正的行内信息
        let stackCol;
        let stackRow;
        let postStack =  /:(\d+):(\d+)/.exec(urlFirstStack)

        if (postStack && postStack.length >= 3) {
            [, stackRow, stackCol] = postStack
            console.log('stackRow, stackCol', stackRow, stackCol)
        }

        // 返回解析后的结果
        return {
            content: stack,
            col: Number(col | stackCol),
            row: Number(row | stackRow),
            errType,
            message,
            resourceUrl
        }
    }
    debugger
}

export default {
    init (cb = () => {}) {
        let _origin_error = window.onerror
        window.onerror =  (message, source, lineo, colno, error) => {
            // debugger
            // 通常情况下的处理就是将错误直接上传过去，
            // 但是在不懂得浏览器之间抛出的错误是不一样的，safair和feiox相对准确一点，但是Chrome给的错误就不是很理想
            let errInfo = formatError(error)
            errInfo.type = 'error'
            // let errInof = {
            //     type: 'error'
            // }
            cb && cb(errInfo)
            _origin_error && _origin_error.apply(window, arguments)
        }
    }
}