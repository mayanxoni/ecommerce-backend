require('dotenv').config();
const express = require('express');
const connectDB = require('./api/config/db.config');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const PORT = process.env.PORT || 3000;
const app = express();

// Passport config
require('./api/config/passport.config')(passport);

// Connect MongoDB
connectDB();

// Bodyparser
app.use(express.urlencoded({
	extended: false
}));

// Express session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// Connect flash
app.use(flash());

// Set flash messages
app.use((req, res, next) => {
	res.locals.success_msg=req.flash('success_msg');
	res.locals.error_msg=req.flash('error_msg');
	res.locals.error=req.flash('error');
	next();
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/landing', require('./api/routes/landing.route'));
app.use('/api/user', require('./api/routes/user.route'));
app.use('/api/products', require('./api/routes/product.route'));

app.listen(PORT, console.log(`Server running on URL: http://localhost:${PORT}`));