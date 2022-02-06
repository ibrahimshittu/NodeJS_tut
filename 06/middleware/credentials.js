const allowedorigins = require('../config/allowedorigins')

const credentials = (req, res, next) => {
    const origin = req.header.origin

    if (allowedorigins.includes(origin)) {
        res.header('Access-Control-Alow_Credentials', true)

    }
    next()
}

module.exports = credentials