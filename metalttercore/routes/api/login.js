const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
var User = require('../../models/User')



// POST --> Login
router.post('/', async (req, res, next) => {
    const userData = req.body
    const user = await User.findOne({username: userData.username, password: userData.password})
    try {
        if (user.username === userData.username) {
            const token = jwt.sign({user}, 'Dgh5Hmnbkib868g.7bg8g767f5f7')
            res.json(token)
        }
        
    } catch (err) {
        next(err)
    }
})


module.exports = router