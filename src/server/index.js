let express = require('express')
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let fs = require('fs');
let users = [];

io.on('connection', (socket) => {

  socket.on("message", (message) => {
    io.sockets.emit("serverMessage", message);
    getData((data)=>{
      let messages = JSON.parse(data).messages ;
      messages.push(message);
      writeData({
        messages : messages
      });
    });
    console.log(message);
  });

  socket.on("getAllMessages", (user, res) => {
    users.push(user);
    io.sockets.emit("userConnected", user);
    socket['_user'] = user ;
    console.log(user.name + ' joned the room');
    getData((data)=> {
      res(data , users);
    });
  });

  socket.on("disconnect", () => {
    console.log(socket._user.name +' left the room');
    var index = users.indexOf(socket._user);
    if(index > -1) {
      users.splice(index , 1);
    }
    io.sockets.emit("userDisconnected", socket._user);
  });

});

function getData(callback) { 
    fs.readFile('./src/server/messages.txt', 'utf8', function (err, data) {
        if (err) throw err;
        callback(data);
        }
    );
}

function writeData( newData) {
    fs.writeFile ('./src/server/messages.txt', JSON.stringify(newData) , function(err) {
        if (err) throw err;
            console.log('complete');
        }
    );
}

http.listen(3001, function(){
  console.log('listening on *:3001');
});