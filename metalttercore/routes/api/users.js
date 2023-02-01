'user strict';

// Loading User model
var User = require('../../models/User')

const express = require('express')
var createError = require('http-errors')
const router = express.Router()


router.get('/', (req, res, next) => {
    res.json({})
})

// GET -> /api/users/:id
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        res.json({ result: user })
    } catch(err) {
        next(err)
    }
})


// PUT -> /api/users
router.put('/:id', async(req, res, next) => {
    try {
        const id = req.params.id
        const userData = req.body
        const userUpdated = await User.findOneAndUpdate({ _id: id}, userData, {
            new: true
        })
        res.json({ result: userUpdated} )

    } catch (err) {
        next(err)
    }
})


// POST -> /api/users
router.post('/', async(req, res, next) => {
    try {
        const userData = req.body
        const user = new Met(userData)
        const userSaved = await user.save()
        res.json({ result: userSaved })

    } catch (err) {
        next(err)
    }
})


// DELETE -> /api/users/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const response = await User.deleteOne({ _id: id })

        if (!response.deletedCount) {
            return next(createError(404))
        }
        res.json()

    } catch (err) {
        next(err)
    }
})




module.exports = router