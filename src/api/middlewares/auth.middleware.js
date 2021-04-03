const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const UserModel = require('../models/user.model');

module.exports = (passport) => {
	passport.use(
		new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
			UserModel.findOne({ email })
			.then((user) => {
				if (!user) {
					return done(null, false, { message: 'No user found with that email!' });
				}

				bcrypt.compare(password, user.password, (error, isMatch) => {
					if (error) {
						return res.status(400).json({
							message: error
						});
					}

					if (isMatch) {
						return done(null, user, { message: 'Logged in successfully!' });
					} else {
						return done(null, false, { message: 'Incorrect password!' });
					}
				});
			})
			.catch((error) => {
				return res.status(400).json({
					message: error
				});
			});
		})
	);
}