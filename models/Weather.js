const mongoose = require('mongoose');

const weatherSchema = mongoose.Schema({
    name: {
        type: String
    },
    main: {
        type: Object
    },

    speed: {
        type: Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    }
});

module.exports = mongoose.model('weather', weatherSchema);