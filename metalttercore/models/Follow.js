'user strict';

const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const followSchema = mongoose.Schema({
    user: {type: ObjectId, ref: 'User'},
    following: {type: ObjectId, ref: 'User'},

})

const Follow = mongoose.model('Follow', followSchema)

module.exports = Follow