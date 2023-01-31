'user strict';

// Loading Met model (post)
var Met = require('../../models/Met')

const express = require('express')
var createError = require('http-errors')
const router = express.Router()


Met.find((err, mets) => {
    console.log(mets)
})