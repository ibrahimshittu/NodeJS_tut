const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const {logger}  = require('./middleware/logEvents')

app.use(logger)

// Cross Origin Resource Sharing
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, '/public')));

app.get('^/$|index(.html)?', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/index(.html)?', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old(.html)?', (req, res)=>{
    res.redirect(301, 'new-page.html')
})

app.get('/hello(.html)?', (req, res, next)=>{
    console.log('hello world')
    next()
}, (req, res) => {
    res.send('hello')
})

const one = (req, res, next) => {
    console.log('helo')
    next()
}
const two = (req, res) => {
    console.log('helo')
    res.send('hi')
}

app.get('/chain', [one, two])

app.get('/*', (req, res)=>{
    res.status(404).redirect(301, '404.html')
})

const PORT = process.env.PORT || 3500;
app.listen(PORT, ()=> console.log(`server running on ${PORT}`))