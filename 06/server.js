const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOptions')
const {logger}  = require('./middleware/logEvents')
const errorHandler  = require('./middleware/errorHandler')
const verifyjwt  = require('./middleware/verifyjwt')

app.use(logger)

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// form data:  ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// middleware for cookie 
app.use(cookieParser());

//serve static files
app.use(express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'))
app.use('/subdir', require('./routes/subdir'))

app.use('/register', require('./routes/api/register'))
app.use('/auth', require('./routes/api/auth'))
app.use('/refreshtoken', require('./routes/api/refresh'))
app.use('/logout', require('./routes/api/logout'))

app.use(verifyjwt)
app.use('/employees', require('./routes/api/employees'))

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler)

const PORT = process.env.PORT || 3500;
app.listen(PORT, ()=> console.log(`server running on ${PORT}`))