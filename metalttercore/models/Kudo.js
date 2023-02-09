'user strict';

const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const kudoSchema = mongoose.Schema({
    user: {type: ObjectId, ref: 'User'},
    met: {type: ObjectId, ref: 'Met'},

})

const Kudo = mongoose.model('Kudo', kudoSchema)

module.exports = Kudo