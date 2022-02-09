const mongoose = require('mongoose');
const Stream = mongoose.model('Stream')
const QuestionModel = mongoose.model('Question')
const Technology = mongoose.model('Technology')
const UserInterest = mongoose.model('UserInterest')
// const ErrorResponse = require('../utils/errorResponse')
// const sendEmail = require('../utils/sendEmail')

exports.allQuestions = (req, res, next) => {
    QuestionModel.find()
        .populate('postedby', "_id name profilePicture updatedAt")
        .populate('Answers.postedby', '_id name profilePicture updatedAt')
        .then(result => res.json(result))
}

exports.userInterestQuestion = (req, res, next) => {
    UserInterest.find({ userInterestOfUser: req.user._id })
        .then(result => {
            if (result.length !== 0) {
                console.log('result from ui', result)
                const ids = result[0].technologyId;

                QuestionModel.find({ technologyid: ids })
                    .populate('postedby', "_id name profilePicture updatedAt")
                    .populate('Answers.postedby', '_id name profilePicture updatedAt')
                    .then(resultedData => {
                        res.json(resultedData)
                    })
            }

        })

}


exports.postQuestion = (req, res, next) => {

    const user = req.user;
    const QuestionPosted = req.body.question;
    const QuestionImage = req.body.questionImage;

    const Technologyid = req.body.technologyId;


    QuestionModel.findOne({ Question: QuestionPosted }, function (err, result) {

        if (err) {
            console.log("err", err)
        }
        if (!result) {

            const postQuestion = new QuestionModel({
                Question: QuestionPosted,
                QuestionImage: QuestionImage,
                postedby: user,
                technologyid: Technologyid
            })

            postQuestion.save().then(result => {
                res.json("Your question has been posted successfully")
            })
        }
        if (result) {
            res.json("question already exists")
        }
    })



}


exports.specificQuestion = (req, res, next) => {
    console.log("qId", req.params.questionId)
    QuestionModel.findById(req.params.questionId)
        .populate('postedby', "_id name profilePicture updatedAt")
        .populate('Answers.postedby', '_id name profilePicture updatedAt')
        .then(result => res.json(result))
}


exports.myQuestions = (req, res, next) => {
    console.log("my ques");
    QuestionModel.find({ postedby: req.user._id })
        .populate('postedby', "_id name profilePicture updatedAt")
        .populate('Answers.postedby', '_id name profilePicture updatedAt')
        .then(result => {
            console.log(result)
            res.json(result)
        })
}


exports.myAnswers = (req, res, next) => {
    console.log("my answers")
    QuestionModel.find({ "Answers.postedby": req.user._id })
        .populate('postedby', "_id name profilePicture updatedAt")
        .populate('Answers.postedby', '_id name profilePicture updatedAt')
        .then(result => res.json(result))
}

exports.UsersQuestions = (req, res, next) => {
    console.log("my ques");
    QuestionModel.find({ postedby: req.params.userid })
        .populate('postedby', "_id name profilePicture updatedAt")
        .populate('Answers.postedby', '_id name profilePicture updatedAt')
        .then(result => {
            console.log(result)
            res.json(result)
        })
}

exports.UsersAnswers = (req, res, next) => {
    console.log("my answers")
    QuestionModel.find({ "Answers.postedby": req.params.userid })
        .populate('postedby', "_id name profilePicture updatedAt")
        .populate('Answers.postedby', '_id name profilePicture updatedAt')
        .then(result => res.json(result))
}


exports.deleteQuestion = (req, res, next) => {
    console.log("ques del id", req.params.QuestionId)
    QuestionModel.findOne({ _id: req.params.QuestionId })
        .populate('postedby', "_id name profilePicture updatedAt")
        .populate('Answers.postedby', '_id name profilePicture updatedAt')
        .exec((err, question) => {
            if (err || !question) {
                return res.status(422).json({ error: err })
            }
            if (question.postedby._id.toString() === req.user._id.toString()) {
                question.remove()

                    .then(result => {
                        res.json(result)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })

}


exports.deleteAnswer = (req, res, next) => {
    console.log("answerid", req.body.answerid);
    console.log("questionid", req.body.questionid);
    QuestionModel.findByIdAndUpdate(req.body.questionid, {

        $pull: { Answers: { _id: req.body.answerid } }

    }, {
        new: true
    })
        .populate('Answers.postedby', '_id name profilePicture updatedAt')
        .then(result => {
            console.log("res", result)
            res.json(result)
        })

}


exports.verifyAnswer = (req, res, next) => {
    const user = (req.user._id);
    console.log("answerid", req.body.answerid);
    console.log("quesid", req.body.questionid);
    QuestionModel.findOneAndUpdate({ _id: req.body.questionid, "Answers._id": req.body.answerid },
        {
            $set: { "Answers.$.verified": true }
        }, {
        new: true
    }
    )
        .populate('postedby', "_id name profilePicture updatedAt")
        .populate('Answers.postedby', '_id name profilePicture updatedAt')
        .then(result => {
            res.json(result)
        })
}

exports.changeVerifiedAnswer = (req, res, next) => {
    const user = (req.user._id);
    console.log("answerid ch", req.body.answerid);
    console.log("quesid ch", req.body.questionid);
    QuestionModel.findOneAndUpdate({ _id: req.body.questionid, "Answers._id": req.body.answerid },
        {
            $set: { "Answers.$.verified": false }
        }, {
        new: true
    }
    )
        .populate('postedby', "_id name profilePicture updatedAt")
        .populate('Answers.postedby', '_id name profilePicture updatedAt')
        .then(result => {
            res.json(result)
        })
}


exports.likeQuestion = (req, res, next) => {
    console.log("quesid", req.body.questionid);
    const user = (req.user._id);
    QuestionModel.findByIdAndUpdate({ _id: req.body.questionid },
        {
            $push: { likes: user },
            $pull: { unlikes: user }
        }, {
        new: true
    })
        .populate('postedby', "_id name profilePicture updatedAt")
        .populate('Answers.postedby', '_id name profilePicture updatedAt')
        .then(result => {
            console.log("res", result)
            res.json(result)
        })

}


exports.dislikeQuestion = (req, res, next) => {
    console.log("quesid", req.body.questionid);
    const user = (req.user._id);
    QuestionModel.findOneAndUpdate({ _id: req.body.questionid },
        {
            $pull: { likes: user },
            $push: { unlikes: user }
        }, {
        new: true
    })
        .populate('postedby', "_id name profilePicture updatedAt")
        .populate('Answers.postedby', '_id name profilePicture updatedAt')
        .then(result => {
            console.log("res", result)



            res.json(result)
        })
}


exports.likeAnswer = (req, res, next) => {
    console.log("answerid", req.body.answerid);
    console.log("questionid", req.body.questionid);
    const user = (req.user._id);
    console.log("userid", user);
    QuestionModel.findOneAndUpdate({ _id: req.body.questionid, "Answers._id": req.body.answerid },
        {
            $push: { "Answers.$.likes": user },
            $pull: { "Answers.$.unlikes": user }
        }, {
        new: true
    }
    )
        .populate('Answers.postedby', '_id name profilePicture updatedAt')
        .then(result => {
            console.log("res", result)



            res.json(result)
        })
}


exports.dislikeAnswer = (req, res, next) => {
    console.log("answerid", req.body.answerid);
    console.log("questionid", req.body.questionid);
    const user = (req.user._id);
    console.log("userid", user);
    QuestionModel.findOneAndUpdate({ _id: req.body.questionid, "Answers._id": req.body.answerid },
        {
            $push: { "Answers.$.unlikes": user },
            $pull: { "Answers.$.likes": user }
        }, {
        new: true
    }
    )
        .populate('Answers.postedby', '_id name profilePicture updatedAt')
        .then(result => {
            console.log("res", result)



            res.json(result)
        })
}


exports.postAnswer = async (req, res, next) => {
    console.log("answerimagw", req.body.answerimage);
    console.log("answer", req.body.technologyId);
    console.log("questionid", req.body.questionId);
    await QuestionModel.findByIdAndUpdate(req.body.questionId, {
        $push: {
            "Answers": [{
                text: req.body.answer,
                postedby: req.user,
                technologyid: req.body.technologyId,
                AnswerImage: req.body.answerimage
            }]
        }
    }, {
        new: true
    }).populate('Answers.postedby', '_id name profilePicture updatedAt').then(result => res.json(result))

}

exports.SpecificTechnologyQuestions = (req, res, next) => {

    QuestionModel.find({ "technologyid": req.params.technologyId })
        .populate('postedby', "_id name profilePicture updatedAt")
        .populate('Answers.postedby', '_id name profilePicture updatedAt')
        .populate('technologyid', "Technology")
        .then(result => res.json(result))
}
