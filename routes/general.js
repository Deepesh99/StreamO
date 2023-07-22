const express = require('express');
const multer = require('multer');
const {videoUpload} = require('../controller/video');
// const {} = require('../controller/user');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    
      const path = './uploads/'+`${req.headers.username}`+'/'
      return cb(null, path);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + req.originalname
      return cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({storage});

router.post('/video/upload', upload.single('video'), videoUpload);
// router.get('/video', );
// router.get('/', );

module.exports = router;