const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../model/user');

require('dotenv').config();

// this function takes username and password from user and checks against databse.
// if the user exists and password is correct then genereate jwt token
exports.login = async (req, res) => {
  const { user, password } = req.body;
  console.log(typeof(user));
  console.log(req.body);
  try {
    const loggeduser = await User.findOne({ username: user });
    
    // this will check password with the password hash stored in databse
    const validUser = await bcrypt.compare(password, loggeduser.password);

    if (loggeduser && validUser) {
      // create jwt tokens
      // scret is used to create hash. TODO: encrypt secret
      const secret = process.env.JWTSECRET;

      // token will have userid and expire in 7days
      const token = jwt.sign({ userid: loggeduser._id }, secret, { expiresIn: '7 days' });
      return res.status(200).json({ status: true, message: 'Login Success!!', token });
    }

    return res.status(401).json({ status: false, message: 'Username or Password is incorrect' });
  } catch (err) {
    // console.log(err);
    return res.status(401).json({ status: false, message: 'Server Error' });
  }
};
