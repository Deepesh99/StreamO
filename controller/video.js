const Video = require('../model/video');

exports.videoUpload = async(req, res) => {
    const { title } = req.body;
    
    try {
        await Video.create({title: title, url: req.file.path, userid: req.headers.userid});
        return res.status(200).json({ status: true, message: 'Video Uploaded' });
    }
    catch(err) {
        console.log(err);
    }
    
}

exports.video = async(req, res) => {

}