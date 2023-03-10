'use strict'
var createError = require('http-errors');
const jwt = require('jsonwebtoken')
var User = require('../models/User')

async function getUserByToken(token) {
    if (!token) {
        throw createError(403, 'err')
    } 
    const tokenWithoutBearer = token.replace('Bearer ', '')

    try {
        const tokenInfo = jwt.verify(tokenWithoutBearer, 'Dgh5Hmnbkib868g7bg8g767f5f7')
        const user = await User.findById(tokenInfo.id)
        if (!user) {
            throw createError(403, 'error')
        }
        return user
    } catch (err) {
        throw createError(403, 'erro2')
    }
    
}

module.exports = { getUserByToken }
