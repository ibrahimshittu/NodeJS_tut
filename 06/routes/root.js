const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|index(.html)?', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

router.get('/index(.html)?', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'))
})

router.get('/old(.html)?', (req, res)=>{
    res.redirect(301, 'new-page.html')
})

router.get('/hello(.html)?', (req, res, next)=>{
    console.log('hello world')
    next()
}, (req, res) => {
    res.send('hello')
})

module.exports = router;