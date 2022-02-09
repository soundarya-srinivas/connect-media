const mongoose = require('mongoose');
const User = require('../models/User');

exports.profilePicUpdate = (req, res, next) => {
    const { pic } = req.body
    console.log("inside route", pic)
    User.findByIdAndUpdate({ _id: req.user._id }, {
        profilePicture: pic
    }, {
        new: true
    }).select("-password")
        .populate('followers', "_id name profilePicture updatedAt")
        .populate('following', "_id name profilePicture updatedAt")
        .then(result => {
            res.json(result);
            console.log("route result", result)
        })
}

exports.UsersProfile = (req, res, next) => {

    console.log("inside user prof", req.params.userid)
    User.findById(req.params.userid)
        .select("-password")
        .populate('followers', "_id name profilePicture updatedAt")
        .populate('following', "_id name profilePicture updatedAt")
        .then(result => {
            res.json(result);
            console.log("users profile result", result)
        })
}

exports.myProfile = (req, res, next) => {

   
    User.findById(req.user._id)
        .select("-password")
        .populate('followers', "_id name profilePicture updatedAt")
        .populate('following', "_id name profilePicture updatedAt")
        .then(result => {
            res.json(result);
            console.log("my profile result", result)
        })
}

exports.followUser = (req, res, next) => {

    console.log("inside user prof", req.body.followID)
    User.findByIdAndUpdate(req.user._id, {
        $push: { 'following': req.body.followID },

    }, {
        new: true
    }, (err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        User.findByIdAndUpdate(req.body.followID, {
            $push: { 'followers': req.user._id }
        }, {
            new: true
        }).populate('followers', "_id name profilePicture updatedAt")
            .populate('following', "_id name profilePicture updatedAt")
            .then(data => res.json({ data, result }))
        console.log("1 data", result)
    }).populate('followers', "_id name profilePicture updatedAt")
        .populate('following', "_id name profilePicture updatedAt")

}

exports.unfollowUser = (req, res, next) => {

    console.log("inside user prof", req.user._id)
    User.findByIdAndUpdate(req.user._id, {
        $pull: { 'following': req.body.unfollowID },

    }, {
        new: true
    }, (err, result) => {
        if (err) {
            console.log("err")
            return res.status(422).json({ error: err })
        }
        console.log("2")
        User.findByIdAndUpdate(req.body.unfollowID, {
            $pull: { 'followers': req.user._id }
        }, { new: true }).populate('followers', "_id name profilePicture updatedAt")
            .populate('following', "_id name profilePicture updatedAt")
            .then(data => res.json({ data, result }))
        console.log("1 data", result)

    })
}