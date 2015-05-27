/*var express = require('express');
var app = express();
var http = require('http').Server(app);*/
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var shortid = require('shortid');
var this_user_id;
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');

app.get('/cache.manifest', function(req, res){
  res.header("Content-Type", "text/cache-manifest");
  res.sendFile(__dirname + '/public/cache.manifest');
  console.log('cache in use');
});

app.use(express.static(__dirname + '/public'));




io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    this_user_id = shortid.generate();
    socket.emit('player_id', this_user_id);
  });

  socket.on('player_info', function(pid, posFromLeft, facing, velocity, display_name){
    //console.log('player id: ' + pid + ' with position ' + posFromLeft + ' facing ' + facing + ' with velocity ' + velocity);

    //prevent html tag and javascript
    display_name = display_name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    socket.broadcast.emit('other_players', pid, posFromLeft, facing, velocity, display_name);
  });

  socket.on('disconnect', function(){
    socket.broadcast.emit('disconnect_player', this_user_id);
    console.log('disconnect player ' + this_user_id);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

