// 事件触发器
const {EventEmitter} = require('events')

// 事件触发器从这里获取（单例）
module.exports = new EventEmitter()
