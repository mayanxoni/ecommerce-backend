const express = require('express');
const route = express.Router();
const UserController = require('../controllers/user.controller');


/**
 * @description		Route for logging in
 * @method			POST /login
 * @param			'email', 'password'
 */
route.post('/login', UserController.login);


/**
 * @description		Route for registering
 * @method			POST /register
 * @param			'email', 'name', 'phone', 'password', 'confirm_password'
 */
route.post('/register', UserController.register);


module.exports = route;