const mongoose = require("mongoose");
require("dotenv").config();
const ConnectDB = async () => {
  try {
    // Replace 'mongodb://localhost/your-database-name' with your actual MongoDB URI
    const dbURI = process.env.MONGO_URL;

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

module.exports = { ConnectDB };
