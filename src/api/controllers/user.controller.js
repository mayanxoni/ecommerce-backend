const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const emailRegEx = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/i;

// Login method
exports.signin = (req, res, next) => {
	const { email, password } = req.body;
	const validateEmail = emailRegEx.test(email);

	if (!email || !password) {
		return res.status(400).json({
			message: 'All the fields are required!'
		});
	}

	if (!validateEmail) {
		return res.status(400).json({
			message: 'Please use a valid email address!'
		});
	}

	passport.authenticate('local', (error, user, info) => {
		if (error) {
			return res.status(400).json({
				message: error
			});
		}

		if (!user) {
			return res.status(400).json({
				message: info.message
			});
		}

		req.logIn(user, function (error) {
			if (error) {
				return res.status(400).json({
					message: error
				});
			}

			return res.status(200).json({
				message: info.message,
				user
			});
		});
	})(req, res, next);
}

// POST a new user
exports.signup = (req, res) => {
	// const { name, email, phone, password, confirm_password } = req.body;
	const { name, email, phone, password } = req.body;
	const validateEmail = emailRegEx.test(email);

	// if (!name || !email || !phone || !password || !confirm_password) {
	if (!name || !email || !password) {
		return res.status(400).json({
			message: 'All the fields are required!'
		});
	}

	if (!validateEmail) {
		return res.status(400).json({
			message: 'Please use a valid email address!'
		});
	}

	if (password.length < 6) {
		return res.status(400).json({
			message: 'Password should consist of minimum 6 characters!'
		})
	}

	/* if (password != confirm_password) {
		return res.status(400).json({
			message: 'Passwords don\'t match'
		});
	} */

	UserModel.findOne({ email })
		.then((user) => {
			if (user) {
				return res.status(400).json({
					message: 'User with this email address already exists!'
				});
			} else {
				const newUser = new UserModel({
					name,
					email,
					password
				});

				bcrypt.genSalt(10, (error, salt) => {
					bcrypt.hash(newUser.password, salt, (error, hash) => {
						if (error) {
							return res.status(400).json({
								message: error
							});
						}
						newUser.password = hash;
						newUser.save()
							.then((user) => {
								req.flash('success_msg', 'You are now registered!');
								return res.status(200).json({
									message: 'New user added!',
									user
								});
							})
							.catch((error) => {
								return res.status(500).json({
									message: 'Error occured while adding user!',
									error
								});
							});
					});
				});
			}
		})
		.catch((error) => {
			console.error(error);
		});
}

// PUT updated details of a user
exports.update = (req, res) => {
	const id = req.params.id;
	const newDetails = req.body;
	const options = { new: true };

	if (newDetails.email) {
		return res.status(400).json({
			message: 'Sorry, you can\'t change your email address!'
		});
	}

	if (newDetails.password) {
		return res.status(400).json({
			message: 'Sorry, you can\'t change your password!'
		});
	}

	UserModel.findByIdAndUpdate(id, newDetails, options)
		.then((response) => {
			if (response) {
				return res.status(200).json({
					message: 'User details updated successfully!'
				});
			} else {
				return res.status(400).json({
					message: 'Failed to update user details!'
				});
			}
		})
		.catch((error) => {
			return res.status(400).json({
				error
			});
		});
}

// DELETE a user
exports.delete = (req, res) => {
	const id = req.params.id;
	UserModel.findByIdAndDelete(id)
		.then((response) => {
			if (response) {
				return res.status(200).json({
					message: 'User deleted successfully!'
				});
			} else {
				return res.status(404).json({
					message: 'User does not exist!'
				});
			}
		})
		.catch((error) => {
			return res.status(400).json({
				message: error
			});
		});
}

// GET details of a user
exports.get = (req, res) => {
	const id = req.params.id;
	UserModel.findById(id)
		.then((response) => {
			return res.status(200).json({
				response
			});
		})
		.catch((error) => {
			return res.status(400).json({
				message: error
			});
		});
}