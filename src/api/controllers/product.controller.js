const ProductModel = require('../models/product.model');

exports.index = (req, res) => {
	if (req.query.id) {
		const id = req.query.id;
		ProductModel.findById(id)
		.then((data) => {
			if (!data) {
				return res.status(404).send({
					message: 'asdf' + error.message
				});
			} else {
				return res.send(data);
			}
		})
		.catch(() => {
			return res.status(404).send({
				message: 'This product does not exist!'
			});
		});
	} else {
		ProductModel.find()
		.then((data) => {
			if (data.length) {
				return res.status(200).send(data);
			} else {
				return res.status(200).json({
					message: 'Currently no products are available in the store!'
				});
			}
		})
		.catch((error) => {
			return res.status(500).send({
				message: error.message
			});
		});
	}
}

exports.newProduct = (req, res) => {
	const { name, image, description, price, featured } = req.body;

	if (!name || !image || !description || !price || !featured) {
		return res.status(400).json({
			message: 'All the fields are required!'
		});
	}

	const newProduct = new ProductModel({
		name,
		image,
		description,
		price,
		featured
	});

	newProduct.save()
	.then(() => {
		return res.status(200).json({
			message: 'Product added to the store'
		});
	})
	.catch((error) => {
		return res.status(400).json({
			message: error
		});
	});
}