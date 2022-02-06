const allowedorigins = require('./allowedorigins')

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedorigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;