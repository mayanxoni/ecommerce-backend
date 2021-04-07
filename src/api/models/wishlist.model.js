const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId, ref: 'products',
	},
	ordered: {
		type: Boolean,
		default: false
	}
});

const wishlistSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId, ref: 'users',
	},
	products: [productSchema]
});

productSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: (doc, ret) => {
		delete ret._id
	}
});

wishlistSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: (doc, ret) => {
		delete ret._id
	}
});

const WishlistModel = mongoose.model('wishlist', wishlistSchema);

module.exports = WishlistModel;