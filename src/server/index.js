let express = require('express')
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
var fs = require('fs');

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

  socket.on("getAllMessages", (message, res) => {
    getData((data)=> {
      console.log('data :' + data);
      res(data);
    })
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