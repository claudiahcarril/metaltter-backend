'user strict';

const mongoose = require('mongoose')

// Loading Kudo model
var Met = require('../../models/Met')
var User = require('../../models/User')

const express = require('express')
var createError = require('http-errors');
const Kudo = require('../../models/Kudo');
const router = express.Router()
const { getUserByToken } = require('../verifyToken');


// GET Kudos
// router.get('/', async (req, res, next) => {
//     try {
//         const kudos = await Kudo.find()
//         res.json(kudos)
//     } catch(err) {
//         next(err)
//     }
// })


/// --> GET DAme los mets que le gustan a este tio (tio logueado -> userid lo tenemos con getUserByToken)
router.get('/', async (req, res, next) => {
    const token = req.headers['authorization']
    let user
    try {
        user = await getUserByToken(token)
    } catch (err) {
        next(err)
    }

    const kudosUser = await Kudo.find({user: user.id}, {_id:0, met: 1})
    
    res.json(kudosUser.map(m => m.met))

})





// POST Kudos
router.post('/', async (req, res, next) => {
    const token = req.headers["authorization"]
    let user;
    try {
        user = await getUserByToken(token)
    } catch (err) {
        next(err)
        return
    }

    const met = await Met.findById(req.body.metId)
    if (!met) {
        return next(createError(404, 'Met no encontrado'))
    }

    const kudoData = { user: user.id, met: met.id }

    let kudo = await Kudo.findOne(kudoData)
    if (kudo) {
        res.json(kudo)
        return
    }

    kudo = new Kudo(kudoData)
    const kudoSave = await kudo.save()
    met.kudos++
    met.save()

    res.json(kudoSave)
})



// DELETE Kudos

router.delete('/', async (req, res, next) => {
    const token = req.headers["authorization"]
    let user;
    try {
        user = await getUserByToken(token)
    } catch (err) {
        next(err, 'err1')
        return
    }

    const met = await Met.findById(req.body.metId)
    if (!met) {
        return next(createError(404, 'Met no encontrado'))
    }

    const kudoData = { user: user.id, met: met.id }
    console.log(user.id, met.id)

    let kudo = await Kudo.findOne(kudoData)
    console.log(kudo)
    if (!kudo) {
        next(createError(404, 'Met no encontrado'))
        return
    }

    const kudoDelete = await Kudo.deleteOne(kudo)
    met.kudos--
    met.save()
    res.json(kudoDelete)
    
})








module.exports = router