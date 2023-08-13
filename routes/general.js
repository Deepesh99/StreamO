const fs = require('fs');
const express = require('express');
const multer = require('multer');
const {videoUpload, videoDownload, videoSearch} = require('../controller/video');
// const {} = require('../controller/user');

const User = require('../model/user');

const router = express.Router();

// store video in local memory
// update this to store in cloud storage
const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
      const userid = req.headers.userid;
      console.log(userid);
      const user = await  User.findOne({_id: userid});
      const username = user.userName;
    //   dir = __dirname.replaceAll("\\", "/");;
    //   console.log(dir);
      const path =  './uploads/'+`${username}`+'/';
      if(!fs.existsSync(path)) {
          fs.mkdirSync(path);
      }
      return cb(null, path);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + req.originalname
      return cb(null, `${Date.now()}-${file.originalname}`);
    }
})

// this function is used to link the storage to function
const upload = multer({storage});
router.get('/video/:vid', videoDownload);
router.post('/video/upload', upload.single('video'), videoUpload);
router.get('/search', videoSearch);
// router.get('/', );

module.exports = router;