'user strict';

const mongoose = require('mongoose')

// Loading Follow model
var Met = require('../../models/Met')
var User = require('../../models/User')

const express = require('express')
var createError = require('http-errors');
const Follow = require('../../models/Follow');
const router = express.Router()
const { getUserByToken } = require('../verifyToken');




/// --> GET Dame los usuarios que sigue este usuario 
router.get('/', async (req, res, next) => {
    const token = req.headers['authorization']
    let user
    try {
        user = await getUserByToken(token)
    } catch (err) {
        next(err)
    }
    console.log(user)

    const following = await Follow.find({user: user.id}, {_id:0, following: 1})
    
    res.json(following.map(u => u.following))

})





// POST Follow
router.post('/', async (req, res, next) => {
    const token = req.headers["authorization"]
    let user;
    try {
        user = await getUserByToken(token)
    } catch (err) {
        next(err)
        return
    }

    const following = await User.findById(req.body.userId)
    if (!following) {
        return next(createError(404, 'User no encontrado'))
    }

    const followData = { user: user.id, following: following.id }

    let follow = await Follow.findOne(followData)
    if (follow) {
        res.json(follow)
        return
    }

    follow = new Follow(followData)
    const followSave = await follow.save()

    user.totalFollowing++
    following.totalFollowers++

    user.save()
    following.save()

    res.json(followSave)
})



// DELETE Follow
router.delete('/:id', async (req, res, next) => {
    const token = req.headers["authorization"]
    let user;
    try {
        user = await getUserByToken(token)
    } catch (err) {
        next(err, 'err1')
        return
    }

    const id = req.params.id

    const following = await Follow.findById(id)
    if (!following) {
        return next(createError(404, 'Follow no encontrado 1'))
    }

    const followData = { user: user.id, following: following.id }

    let follow = await Follow.findOne(followData)
    if (!follow) {
        next(createError(404, 'Follow no encontrado 2'))
        return
    }

    const followDelete = await Follow.deleteOne(follow)
    user.totalFollowers--
    user.save()
    res.json(followDelete)
    
})










module.exports = router