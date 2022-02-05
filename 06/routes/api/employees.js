const express = require('express');
const router = express()
const employeesController = require('../../controllers/employees')


router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee)

router.route('/:id')
    .get(employeesController.getEmployee)
    
module.exports = router;