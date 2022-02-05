const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data}
}

const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const handleLogin = async (req, res) => {
    const {username, password } = req.body
    if (!username || !password) return res.status(400).json({'message': ' User or Password required'})

    // find duplicates
    const findUser = usersDB.users.find(person => 
        person.username === username
    )

    if (!findUser) return res.status(401).json({'message': "no user found"})
    const match = await bcrypt.compare(password, findUser.password)
    if (match) {
        res.json({'message': `user ${findUser.username} loged in`})
    } else {
        res.sendStatus(401);
    }

}

module.exports = {handleLogin};