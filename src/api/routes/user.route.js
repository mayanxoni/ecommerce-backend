const express = require('express');
const route = express.Router();
const UserController = require('../controllers/user.controller');


/**
 * @description		Log a user in
 * @method			POST /user/login
 * @param			'email', 'password'
 */
route.post('/login', UserController.login);


/**
 * @description		Add a new user
 * @method			POST /user/register
 * @param			'email', 'name', 'phone', 'password', 'confirm_password'
 */
route.post('/register', UserController.register);


/**
 * @description		Update user details
 * @method			PUT /user/id
 * @param			'id'
 */
route.put('/:id', UserController.update);


/**
 * @description		Delete a user
 * @method			DELETE /user/id
 * @param			'id'
 */
route.delete('/:id', UserController.delete);


/**
* @description		Get details of a user
* @method			GET /user/id
* @param			'id'
*/
route.get('/:id', UserController.get);

module.exports = route;