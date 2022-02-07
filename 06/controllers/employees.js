const Employee = require('../model/Employee') 

const getAllEmployees = async (req, res) => {
    const employees = Employees.find()
    if (!employees) return res.status(204).json({'message':'no employees found'})
    res.json(employees)
}
const createEmployee = async (req, res) => {
    if (!req?.body?.firstName || req?.body?.lastName) return res.status(400).json({'message':'firstname or lastname required'}) 

    try {
        const result = await Employee.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })

        res.status(201).json(result)
    } catch (error) {
        console.log(error.message)
    }   
}
const updateEmployee = async (req, res) => {
    if (!req?.body?.id ) return res.status(400).json({'message':'id required'}) 

    const employee = await Employee.findOne({_id: req.body.id}).exec()
    if (!employee ) return res.status(204).json({'message':'no employee'}) 

    try {
        if (req?.body?.firstName ) employee.firstName = req.body.firstName
        if (req?.body?.lastName ) employee.lastName = req.body.lastName

        const result = employee.save()

        res.json(result)
    } catch (error) {
        console.log(error.message)
    }
}

const deleteEmployee = async (req, res) => {
    if (!req?.body?.id ) return res.status(400).json({'message':'id required'}) 

    const employee = await Employee.findOne({_id: req.body.id}).exec()
    if (!employee ) return res.status(204).json({'message':'no employee'}) 
    const result = Employee.deleteOne({_id: req.body.id})

    res.json(result)
}

const getEmployee = async (req, res) => {
    if (!req?.body?.id ) return res.status(400).json({'message':'id required'}) 

    const employee = await Employee.findOne({_id: req.body.id}).exec()
    if (!employee ) return res.status(204).json({'message':'no employee'}) 
    res.json(result)
}

module.exports = {getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployee}
