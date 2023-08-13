const mongoose = require('mongoose');

// create connection to database
mongoose.connect('mongodb://localhost:27017/streamo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// check if connection to db is success
db.once('open', () => {
  console.log('Connection Successful');
});

// if db connection throws error
db.on('error', () => {
  console.log('Error in mongodb connection');
});
