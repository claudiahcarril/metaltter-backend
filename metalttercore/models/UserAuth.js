'user strict';

const mongoose = require('mongoose')

const userAuthSchema = mongoose.Schema({
    userName: {type: String, unique: true},
    email: {type: String, unique: true},
    password: {type: String},
})

const UserAuth = mongoose.model('UserAuth', userAuthSchema)

module.exports = UserAuth