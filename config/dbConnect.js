const {default: mongoose} = require('mongoose');

const dbConnect = () => {
  try {
	const conn =  mongoose.connect("mongodb://localhost:27017/myLocalDB");
	console.log('MongoDB connection successful');
  } catch (error) {
	console.log('MongoDB connection failed');
  }
}

module.exports = dbConnect;