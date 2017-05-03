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
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      // console.log('key', file);
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

router.post('/newPost', upload.single('file'),
  { name: 'video', maxCount: 1}]), function(req, res) {
  console.log("REQD", req)
  var newPost = new Post(req.body.post)
  newPost.save(function(err, postNew){
    if (err) {
      console.log('error has occur: ',  err)
    } else {
      console.log('Nice, you created a file')
      console.log(postNew);
    }
  })
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

module.exports = router
