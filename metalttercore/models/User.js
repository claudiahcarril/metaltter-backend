'user strict';

const mongoose = require('mongoose')
// const { ObjectId } = mongoose.Schema

const userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    name: {type: String},
    email: {type: String},
    password: {type: String},
    avatar: {type: String},
    followers: {type: Number},
    following: {type: Number},
    // mets: [{ type: ObjectId, ref: 'Met' }]
})

const User = mongoose.model('User', userSchema)

module.exports = User