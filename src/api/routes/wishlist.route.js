const express = require('express');
const route = express.Router();
const WishlistController = require('../controllers/wishlist.controller');


/**
 * @description		Fetch a wishlist
 * @method			GET /wishlist
 * @param			'id'
 */
route.get('/:id', WishlistController.get);


/**
 * @description		Create a wishlist
 * @method			POST /wishlist
 * @param			'id', 'productIds[]'
 */
route.post('/', WishlistController.new);

module.exports = route;