const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
        minlength: 6
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
});

module.exports = mongoose.model('admin', adminSchema);