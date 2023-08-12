const Video = require('../model/video');
const fs = require('fs');

// this function uploads video to local db and stores metadata to db
// toadd: more metadata to help search,
exports.videoUpload = async(req, res) => {
    const { title } = req.body;
    
    try {
        // insert video metadata to db
        await Video.create({title: title, url: req.file.path, userid: req.headers.userid});
        return res.status(200).json({ status: true, message: 'Video Uploaded' });
    }
    catch(err) {
        console.log(err);
    }
    
}

// this function will return the path of video to fronted(local path in this case)
// requires to give video._id from while calling assuming to be called from fronted
exports.videoDownload = async(req, res) => {
    const { vid } = req.params;
    console.log(__dirname);
    try {
        const requestedVideo = await Video.findOne({ _id: vid });
        const videoUrl = requestedVideo.url;
        return res.status(200).json({ videoUrl });
    }
    catch(err) {
        console.log(err);
        res.send(err);
    }
}

exports.videoSearch = async(req, res) => {
    let title = req.query.key;
    let page = (parseInt(req.query.page) ? parseInt(req.query.page) : 1);
    let limit = (parseInt(req.query.limit) ? parseInt(req.query.limit) : 10);
    console.log(page, limit);
    if(title === undefined || title === "") {
        return res.status(200).send("No result found!!");
    }
    let videoList = await Video.find({ title: { $regex: title, $options: 'i' } })
    console.log(videoList);
    res.send("VIdeo search resulkts here");
}