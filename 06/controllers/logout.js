const User = require('../model/User') 


const handleLogout =  async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(204).json({'message': 'no cookies or jwt'})
    console.log(cookies.jwt)

    const refreshToken = cookies.jwt

    // find refreshToken
    const findUser = await User.findOne({refreshToken}).exec()

    if (!findUser) { 
    res.clearCookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true})
    return res.status(204).json({'message': "no user found"})
    }

    findUser.refreshToken = ''
    const result = await findUser.save()

    console.log(result)
    
    res.clearCookie('jwt', refreshToken, {httpOnly: true,sameSite: 'None', secure: true}) // secure: true for production
    res.status(204)
}

module.exports = {handleLogout};