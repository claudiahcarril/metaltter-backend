const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
var createError = require('http-errors')
var User = require('../../../models/User')



// GET --> Profile
router.get('/', async (req, res,next) => {
    const token = req.headers["authorization"]
    if (!token) {
        next(createError(403))
        return
    } 
    const tokenWithoutBearer = token.replace('Bearer ', '')
    try {
        const tokenInfo = jwt.verify(tokenWithoutBearer, 'Dgh5Hmnbkib868g7bg8g767f5f7')
        const user = await User.findById(tokenInfo.id)
        res.json(user)
    } catch (err) {
        next(createError(403))
        return
    }
})


module.exports = router