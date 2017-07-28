let fs = require('fs');
module.exports = (params , socket , io) => {
    mongodb.collection('messages').insert(params.data).then( (res) => {
        io.sockets.emit("serverMessage", params.data);
        console.log(params.data);  
    } );
};