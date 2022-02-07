const mongoose = require('mongoose')

const { Schema } = mongoose;

const employeeSchema = new Schema({
    firstName:  {type: String, required: true}, // String is shorthand for {type: String}
    lastName: {type: String, required: true},
    created_at:  {type: Date, default: Date.now},

    
});

module.exports = mongoose.model('Employee', employeeSchema)