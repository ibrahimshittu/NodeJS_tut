const mongoose = require('mongoose')

const { Schema } = mongoose;

const userSchema = new Schema({
    username:  {type: String, required: true}, // String is shorthand for {type: String}
    roles: { User: 
        {type: Number, default: 2001},
        Admin: Number,
        Editor: Number,
    },
    password:  {type: String, required: true},
    refreshToken: String,
    created_at:  {type: Date, default: Date.now},

    
});

module.exports = mongoose.model('User', userSchema)