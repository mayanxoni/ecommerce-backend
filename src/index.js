require('dotenv').config();
const express = require('express');
const connectDB = require('./api/config/db.config');
const cors = require('cors');
const authMiddleware = require('./api/middlewares/auth.middleware');
const morgan = require('morgan')

const PORT = process.env.PORT || 8000;
const app = express();

// Connect MongoDB
connectDB();

// Bodyparser
app.use(express.urlencoded({
	extended: false
}));

// Logging
app.use(morgan(
	(tokens, req, res) =>  {
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, 'content-length'), '-',
			tokens['response-time'](req, res), 'ms'
		].join(' ');
	}
));

// CORS
app.use(cors());

// Routes
app.use('/api/landing', require('./api/routes/landing.route'));
app.use('/api/user', require('./api/routes/user.route'));
app.use('/api/products', require('./api/routes/product.route'));
app.use('/api/wishlist', authMiddleware,  require('./api/routes/wishlist.route'));

app.listen(PORT, console.log(`Server running on URL: http://localhost:${PORT}`));