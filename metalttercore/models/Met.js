'user strict';

const mongoose = require('mongoose')

const metSchema = mongoose.Schema({
    id: {type: Number},
    user: {type: String},
    image: {type: String},
    message: {type: String},
    kudos: {type: Array},
    publicationDate: {type: Date}
})

const Met = mongoose.model('Met', metSchema)

module.exports = Met