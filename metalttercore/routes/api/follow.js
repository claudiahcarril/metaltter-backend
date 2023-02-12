'user strict';

const mongoose = require('mongoose')

// Loading Follow model
const Follow = require('../../models/Follow');
var Met = require('../../models/Met')
var User = require('../../models/User')

const express = require('express')
var createError = require('http-errors');
const router = express.Router()
const { getUserByToken } = require('../verifyToken');




/// --> GET Dame los usuarios que sigue este usuario 
router.get('/', async (req, res, next) => {
    const token = req.headers['authorization']
    let user
    try {
        user = await getUserByToken(token)
    } catch (err) {
        next(err, 'Errorrrrr')
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

    const follow = await Follow.findById(id)
    console.log('1111',follow)
    if (!follow) {
        return next(createError(404, 'Follow no encontrado 1'))
    }

    const followData = { user: user.id, following: follow.following }

    let userFollowing = await User.findById(follow.following)
    if (!userFollowing) {
        next(createError(404, 'User following no encontrado 2'))
        return
    }

    const followDelete = await Follow.deleteOne(followData)

    user.totalFollowing--
    userFollowing.totalFollowers--
    
    user.save()
    userFollowing.save()
    
    res.json(followDelete)
    
})










module.exports = router