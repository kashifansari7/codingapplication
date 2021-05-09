var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mqtt = require('mqtt');

var client = mqtt.connect("mqtt://test.mosquitto.org");

client.on('connect', function() {
  client.subscribe('presence', function(err) {
    if (!err) {
      client.publish('presence', 'Hello');
    }
  })
})

client.on('message', function(topic, message) {
  console.log(message.toString());
  client.end();
})

var app = express();
app.listen(3001);