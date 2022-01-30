const fs = require('fs')
const path = require('path')

const ws = fs.createWriteStream(path.join(__dirname, 'files', 'newpromisescomplete.txt'))

const rs = fs.createReadStream(path.join(__dirname, 'files', 'promisescomplete.txt'), {encoding: 'utf8'})

rs.on('data', (data)=>{
    ws.write(data)
})

rs.pipe(ws)