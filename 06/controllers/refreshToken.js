const User = require('../model/User') 
const jwt = require('jsonwebtoken')


const handleRefeshToken =  async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(401).json({'message': 'no cookies or jwt'})
    console.log(cookies.jwt)

    const refreshToken = cookies.jwt

    // find refreshToken
    const findUser = await User.findOne({refreshToken}).exec()

    if (!findUser) return res.status(401).json({'message': "no user found"})
    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET, 
        (err, decoded) => {
            if (err || findUser.username !== decoded.username) return res.sendStatus(403)
            const roles = Object.values(findUser.roles)
            const access_token =jwt.sign(
                {"userInfo": {"username": findUser.username, "roles": roles}},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '3000s'})
            
            res.json({'message': `user ${findUser.username}`,
                'access': access_token})
        
        }
    )
    
}

module.exports = {handleRefeshToken};