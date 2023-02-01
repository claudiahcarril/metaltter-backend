'user strict';

// Loading User model
var User = require('../../models/User')

const express = require('express')
var createError = require('http-errors')
const router = express.Router()


router.get('/', (req, res, next) => {
    res.json({})
})


module.exports = router