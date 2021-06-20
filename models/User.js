const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        minlength: 6
    },
    email: {
        type: String
    },
    weathers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'weather'
    }],
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        require: true
    }
});

// userSchema.pre('delete',function(){

// })

module.exports = mongoose.model('user', userSchema);