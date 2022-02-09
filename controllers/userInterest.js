const mongoose = require('mongoose');
const User = require('../models/User');
const UserInterest = mongoose.model('UserInterest')
const Stream = mongoose.model('Stream')
const Technology = mongoose.model('Technology')
const ErrorResponse = require('../utils/errorResponse')
// const sendEmail = require('../utils/sendEmail')

exports.userInterest = async (req, res, next) => {



    const user = req.user._id

    let stringObjectIdArray = req.params.ids.split(',');
    let objectIdArray = stringObjectIdArray.map(s => mongoose.Types.ObjectId(s));
    console.log("obj", objectIdArray)
    let update = { technologyId: objectIdArray }

    try {



        UserInterest.find({ userInterestOfUser: user }).then(result => {

            if (result.length !== 0) {
                console.log("ent if")
                objectIdArray = objectIdArray.concat(result[0].technologyId);
            }


            update = { technologyId: objectIdArray }
            console.log("entered upadte", update)

            UserInterest.findOneAndUpdate({ userInterestOfUser: user }, update, function (error, result) {

                if (error) {
                    console.log("error", error)

                }
                if (!result) {

                    const userInterest = new UserInterest({

                        technologyId: objectIdArray,
                        userInterestOfUser: user
                    })
                    userInterest.save()



                }



            })


        })


    } catch (error) {
        console.log("errror in ui", error)

    }

};

exports.technology = (req, res, next) => {
    console.log("in")
    Technology.find()
        .then(technologies => { res.json(technologies) })
        .catch(err => {
            console.log(err);
        })
}

exports.personUserInterest = async (req, res, next) => {
    console.log("entered person ui")

    const user = req.user._id;

    UserInterest.findOne({ userInterestOfUser: user })
        .then(data => {
            console.log("entered person result 1",data);
            if (data) {
                console.log("entered if person",data.technologyId);
                let technologyids = data.technologyId;
                Technology.find({
                    '_id': { $in: technologyids }
                })
                    .then(result => {
                        console.log("entered person result");
                        res.json(result)
                    })
            }






        })
}

exports.technologyDelete = async (req, res, next) => {
    const user = req.user._id;
    console.log("req body", req.body.TechnologyId)
    const updatedInterest = await UserInterest.findOneAndUpdate({ userInterestOfUser: user }, { $pull: { technologyId: req.body.TechnologyId } })
    updatedInterest.save().then(data => {
        let technologyids = data.technologyId;
        Technology.find({
            '_id': { $in: technologyids }
        })
            .then(result => {
                console.log("result is", result)
                res.json(result)
            })


    })


}