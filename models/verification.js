const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
    expire: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Verification', verificationSchema);