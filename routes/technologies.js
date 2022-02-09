const express = require('express');
const { stream, technology,showTechnology,TechnologyName } = require('../controllers/technologies');
const router = express.Router()
const protected = require('../middleware/auth')

router.route("/stream").post(stream);
router.route("/technology").post(technology);
router.route("/showTechnology").get(protected,showTechnology);
router.route("/TechnologyName/:technologyId").get(protected,TechnologyName);

module.exports=router;