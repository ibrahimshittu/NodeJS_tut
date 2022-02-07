const express = require('express');
const router = express()
const employeesController = require('../../controllers/employees')
const verifyRoles = require('../../middleware/verifyRoles')
const ROLES = require('../../config/roles_list')


router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verifyRoles(ROLES.Admin, ROLES.Editor), employeesController.createEmployee)
    .put(verifyRoles(ROLES.Admin, ROLES.Editor),employeesController.updateEmployee)
    .delete(verifyRoles(ROLES.Admin),employeesController.deleteEmployee)

router.route('/:id')
    .get(employeesController.getEmployee)
    
module.exports = router;