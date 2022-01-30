const fs = require('fs');
const path = require('path')

if(!fs.existsSync(path.join(__dirname, 'newfiles'))){
fs.mkdir(path.join(__dirname, 'newfiles'), (err)=> {
    if (err) throw err;
})
}

if(fs.existsSync(path.join(__dirname, 'newfiles'))){
fs.rmdir(path.join(__dirname, 'newfiles'), (err)=> {
    if (err) throw err;
})
}

