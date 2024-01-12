/** @format */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/auth');
const infoRoutes = require('./routes/Products');
const dotenv = require('dotenv');
dotenv.config();
const { ConnectDB } = require('./db');
const axios = require('axios');
const schedule = require('node-schedule');
const mongoose = require('mongoose');
const listfollowers = require('./models/TwitterFollower');

const app = express();
const PORT = process.env.PORT;
const helmet = require('helmet');
const morgan = require('morgan');

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(helmet());

const test = async () => {
  console.log('API calling function started');
  console.log('Connected to the database');

  let cursor = null;

  try {
    do {
      const response = await axios.get(
        `https://api.socialdata.tools/twitter/followers/list?user_id=1598096447475515392${
          cursor ? `&cursor=${cursor}` : ''
        }`,
        {
          headers: {
            Authorization:
              'Bearer 33|EQOCo7XhoDOT1CAk7u4hmmGywKCJJIl532p25ff1d5285e3d',
          },
        }
      );

      const followers = response.data.users;
      console.log(followers);

      cursor = response.data.next_cursor;
      console.log(cursor);

      if (!cursor) {
        break;
      }

      for (const follower of followers) {
        const exist = await listfollowers.findOne({
          screen_name: follower.screen_name,
        });

        if (!exist) {
          const user = await listfollowers.info(
            follower.id,
            follower.name,
            follower.screen_name
          );
          console.log('User saved:', user);
        } else {
          console.log('User already exists:', exist);
        }

        // Introduce a delay of 1 second (adjust as needed)
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    } while (cursor);

    console.log('Data fetched and saved successfully.');
  } catch (error) {
    console.error('Error fetching and saving data:', error.message);
  }
};

// });

const index = async () => {
  try {
    await ConnectDB();

    schedule.scheduleJob('0 */4 * * *', async () => {
      await test();
    });
    app.use('/api/v2/auth', userRoutes);
    app.use('/api/v2/user', infoRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};
index();

// ConnectDB(() => {
// Call your test function here
// test();

// Set up your routes and start the server

// });
