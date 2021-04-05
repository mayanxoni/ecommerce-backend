const WishlistModel = require('../models/wishlist.model')


// GET wishlist created by a user
exports.get = (req, res) => {
	if (req.query.id) {
		const id = req.query.id;
		WishlistModel.findById(id)
			.then((data) => {
				if (!data) {
					return res.status(404).send({
						message: 'Sorry, wishlist not found!'
					});
				} else {
					return res.send(data);
				}
			})
			.catch(() => {
				return res.status(404).send({
					message: 'This wishlist does not exist!'
				});
			});
	} else {
		WishlistModel.find()
			.then((data) => {
				if (data.length) {
					return res.status(200).send(data);
				} else {
					return res.status(200).json({
						message: 'Currently no wishlists are available for the user!'
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


// POST a new wishlist
exports.new = (req, res) => {
	const id = req.body.id;
	const productIds = req.body.productIds;
	const wishlist = new WishlistModel({
		_id: id,
		products: [{
			_id: productIds
		}]
	});
	/* const wishlist = new WishlistModel({
		_id: "606ac1c1c05e9014f1ea6bf4",
		products: [{
			_id: "606ab55ec4510b0f02adaaaa"
		}]
	}); */
	wishlist.save()
		.then((list) => {
			return res.status(200).json({
				message: 'Wishlist created!',
				list
			});
		})
		.catch((error) => {
			return res.status(400).json({
				message: error
			});
		});
}