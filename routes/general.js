const fs = require('fs');
const express = require('express');
const multer = require('multer');
const {
  videoUpload,
  videoDownload,
  videoSearch,
} = require('../controller/video');
// const {} = require('../controller/user');

const User = require('../model/user');

const router = express.Router();

// store video in local memory
// update this to store in cloud storage
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const { userid } = req.headers.userid;
    const user = await User.findOne({ _id: userid });
    const path = `./uploads/${user.userName}/`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    return cb(null, path);
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

// this function is used to link the storage to function
const upload = multer({ storage });
router.get('/video/:vid', videoDownload);
router.post('/video/upload', upload.single('video'), videoUpload);
router.get('/search', videoSearch);
// router.get('/', );

module.exports = router;
