const mongoose = require('mongoose');

const connectDB = () => {
	mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	}).then((success) => {
		console.log(`MongoDB connected to cluster: ${success.connection.host}`);
	}).catch((error) => {
		console.error(`MongoDB connection failed! ${error}`);
	});
}

module.exports = connectDB;