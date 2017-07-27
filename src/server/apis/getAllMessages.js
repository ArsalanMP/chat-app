let fs = require('fs');
module.exports = (params, socket , io , response) => {
    users.push(params.data);
    io.sockets.emit("userConnected", params.data);
    socket['_user'] = params.data;
    console.log(params.data.name + ' joined the room');
    getData((data) => {
        response(JSON.parse(data), users);
    });
}

function getData(callback) { 
    fs.readFile('./src/server/messages.txt', 'utf8', function (err, data) {
        if (err) {
          if (err.code === 'ENOENT') {
            writeData({ messages: [] }, () => {
              callback(JSON.stringify({ messages: [] }));
            }); // create the file if not exists
            return;
          } else {
            throw err;
          }
        }
        callback(data);
    });
}