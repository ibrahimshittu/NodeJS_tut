const express = require('express')
const app = express()
const path = require('path')

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