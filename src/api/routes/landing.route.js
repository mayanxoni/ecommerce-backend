const express = require('express');
const router = express.Router();
const LandingController = require('../controllers/landing.controller');

/**
 * 		@description	Route for landing page
 * 		@method			GET /api/
 */
router.get('/', LandingController.index);

module.exports = router;