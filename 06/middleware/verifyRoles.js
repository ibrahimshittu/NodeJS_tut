const verifyRoles = (...allowedroles)=> {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatuts(401)
        const rolesArray = [...allowedroles]
        console.log(rolesArray)
        console.log(req.roles)
        const result = req.roles.map(roles => rolesArray.includes(roles)).find(val => val === true)
        if (!result) return res.sendStatuts(401)
        next()

    }
}

module.exports = verifyRoles