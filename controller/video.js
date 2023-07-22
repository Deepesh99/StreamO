exports.videoUpload = async(req, res) => {
    // const { title } = req.body;
    console.log(req.file);

    return res.status(200).json({ status: true, message: 'Video Uploaded' });
}

exports.video = async(req, res) => {

}