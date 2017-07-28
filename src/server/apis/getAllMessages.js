let fs = require('fs');
module.exports = (params, socket , io , response) => {
    users.push(params.data);
    io.sockets.emit("userConnected", params.data);
    socket['_user'] = params.data;
    console.log(params.data.name + ' joined the room');
    mongodb.collection('messages').find().toArray().then( (messages) => {
      console.log(messages);
      response(messages , users);
    });
}