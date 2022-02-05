const express = require('express');
const router = express()
const registerController = require('../../controllers/register')

router.route('/')
    .post(registerController.handleNewuser)


module.exports = router
    