const User = require('../model/User') 

const bcrypt = require('bcrypt')

const handleNewuser = async (req, res) => {
    const {username, password } = req.body
    if (!username || !password) return res.status(400).json({'message': ' User or Password required'})

    // find duplicates
    const duplicate = await User.findOne({username: username}).exec()

    if (duplicate) return res.status(409).json({'message': 'user already exists'})
    try {
        const hashedPwd = await bcrypt.hash(password, 10)
        const result = await User.create({"username": username,             
        "password" : hashedPwd})
        
        res.status(201).json({'message': `user ${username} created\n ${result}`})
    } catch (error) {
        res.json({'message': error.message})
    }
}

module.exports  = {handleNewuser}