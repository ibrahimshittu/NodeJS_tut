const express = require('express');
const router = express()
const authController = require('../../controllers/auth')


router.route('/')
    .post(authController.handleLogin)

    
    
module.exports = router;