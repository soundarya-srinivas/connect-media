const express = require('express')
const router = express.Router()
const protected = require('../middleware/auth')
const {userInterestQuestion,changeVerifiedAnswer,UsersAnswers,UsersQuestions,SpecificTechnologyQuestions,specificQuestion,allQuestions,stream,technology,postQuestion,myQuestions,myAnswers,deleteQuestion,deleteAnswer,verifyAnswer,likeQuestion,dislikeQuestion,likeAnswer,dislikeAnswer,postAnswer} = require('../controllers/Question')

router.route("/userInterestQuestion").get(protected,userInterestQuestion);

router.route("/postQuestion").post(protected,postQuestion);

router.route("/allQuestions").get(protected,allQuestions);

router.route("/specificQuestion/:questionId").get(protected,specificQuestion);

router.route("/myQuestions").get(protected,myQuestions);

router.route("/myAnswers").get(protected,myAnswers);

router.route("/UsersQuestions/:userid").get(protected,UsersQuestions);

router.route("/UsersAnswers/:userid").get(protected,UsersAnswers);

router.route("/deleteQuestion/:QuestionId").delete(protected,deleteQuestion);

router.route("/deleteAnswer").put(protected,deleteAnswer);

router.route("/verifyAnswer").put(protected,verifyAnswer);

router.route("/changeVerifiedAnswer").put(protected,changeVerifiedAnswer);

router.route("/likeQuestion").put(protected,likeQuestion);

router.route("/dislikeQuestion").put(protected,dislikeQuestion);

router.route("/likeAnswer").put(protected,likeAnswer);

router.route("/dislikeAnswer").put(protected,dislikeAnswer);

router.route("/postAnswer").post(protected,postAnswer);

router.route("/SpecificTechnologyQuestions/:technologyId").get(protected,SpecificTechnologyQuestions);




module.exports=router;


