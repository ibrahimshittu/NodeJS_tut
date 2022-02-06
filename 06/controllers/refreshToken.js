const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data}
}


const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleRefeshToken =  (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(401).json({'message': 'no cookies or jwt'})
    console.log(cookies.jwt)

    const refreshToken = cookies.jwt

    // find refreshToken
    const findUser = usersDB.users.find(person => 
        person.refresh_token === refreshToken
    )

    if (!findUser) return res.status(401).json({'message': "no user found"})
    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET, 
        (err, decoded) => {
            if (err || findUser.username !== decoded.username) return res.sendStatus(403)
            const access_token =jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '3000s'})
            
            res.json({'message': `user ${findUser.username}`,
                'access': access_token})
        
        }
    )
    
}

module.exports = {handleRefeshToken};