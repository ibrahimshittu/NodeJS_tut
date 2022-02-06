const express = require('express');
const router = express()
const refreshTokenController = require('../../controllers/refreshToken')


router.route('/')
    .get(refreshTokenController.handleRefeshToken)


module.exports = router;