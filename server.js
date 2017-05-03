"use strict";
//https://shielded-escarpment-35201.herokuapp.com/
const express = require('express');
const path = require('path');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// server.listen(8080, () => console.log('listening on 8080'));

io.on('connection', (socket) => {
  console.log('A client just joined on: ', socket.id)
})
const bodyParser = require('body-parser')

const mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;

mongoose.connect(connect);

var testRoute = require('./routes/testRoute');
var calendarRoute = require('./routes/calendarRoute');
var workoutRoute = require('./routes/workoutRoute');
var teamPageRoute = require('./routes/teamPageRoute');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());

app.use('/', testRoute);
app.use('/', calendarRoute);
app.use('/', workoutRoute);
app.use('/', teamPageRoute);

const Post = require('./models/models').Post;


var port = process.env.PORT || 8080;
console.log("THIS IS THE PORT", port)
server.listen(port, function() {
  console.log('Express started. Listening on %s', port);
});
