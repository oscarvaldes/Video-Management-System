/**
 * Created by associate on 5/31/16.
 */
var express = require('express');
var router = express.Router();
var ff = require('fluent-ffmpeg');
var bodyParser = require('body-parser');
var userinput;
var input;
router.use(bodyParser.urlencoded({ extended: true}));
ff.setFfmpegPath("/usr/bin/ffmpeg");//PCF path

router.post('/', function (request, respond, next) {
  userinput=request.body.IP;
  //respond.send(userinput);
  respond.redirect("/");
  input = 'rtsp://root:pass@'+userinput+'/axis-media/media.amp?'
  console.log(input);
  console.log(request.body.IP);
  });
//Home Directory
router.get('/', function (req, res, next) {
    //console.log(req.query.IP);
  //  var userinput=request.body.IP;
  //  console.log("TESSSSSSSSSSSSSSSSSSS");//GETTING UNDEFINED
    //var input = 'rtsp://root:pass@'+userinput+'/axis-media/media.amp?';//10.4.81.232 4k:10.4.81.228
    res.contentType("video/mp4");
    var proc = ff(input)
        .outputOptions(["-vcodec copy",
            "-f mp4",
            "-movflags frag_keyframe+empty_moov",
            "-reset_timestamps 1",
            "-vsync 1",
            "-flags global_header",
            "-bsf:v dump_extra",
            "-y"])
        .on('error', function (err) {
            console.log("an error occurred : " + err.message);
        })
        .on('end', function () {
            console.log("End of stream");
        })
        .pipe(res, {end: true});

});

// router.post('/', function (req, res, next) {
//   res.send(req.body.IP);
// });

module.exports = router;
