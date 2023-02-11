'user strict';

const mongoose = require('mongoose')
const { Schema } = mongoose

// Loading Met model (post)
var Met = require('../../models/Met')
var User = require('../../models/User')

const express = require('express')
var createError = require('http-errors')
const router = express.Router()
const jwt = require('jsonwebtoken')


// GET Mets
router.get('/', async (req, res, next) => {
    try {
        // Static Methods
        // const name = req.query.name
        
        const skip = req.query.skip
        const limit = req.query.limit
        
        const fields = req.query.fields
        const sort = req.query.sort

        const filtro = {}

        // if (message) {
        //     filtro.message = { $regex: new RegExp(`^${message}`, 'i') }
        //     const mets = await Met.find().populate('postedBy').sort({dateCreated: -1}).limit(limit).skip(skip)
        //     res.json(mets) 
        // }

        if (sort) {
            const mets = await Met.find().populate('postedBy').sort({dateCreated: 1}).limit(limit).skip(skip)
            res.json(mets) 
        }

        const mets = await Met.find({}).populate('postedBy kudos').sort({dateCreated: -1}).limit(limit).skip(skip)
        // // .lista(filtro, skip, limit, fields, sort)
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
        const skip = req.query.skip
        const limit = req.query.limit
        const sort = req.query.sort
        const id = req.params.id
        const metData = req.body

        if (sort) {
            const metUser = await Met.find({ postedBy: id}, metData).populate('postedBy').sort({dateCreated: 1}).limit(limit).skip(skip)
            res.json(metUser) 
        }

        const metUser = await Met.find({ postedBy: id}, metData).populate('postedBy').sort({dateCreated: -1}).limit(limit).skip(skip)
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
        res.json(metUpdated)

    } catch (err) {
        next(err)
    }
})


// POST -> /api/mets
router.post('/', async(req, res, next) => {
    let user = null
    const token = req.headers["authorization"]
    if (!token) {
        next(createError(401, 'Tienes que hacer login para publicar'))
        return
    } 

    const tokenWithoutBearer = token.replace('Bearer ', '')
    try {
        const tokenInfo = jwt.verify(tokenWithoutBearer, 'Dgh5Hmnbkib868g7bg8g767f5f7')
        user = await User.findById(tokenInfo.id)
        console.log(tokenInfo)
        if (!user) {
            next(createError(403, 'Error user'))
            return
        }

    } catch (err) {
        console.log(err)
        next(createError(403, 'Error'))
        return
    }

    const userId = user._id
    const metData = req.body


    if(!req.body.message) {
        return next(createError(400, 'Message is required'))
    }
        
    const met = new Met({ postedBy: userId, ...metData })
    const metSaved = await met.save()
    res.json(metSaved)

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