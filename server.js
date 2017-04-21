"use strict";
//https://shielded-escarpment-35201.herokuapp.com/
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
// const io = require('socket.io')(http);
const bodyParser = require('body-parser')

const mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;

mongoose.connect(connect);

var testRoute = require('./routes/testRoute');
var calendarRoute = require('./routes/calendarRoute');
var workoutRoute = require('./routes/workoutRoute');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());

app.use('/', testRoute);
app.use('/', calendarRoute);
app.use('/', workoutRoute);

var port = process.env.PORT || 8080;
http.listen(port, function() {
  console.log('Express started. Listening on %s', port);
});
