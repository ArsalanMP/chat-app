let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
global.users = [];

io.on('connection', (socket) => {
  socket.on('functionCall' , (params , res) => functionCall(params , socket , io , res) );
  socket.on("disconnect" , ()=>disconnect(socket , io));
});

let functionCall = (params , socket, io , response) => {
  let api = require ('./apis/' + params.fn);
  api(params , socket , io , response);
};

let disconnect = (socket , io) => {
  let user = socket._user;
  if(user !== undefined) {
    console.log(user.name +' left the room');
    let newusers = users.filter(function(el) {
      return (el.name !== user.name || el.avatar !== user.avatar );
    });
    users = newusers ;
    io.sockets.emit("userDisconnected", socket._user);
  }
}

http.listen(3001, function(){
  console.log('listening on *:3001');
});