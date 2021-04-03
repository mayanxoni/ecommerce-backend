const UserModel = require('../models/user.model');

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		return done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		UserModel.findById(id, (error, user) => {
			return done(error, user);
		});
	});
}