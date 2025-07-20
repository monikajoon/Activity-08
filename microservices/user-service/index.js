// user-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Loggging winston and morganMiddleware
const { logger, morganMiddleware } = require('./logger');

const app = express();
const PORT = 3002;
app.use(morganMiddleware);

logger.info('Connect MongoDB');
mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true });
const User = mongoose.model('User', { name: String, email: String });

app.use(bodyParser.json());

//Get call to fetch all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  logger.info('GET /users returned ' + users.length + ' records');
  res.json({ users });
});

//Get call to fetch user info for userId
app.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  logger.info('GET /users/:userId returned user Information');
  res.json({ user });
});

//Post call to add a user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({ name, email });
  await newUser.save();
  logger.info('POST /users saved a user');
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});

// Export the app for testing
module.exports = app;