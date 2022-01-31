const http = require('http');
const path = require('path');
const fs = require('fs');
const fspromises = require('fs').promises;


const logEvents = require('./logEvents');
const eventEmitter = require('events');
class Emitter extends eventEmitter {};

const myEmitter = new Emitter();


const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res)=> {
    console.log(req.url, req.method)

    let filePath;;

    if (req.url === '/' || req.url === 'index.html') {
        res.statusCode = 200;
        res.setHeader('content-type', 'text/html');
        
        fs.readFile(path.join(__dirname, 'views', 'index.html'), 'utf8', (err, data) => {
            res.end(data)
        });
    }
})

server.listen(PORT, ()=> console.log(`server running on ${PORT}`))


// myEmitter.on('log', (msg) => logEvents(msg));

// myEmitter.emit('log', 'emitted!!!!')

