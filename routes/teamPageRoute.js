"use strict";
var express = require('express');
var router = express.Router();
// var _ = require('underscore')
const Post = require('../models/models').Post;

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())

router.post('/newPost', function(req, res){
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
