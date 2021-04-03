const express = require('express');
const route = express.Router();
const LandingController = require('../controllers/landing.controller');

/**
 * 		@description	Route for landing page
 * 		@method			GET /api/
 */
route.get('/1', LandingController.index1);
route.get('/2', LandingController.index2);

module.exports = route;