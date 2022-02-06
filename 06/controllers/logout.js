const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data}
}


const fsPromises = require('fs').promises
const path = require('path')


const handleLogout =  async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(204).json({'message': 'no cookies or jwt'})
    console.log(cookies.jwt)

    const refreshToken = cookies.jwt

    // find refreshToken
    const findUser = usersDB.users.find(person => 
        person.refresh_token === refreshToken
    )

    if (!findUser) { 
    res.clearCookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true})
    return res.status(204).json({'message': "no user found"})
    }

    const otherUsers = usersDB.users.filter(person => person.refresh_token !== findUser.refresh_token)
    const currentUser = {...findUser, refresh_token: ''}
    usersDB.setUsers([...otherUsers, currentUser])
    await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users))
    
    res.clearCookie('jwt', refreshToken, {httpOnly: true,sameSite: 'None', secure: true}) // secure: true for production
    res.status(204)
}

module.exports = {handleLogout};