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

// GET -> /api/mets/:id
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const met = await Met.findById(id)
        res.json({ result: met })
    } catch(err) {
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