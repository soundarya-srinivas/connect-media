const express = require('express')
const router = express.Router()
const protected = require('../middleware/auth')
const {signup , login , forgotpassword , resetpassword} = require('../controllers/auth')

router.route("/signup").post(signup);

router.get("/protected",protected,(req,res)=>{
    res.send("gained");
})

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword").post(resetpassword);

module.exports = router;