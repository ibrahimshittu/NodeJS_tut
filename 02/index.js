const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')


const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'end.txt'), 'utf8')
        console.log(data)
        await fsPromises.appendFile(path.join(__dirname, 'files', 'newPromises.txt'), '\n\n hello boss')
        await fsPromises.rename(path.join(__dirname, 'files', 'newPromises.txt'), path.join(__dirname, 'files', 'Promisescomplete.txt'))
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'Promisescomplete.txt'), 'utf8')
        console.log(newData)
        await fsPromises.unlink(path.join(__dirname, 'files', 'end.txt'))
    } catch (error) {
        console.error(error)
    }
}
fileOps();




// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data)=> {
//     if (err) throw err;
//     console.log(data)
// })

// fs.writeFile(path.join(__dirname, 'files', 'end.txt'), 'Nice to meeet you!', (err)=> {
//     if (err) throw err;
//     console.log('Done')

//     fs.appendFile(path.join(__dirname, 'files', 'end.txt'), '\n\nNice to meeet you again!', (err)=> {
//         if (err) throw err;
//         console.log('append Done')

//         fs.rename(path.join(__dirname, 'files', 'end.txt'), path.join(__dirname, 'files', 'new end.txt'), (err)=> {
//             if (err) throw err;
//             console.log('rename Done')
//         })
//     })
// })




process.on('UncaughtException', err => {
    console.error(`Error found: ${err}`)
    process.exit(1)
})