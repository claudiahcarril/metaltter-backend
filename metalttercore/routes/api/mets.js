'user strict';

const mongoose = require('mongoose')
const { Schema } = mongoose

// Loading Met model (post)
var Met = require('../../models/Met')
var User = require('../../models/User')

const express = require('express')
var createError = require('http-errors')
const router = express.Router()


// GET Mets
router.get('/', async (req, res, next) => {
    try {
        // Static Methods
        // const name = req.query.name
        
        // const skip = req.query.skip
        // const limit = req.query.limit
        
        // const fields = req.query.fields
        // const sort = req.query.sort
        
        // const filtro = {}
        
        const mets = await Met.find().populate('postedBy')
        // .lista(filtro, skip, limit, fields, sort)
        res.json(mets)
    } catch(err) {
        next(err)
    }
})



// GET -> /api/mets/:id
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const met = await Met.findById(id).populate('postedBy')
        res.json(met)
    } catch(err) {
        next(err)
    }
})


// GET -> /api/mets/postedBy/:id
router.get('/postedBy/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const metData = req.body
        const metUser = await Met.find({ postedBy: id}, metData).populate('postedBy')
        res.json(metUser)
    } catch (err) {
        next(err)
    }
})




// PUT -> /api/mets
router.put('/:id', async(req, res, next) => {
    try {
        const id = req.params.id
        const metData = req.body
        const metUpdated = await Met.findOneAndUpdate({ _id: id}, metData, {
            new: true
        })
        res.json({ result: metUpdated} )

    } catch (err) {
        next(err)
    }
})


// POST -> /api/mets
router.post('/', async(req, res, next) => {
    try {
        //req.headers.authorization 'Bearer h4vk5j634fv5kj6...'
        // data = libDelJWT.getPayload(req.headers.authorization)
        // data.userId // 63dbd04422d2d288045407b5
        /* user = User.findById(data.userId)
        if (!token) {
            return next(createError(401, 'Tienes que hacer login'))
        }
         */
        if(!req.body.message) {
            return next(createError(400, 'Message is required'))
        }
        

        const metData = req.body
        const met = new Met(metData)
        const metSaved = await met.save()
        res.json({ result: metSaved })

    } catch (err) {
        next(err)
    }
})


// DELETE -> /api/mets/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const response = await Met.deleteOne({ _id: id })

        if (!response.deletedCount) {
            return next(createError(404))
        }
        res.json()

    } catch (err) {
        next(err)
    }
})





module.exports = router