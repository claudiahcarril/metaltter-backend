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


// Static Methods
metSchema.statics.lista = function(filtro, skip, limit, fields, sort) {
    const query = Met.find(filtro)
    query.skip(skip)
    query.limit(limit)
    query.select(fields)
    query.sort(sort)
    return query.exec()
}


const Met = mongoose.model('Met', metSchema)

module.exports = Met