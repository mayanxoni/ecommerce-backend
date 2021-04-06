const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	phone: {
		type: Number,
		required: false
	},
	password: {
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

userSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: (doc, ret) => {
		delete ret._id
	}
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;