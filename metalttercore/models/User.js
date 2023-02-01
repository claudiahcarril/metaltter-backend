'user strict';

const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, unique: true},
    // userName: {type: mongoose.Schema.Types.ObjectId, ref: 'UserAuth'},
    userName: {type: String, unique: true},
    avatar: {type: String},
    followers: {type: Number},
    following: {type: Number},
})

const User = mongoose.model('User', userSchema)

module.exports = User