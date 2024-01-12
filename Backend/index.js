// /** @format */

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const userRoutes = require('./routes/auth');
// const infoRoutes = require('./routes/Products');
// const dotenv = require('dotenv');
// dotenv.config();
// const { ConnectDB } = require('./db');
// ConnectDB();
// const app = express();
// const PORT = process.env.PORT;
// const helmet = require('helmet');
// const morgan = require('morgan');
// // add middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(morgan('common'));
// app.use(helmet());
// app.use('/api/v2/auth', userRoutes);
// app.use('/api/v2/user', infoRoutes);
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const userRoutes = require("./routes/auth");
const infoRoutes = require("./routes/Products");
const dotenv = require("dotenv");
dotenv.config();
const { ConnectDB } = require("./db");
const axios = require("axios");
const schedule = require("node-schedule");
const mongoose = require("mongoose");

ConnectDB();

const app = express();
const PORT = process.env.PORT;
const helmet = require("helmet");
const morgan = require("morgan");

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("common"));
app.use(helmet());

const TwitterFollower = require("./models/TwitterFollower"); // Assuming you have a User model

// schedule.scheduleJob("0 */12 * * *", async () => {
const test = async () => {
  console.log("API calling function started");
  try {
    let cursor = null;
    // do {

    const response = await axios.get(
      `https://api.socialdata.tools/twitter/followers/list?user_id=1598096447475515392${
        cursor ? `&cursor=${cursor}` : ""
      }`,
      {
        headers: {
          Authorization:
            "Bearer 33|EQOCo7XhoDOT1CAk7u4hmmGywKCJJIl532p25ff1d5285e3d",
        },
      }
    );

    const followers = response.data.users;
    console.log(followers);

    cursor = response.data.next_cursor;
    console.log(cursor);
    // } while (cursor);

    console.log("Data fetched and saved successfully.");
  } catch (error) {
    console.error("Error fetching and saving data:", error.message);
  }
};
// });

test();

app.use("/api/v2/auth", userRoutes);
app.use("/api/v2/user", infoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
