const express = require('express');
const route = express.Router();
const ProductController = require('../controllers/product.controller');


/**
 * @description		Get all the products
 * @method			GET /products{/?id=PRODUCT_ID}
 * @param			(optional) 'id' : For getting an individual product
 */
route.get('/', ProductController.index);


/**
 * @description		Add a new product
 * @method			POST /products
 * @param			'name', 'image', 'description', 'price', 'featured'
 */
route.post('/', ProductController.newProduct);


/**
 * @description		Update a product
 * @method			PUT /products/id
 * @param			'id'
 */
route.put('/:id', ProductController.updateProduct);


/**
 * @description		Delete a product
 * @method			DELETE /products/id
 * @param			'id'
 */
route.delete('/:id', ProductController.deleteProduct);


/**
 * @description		Seed products collection with more documents
 * @method			GET /products/seed
 */
route.get('/seed', ProductController.seed);

module.exports = route;