let fs = require('fs');
module.exports = (params , socket , io) => {
    io.sockets.emit("serverMessage", params.data);
    getData((data) => {
        let messages = JSON.parse(data).messages ;
        messages.push(params.data);
        writeData({ messages });
    });
    console.log(params.data);
};

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

function writeData(newData, done) {
    fs.writeFile('./src/server/messages.txt', JSON.stringify(newData), function(err) {
        if (err) throw err;
        if (done) done();
    });
}