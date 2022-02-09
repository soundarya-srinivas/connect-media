const express = require('express')
const router = express.Router()
const protected = require('../middleware/auth')
const {userInterest,technology,personUserInterest,technologyDelete} = require('../controllers/userInterest')

router.route("/userInterest/:ids").post(protected,userInterest);
router.route("/technology").get(protected,technology);
router.route("/personUserInterest").get(protected,personUserInterest);
router.route("/technologyDelete").put(protected,technologyDelete);


module.exports=router;