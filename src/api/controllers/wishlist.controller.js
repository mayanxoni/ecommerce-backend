const WishlistModel = require('../models/wishlist.model')
const ObjectId = require('mongodb').ObjectId;


// GET wishlist of a user
exports.get = (req, res) => {
	if (req.query.id) {
		const id = req.query.id;
		WishlistModel.findById(id)
			.then((list) => {
				if (!list) {
					return res.status(404).json({
						message: 'Sorry, wishlist not found!'
					});
				} else {
					return res.status(200).json({
						message: 'Wishlist found!',
						list
					});
				}
			})
			.catch(() => {
				return res.status(404).json({
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


// PUT product in a wishlist
exports.update = (req, res) => {
	const wishlistId = req.params.id;
	const productId = new ObjectId(req.body.productId);
	const ordered = req.body.ordered;

	const addProduct = {
		$push: {
			products: {
				_id: productId,
				ordered: ordered ?? false
			}
		}
	};

	const removeProduct = {
		$pull: {
			products: {
				_id: productId,
			}
		}
	};

	const options = {
		new: true,
		safe: true,
		upsert: true
	};

	const getProduct = {
		products: {
			$elemMatch: {
				_id: productId
			}
		}
	};

	WishlistModel.find(getProduct)
		.then((list) => {
			if (list.length) {
				// Remove product if it exists in the wishlist
				updateWishlist(wishlistId, removeProduct, options);
			} else {
				// Add product if it doesn't exist in the wishlist
				updateWishlist(wishlistId, addProduct, options);
			}
		})
		.catch((error) => {
			return res.status(400).json({
				error
			});
		});

	function updateWishlist(id, productParams, options) {
		WishlistModel.findByIdAndUpdate(id, productParams, options)
			.then((list) => {
				if (list) {
					return res.status(200).json({
						message: 'Operation succeeded!',
						list
					});
				} else {
					return res.status(400).json({
						message: 'Operation failed!'
					});
				}
			})
			.catch((error) => {
				return res.status(400).json({
					error
				});
			});
	}
}