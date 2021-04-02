const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');

const emailRegEx = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/i;

exports.register = (req, res) => {
	const { name, email, phone, password, confirm_password } = req.body;
	const validateEmail = emailRegEx.test(email);
	
	if (!name || !email || !phone || !password || !confirm_password) {
		res.status(400).json({
			message: 'All the fields are required!'
		});
	}

	if (!validateEmail) {
		res.status(400).json({
			message: 'Please use a valid email address!'
		});
	}

	if (password.length < 6) {
		res.status(400).json({
			message: 'Password should consist of minimum 6 characters!'
		})
	}

	if (password != confirm_password) {
		res.status(400).json({
			message: 'Passwords don\'t match'
		});
	}

	UserModel.findOne({
		email
	}).then((user) => {
		if (user) {
			res.status(400).json({
				message: 'User with this email address already exists!'
			});
		} else {
			const newUser = new UserModel({
				name,
				email,
				phone,
				password
			});

			bcrypt.genSalt(10, (error, salt) => {
				bcrypt.hash(newUser.password, salt, (error, hash) => {
					if (error) {
						throw error;
					}
					newUser.password = hash;
					newUser.save().then((user) => {
						res.status(200).json({
							message: 'New user added!'
						});
					}).catch((error) => {
						res.status(500).json({
							message: 'Error occured while adding user!',
							error
						});
					});
				});
			});
		}
	}).catch((error) => {
		console.error(error);
	});
}