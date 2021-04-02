const express = require('express');
const route = express.Router();
const UserController = require('../controllers/user.controller');


/**
 * @description		Route for registering
 * @method			POST /register
 */
route.post('/register', UserController.register);


module.exports = route;