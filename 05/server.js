const logEvents = require('./logEvents')

const eventEmitter = require('events')

class MyEmitter extends eventEmitter {};

const myEmitter = new MyEmitter();

myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(()=>{
    myEmitter.emit('log', 'emitted!!!!')
}, 2000)
