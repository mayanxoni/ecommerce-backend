require('dotenv').config();
const express = require('express');
const connectDB = require('./api/config/db.config');

const PORT = process.env.PORT || 3000;
const app = express();

// Connect MongoDB
connectDB();

// Bodyparser
app.use(express.urlencoded({
	extended: false
}));

// Routes
app.use('/api/user', require('./api/routes/user.route'));

app.listen(PORT, console.log(`App running on URL: http://localhost:${PORT}`));