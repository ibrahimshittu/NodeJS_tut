const usersBD = {
    users: require('../model/users.json'),
    setUser: function (data) { this.users == data}
}

const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const handleNewuser = async (req, res) => {
    const {username, password } = req.body
    if (!username || !password) return res.status(400).json({'message': ' User or Password required'})

    // find duplicates
    const duplicate = usersBD.users.find(person => {
        person.username == username
    })

    if (duplicate) return res.status(409).json({'message': 'user already exists'})
    try {
        const hashedPwd = await bcrypt.hash(password, 10)
        const newUser = {'username': username, 'password': hashedPwd}
        usersBD.setUser([...usersBD, newUser])

        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), 
        JSON.stringify(usersDB.users))
        console.log(usersBD.users)
        res.status(201).json({'message': `user ${username} created`})
    } catch (error) {
        res.json({'message': error.message})
    }
}

module.exports  = {handleNewuser}