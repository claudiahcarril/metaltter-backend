'user strict';

const mongoose = require('mongoose')
// const { ObjectId } = mongoose.Schema

const userSchema = mongoose.Schema({
    username: {type: String},
    name: {type: String},
    email: {type: String},
    password: {type: String},
    avatar: {type: String, default: "/public/images/default-avatar.png"},
    followers: {type: Number, default: 0},
    following: {type: Number, default: 0},
    // mets: [{ type: ObjectId, ref: 'Met' }]
})

const User = mongoose.model('User', userSchema)

module.exports = User