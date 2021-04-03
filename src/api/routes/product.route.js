const express = require('express');
const route = express.Router();
const ProductController = require('../controllers/product.controller');


/**
 * @description		Route for getting all the products
 * @method			GET /products{/?id=PRODUCT_ID}
 * @param			(optional) 'PRODUCT_ID' : For getting an individual product
 */
route.get('/', ProductController.index);


/**
 * @description		Route for getting all the products
 * @method			GET /products/new
 * @param			'name', 'image', 'description', 'price', 'featured'
 */
route.post('/new', ProductController.newProduct);


module.exports = route;