const express = require('express');
const UserController = require('../controllers/user.controller')
const { addUserDetails } = require('../middlewares/auth');
const router = express.Router();

router.route('/login').post(UserController.checkUser);
router.route('/createuser').post(UserController.createUsers)

module.exports = router;
