const express = require('express');
const router = express()
const logoutController = require('../../controllers/logout')


router.route('/')
    .get(logoutController.handleLogout)

    
module.exports = router;