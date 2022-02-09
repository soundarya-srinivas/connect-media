const express = require('express');
const { profilePicUpdate ,UsersProfile,followUser,unfollowUser,myProfile} = require('../controllers/userProfile');
const router = express.Router()
const protected = require('../middleware/auth')

router.route("/profilePicUpdate").put(protected,profilePicUpdate);
router.route("/UsersProfile/:userid").get(protected,UsersProfile);
router.route("/myProfile").get(protected,myProfile);
router.route("/followUser").put(protected,followUser);
router.route("/unfollowUser").put(protected,unfollowUser);




module.exports=router;