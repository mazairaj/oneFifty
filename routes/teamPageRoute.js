"use strict";
"use strict";
var express = require('express'),
aws = require('aws-sdk'),
multer = require('multer'),
multerS3 = require('multer-s3');
var router = express.Router();

//settting up S3
var s3 = new aws.S3();
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'one-fifty',
    Key: function (req, file, cb) {
      cb(null, file.orginalname)
    }
  })
});

const Post = require('../models/models').Post;

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())

router.get('/', function(req, res){
  res.send("RUNNING ...")
})

router.post('/newPost', function(req, res) {
  console.log("REQD", req.file)
  var newPost = new Post(req.body.post)
  newPost.save(function(err, postNew){
    if (err) {
      console.log('error has occur: ',  err)
    } else {
      console.log('Nice, you created a file')
      console.log(postNew);
    }
  }).then(res.send(newPost))
});

router.get('/populatePosts', function(req, res){
  Post.find().sort('-createdAt').limit(10)
    .exec(function (err, newPosts){
      if (err) console.log('error is good');
      var posts = [...newPosts]
      console.log("HERE YA GO!", posts)
      res.send(posts)
    })
})

router.post('/postToS3', upload.single('file'), function(req, res) {
  console.log("In here bitch!");
  console.log("Files", req.file)
  res.json({file: req.file});
});

module.exports = router
