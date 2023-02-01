'user strict';

const mongoose = require('mongoose')

const metSchema = mongoose.Schema({
    userName: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    image: {type: String},
    message: {type: String},
    kudos: {type: Number},
    dateCreated: {type: Date}
})

const Met = mongoose.model('Met', metSchema)

module.exports = Met