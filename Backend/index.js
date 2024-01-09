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
ConnectDB();
const app = express();
const PORT = process.env.PORT;
const helmet = require('helmet');
const morgan = require('morgan');
// add middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(helmet());
app.use('/api/v2/auth', userRoutes);
app.use('/api/v2/user', infoRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
