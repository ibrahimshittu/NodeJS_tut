const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data}
}

const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleLogin = async (req, res) => {
    const {username, password } = req.body
    if (!username || !password) return res.status(400).json({'message': ' User or Password required'})

    // find duplicates
    const findUser = usersDB.users.find(person => 
        person.username === username
    )

    if (!findUser) return res.status(401).json({'message': "no user found"})
    const match = await bcrypt.compare(password, findUser.password)
    const roles= Object.values(findUser.roles)
    if (match) {
        const access_token =jwt.sign(
            {"userInfo": {"username": findUser.username, "roles": roles}},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '3000s'}
        )
        const refresh_token =jwt.sign(
            {"username": findUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )

        const otherUsers = usersDB.users.filter(person => person.username !== findUser.username)
        const currentUser = {...findUser, refresh_token}
        usersDB.setUsers([...otherUsers, currentUser])
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users))
        res.cookie('jwt', refresh_token, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000})
        res.json({'message': `user ${findUser.username} loged in`,
                'access': access_token})
    } else {
        res.sendStatus(401);
    }

}

module.exports = {handleLogin};