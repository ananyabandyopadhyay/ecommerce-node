const {default: mongoose} = require('mongoose');

const dbConnect = () => {
  try {
	const conn =  mongoose.connect(process.env.MONGO_URL);
	console.log('MongoDB connection successful');
  } catch (error) {
	console.log('MongoDB connection failed');
  }
}

module.exports = dbConnect;