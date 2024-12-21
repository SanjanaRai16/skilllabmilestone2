const mongoose = require('mongoose');

mongoose.set('strictQuery', false);  // Add this line

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // Remove deprecated options
    });
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message);
    process.exit(1);  // Exit process on connection failure
  }
};

module.exports = connectDB;
