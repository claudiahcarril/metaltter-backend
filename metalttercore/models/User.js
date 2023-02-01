'user strict';

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    id: {type: Number},
    name: {type: String},
    nickname: {type: String},
    avatar: {type: String},
    followers: {type: Number},
    following: {type: Number},
})

const User = mongoose.model('User', userSchema)

module.exports = User