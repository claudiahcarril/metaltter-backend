'user strict';

// Loading Met model (post)
var Met = require('../../models/Met')

const express = require('express')
var createError = require('http-errors')
const router = express.Router()


router.get('/', async (req, res, next) => {
    try {
        const mets = await Met.find()
        res.json({ results: mets })
    } catch(err) {
        next(err)
    }
})



module.exports = router