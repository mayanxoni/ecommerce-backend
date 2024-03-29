const ProductModel = require('../models/product.model');
const faker = require('faker');

// GET all the products
exports.index = (req, res) => {
	if (req.query.id) {
		const id = req.query.id;
		ProductModel.findById(id)
			.then((data) => {
				if (!data) {
					return res.status(404).send({
						message: 'Sorry, product not found!'
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

// POST a new product
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

// PUT updated details of a product
exports.updateProduct = (req, res) => {
	const id = req.params.id;
	const newDetails = req.body;
	const options = { new: true };

	ProductModel.findByIdAndUpdate(id, newDetails, options)
		.then((response) => {
			if (response) {
				return res.status(200).json({
					message: 'Product updated successfully',
					product: response
				});
			} else {
				return res.status(404).json({
					message: 'Product not found!'
				});
			}
		})
		.catch((error) => {
			return res.status(400).json({
				error
			});
		});
}

// DELETE a product
exports.deleteProduct = (req, res) => {
	const id = req.params.id;

	ProductModel.findByIdAndDelete(id)
		.then((response) => {
			if (response) {
				return res.status(200).json({
					message: 'Product deleted successfully!'
				});
			} else {
				return res.status(404).json({
					message: 'Product does not exist!'
				});
			}
		})
		.catch((error) => {
			return res.status(400).json({
				error
			});
		});
}

// Seed products into collection
exports.seed = (req, res) => {
	let i = 0;
	let products = [];
	while (i < 10) {
		products.push({
			sku_id: faker.finance.iban(),
			name: faker.commerce.productName(),
			image: faker.image.image(),
			description: faker.commerce.productDescription(),
			price: faker.commerce.price(),
			featured: faker.datatype.boolean()
		});
		i++;
	}
	ProductModel.insertMany(products)
		.then(() => {
			return res.status(200).json({
				message: 'Products seeded successfully! Want more? Request again...',
			});
		})
		.catch((error) => {
			return res.status(400).json({
				error
			});
		});
}