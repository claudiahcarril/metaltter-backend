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


/// --> GET Dame los mets de los usuarios que sigue este usuario 
router.get('/mets', async (req, res, next) => {
    const skip = req.query.skip
    const limit = req.query.limit

    const token = req.headers['authorization']
    let user
    try {
        user = await getUserByToken(token)
    } catch (err) {
        next(err, 'Errorrrrr')
    }
    const follows = await Follow.find({user: user.id})
    const userIds = follows.map(u => u.following)

    const mets = await Met.find({ postedBy: { '$in': userIds } })
        .populate('postedBy')
        .sort({dateCreated: -1})
        .limit(limit)
        .skip(skip)
    
    res.json(mets)
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
    const followData = { user: user.id, following: id }

    let follow = await Follow.findOne(followData)
    if (!follow) {
        res.json({})
        return
    }

    const followDelete = await Follow.deleteOne(followData)

    const userFollowing = await User.findById(id)

    user.totalFollowing--
    userFollowing.totalFollowers--
    
    user.save()
    userFollowing.save()
    
    res.json(followDelete)
    
})










module.exports = router