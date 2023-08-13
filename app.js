require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// import routes
const authRoutes = require('./routes/auth');
const generalRoutes = require('./routes/general');

// routing
app.use('/auth', authRoutes);
app.use('/user', generalRoutes);

app.listen(process.env.PORT);
