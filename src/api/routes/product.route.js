const express = require('express');
const route = express.Router();
const ProductController = require('../controllers/product.controller');


/**
 * @description		Route for getting all the products
 * @method			GET /products{/?id}
 * @param			(optional) 'id' : For getting an individual product
 */
route.get('/', ProductController.index);


/**
 * @description		Route for getting all the products
 * @method			GET /products/new
 */
route.post('/new', ProductController.newProduct);


module.exports = route;