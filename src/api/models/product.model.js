const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	featured: {
		type: Boolean,
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

const ProductModel = mongoose.model('product', productSchema);

module.exports = ProductModel;