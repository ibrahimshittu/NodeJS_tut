const { format } = require('date-fns');
const {v4: uuid} = require('uuid');
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, LogName) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd')}` 
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    console.log(logItem)

    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', LogName), logItem)
    } catch (error) {
        console.error(error)
    }
}

module.exports = logEvents;


// console.log(format(new Date(), 'yyyy-MM-dd'));

// console.log(uuid());