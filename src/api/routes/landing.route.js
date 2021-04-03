const express = require('express');
const route = express.Router();
const LandingController = require('../controllers/landing.controller');

/**
 * 		@description	Route for landing page
 * 		@method			GET /api/
 */
route.get('/', LandingController.index);

module.exports = route;