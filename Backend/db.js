/** @format */

const mongoose = require('mongoose');
require('dotenv').config();
const ConnectDB = async (callback) => {
  try {
    const dbURI = process.env.MONGO_URL;
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to the database');
    const db = mongoose.connection;
    db.on('error', (error) =>
      console.error('MongoDB connection error:', error)
    );
    db.once('open', () => {
      console.log('MongoDB connected successfully');
      callback();
    });
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

module.exports = { ConnectDB };
