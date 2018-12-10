const moment = require('moment')
exports.relativeTime = time => moment(new Date(time * 1000)).fromNow()
exports.sum = (a, b) => (a + b)