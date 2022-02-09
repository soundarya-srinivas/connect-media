const { json } = require('express/lib/response');
const mongoose = require('mongoose');
const Stream = mongoose.model('Stream');
const Technology = mongoose.model('Technology');

exports.stream = (req, res, next) => {
    try {
        const body = req.body.stream;
        console.log("body", typeof body)
        const streams = new Stream({
            Stream: body
        })
        streams.save()
        res.json("saved stream")

    } catch (error) {
        console.log(error)
    }

}
exports.technology = (req, res, next) => {
    const { streamid, technology } = req.body;


    try {
        const technologies = new Technology({
            streamid: streamid,
            Technology: technology
        })
        technologies.save()
        res.json("saved tech")
    } catch (error) {
        console.log(error)
    }
}


exports.showTechnology = (req, res, next) => {
    try {
        Technology.find()
            .then(result => res.json(result))

    } catch (error) {
        console.log(error)
    }
}

exports.TechnologyName=(req,res,next)=>{
    Technology.findById(req.params.technologyId)
    .then(result=>res.json(result))
}