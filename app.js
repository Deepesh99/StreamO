const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const db = require('../StreamO/utils/db');
require('dotenv').config();
const app = express();

// import routes
const authRoutes = require('./routes/auth');
const generalRoutes = require('./routes/general');
app.use(bodyParser.json());
app.use( express.urlencoded({ extended: false}));
// routing
app.use('/auth', authRoutes);
app.use('/user', generalRoutes);
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

// app.get('/videoplayer', (req, res) => {
//     const range = req.headers.range;
//     const videoPath = './video.mp4';
//     const videoSize = fs.statSync(videoPath).size;
//     const chunkSize = 1 * 1e6;
//     const start = Number(range.replace(/\D/g, ""));
//     const end = Math.min(start + chunkSize, videoSize - 1);
//     const videoLength = end - start + 1;
//     const headers = {
//         "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//         "Accept-Ranges": "bytes",
//         "Content-Length": videoLength,
//         "Content-Type": "video/mp4"
// }
 
// res.writeHead(206, headers)
// const stream = fs.createReadStream(videoPath, { start, end })
// stream.pipe(res)
// })

app.listen(process.env.PORT);

