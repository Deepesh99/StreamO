const mongoose = require('mongoose');


const User = require('../model/user');
// const Product = require('../model/product');

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

/*
// seeder to seed demo user login data into database
const seedUser = [{
  username: 'mor_2314',
  password: '$2a$10$z1CTW3ydj0IfXlPaagWRt.z1FA6moCnE5DoZbPuQE0hh3glQFddz2',
}];

// seeder function that will run with npm start
// everytime existing data is deleted and new data is stored.
const seedDB = async () => {
  await User.deleteMany({});
  await User.insertMany(seedUser);
};

seedDB();
module.exports = mongoose;
*/