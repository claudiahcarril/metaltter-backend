'user strict';

const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const metSchema = mongoose.Schema({
    postedBy: {type: ObjectId, ref: 'User'},
    image: {type: String},
    message: {type: String},
    kudos: {type: Number},
    dateCreated: {type: Date}
})

const Met = mongoose.model('Met', metSchema)

module.exports = Met