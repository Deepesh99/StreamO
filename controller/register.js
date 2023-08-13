require('dotenv').config();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('../model/user');

exports.register = async (req, res) => {
  const { name, userName, email, password } = req.body;
  console.log(name);
  try {
    const userExist = await User.findOne({ userName });

    if (!userExist) {
      const config = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      };
      const transporter = nodemailer.createTransport(config);

      const message = {
        from: 'admin@streamo.com <deepesh99.nair@gmail.com>',
        to: 'deepesh99.nair@gmail.com',
        subject: 'Welcome to StreamO',
        text: 'Registration Complete',
        // html: "<b>Registration Complete</b>", // html body
      };
      transporter
        .sendMail(message)
        .then((info) => {
          console.log(info);
        })
        .catch((err) => {
          console.log(err);
        });

      const salt = await bcrypt.genSalt(11);
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.create({
        name,
        userName,
        email,
        password: hashedPassword,
      });
      return res
        .status(200)
        .json({ status: true, message: 'User created sucessfully' });
    }
    return res
      .status(401)
      .json({ status: false, message: 'User already exists please login' });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ status: false, message: 'Server Error' });
  }
};
