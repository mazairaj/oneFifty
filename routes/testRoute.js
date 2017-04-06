"use strict";
var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())

router.get('/', function(req, res){
  res.send('test')
});

module.exports = router;
