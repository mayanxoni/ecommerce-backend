const express = require('express');
const route = express.Router();
const WishlistController = require('../controllers/wishlist.controller');


/**
 * @description		Fetch a wishlist
 * @method			GET /wishlist
 * @param			'id'
 */
route.get('/', WishlistController.get);


/**
 * @description		Create a wishlist
 * @method			POST /wishlist/id
 * @param			'id', 'productId'
 */
route.put('/:id', WishlistController.update);

module.exports = route;