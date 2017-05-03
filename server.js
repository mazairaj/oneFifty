"use strict";
//https://morning-taiga-46107.herokuapp.com/
const express = require('express');
const path = require('path');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


io.on('connected', (socket) => {
  console.log('A client just joined on: ', socket.id)
})
const bodyParser = require('body-parser')

const mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;
console.log("connect",connect)
console.log(process.env.PORT)
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

var port = process.env.PORT || 8080;
server.listen(port, function() {
  console.log('Express started. Listening on %s', port);
});
