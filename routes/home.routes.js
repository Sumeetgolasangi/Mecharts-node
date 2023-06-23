const express = require('express');
const HomeController = require('../controllers/home.controller')
const { addUserDetails } = require('../middlewares/auth');
const router = express.Router();

router.route('/').get(HomeController.Users);
router.route('/createuser').post(HomeController.createUsers)

module.exports = router;
