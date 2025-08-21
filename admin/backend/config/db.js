const mongoose = require('mongoose');

const connectDB = async () => {
	const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ncr-farms';
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error('MongoDB connection error', err);
		throw err;
	}
};

module.exports = connectDB;
