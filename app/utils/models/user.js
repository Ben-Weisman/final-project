const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cookbookID: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }

}, {timestamps: true});


const Users = mongoose.model('users',userSchema);
module.exports = Users;