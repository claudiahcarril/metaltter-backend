'user strict';

// Loading User model
var User = require('../../models/User')
const jwt = require('jsonwebtoken')
const express = require('express')
var createError = require('http-errors')
const router = express.Router()




// GET Users
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch(err) {
        next(err)
    }
})



// GET -> /api/users/:id
router.get('/id/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        if (!user) {
            return next(createError(404))
        }
        res.json(user)
    } catch(err) {
        next(err)
    }
})

// GET -> /api/users/:username
router.get('/:username', async (req, res, next) => {
    const username = req.params.username
    const user = await User.findOne({username})
    
    if (!user) {
        next(createError(404))
        return
    }
    res.json(user)

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
    const userData = req.body

    if (!/^[a-z]+$/i.test(userData.username)) {
        next(createError(400, 'Invalid username'))
        return
    }

    let user = await User.findOne({username: userData.username})

    if(user) {
        next(createError(400, 'Ya existe este usuario'))
        return
    }

    user = await User.findOne({email: userData.email})

    if(user) {
        next(createError(400, 'Ya existe una cuenta con esta dirección de correo'))
        return
    }

    const newUser = new User(userData)
    const userSaved = await newUser.save()
    res.json(userSaved)

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