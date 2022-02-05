const express = require('express');
const router = express()
const data = {}
data.employees = require('../../data/employees.json')

router.route('/')
    .get((req, res) => {
        res.json(data.employees)
    })
    .post((req, res) => {
        res.json({
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
        })
    })
    .put((req, res) => {
        res.json({
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
        })
    })
    .delete((req, res) => {
        res.json({'id': req.body.id})
    })

router.route('/:id')
    .get((req, res) => {
        res.json({'id': res.params.id})
    })
module.exports = router;