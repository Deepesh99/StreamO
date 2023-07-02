const bcrypt = require('bcrypt');
const User = require('../model/user');

exports.register = async (req, res) => {
  const { name, userName, email, password  } = req.body;
  console.log(name);
  try {
    const userExist = await User.findOne({userName})

    if(!userExist) {
        const salt = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({name: name, userName: userName, email: email, password: hashedPassword});
        return res.status(200).json({ status: true, message: 'User created sucessfully'});
    }
    return res.status(401).json({ status: false, message: 'User already exists please login' });
  } catch (err) {
      console.log(err);
    return res.status(401).json({ status: false, message: 'Server Error' });
  }
};
  