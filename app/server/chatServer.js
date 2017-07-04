console.log("hi baby 2");
var HttpServer = require('http').createServer();
var Server = require('socket.io')(HttpServer);

Server.listen(4000);

Server.on('connection' , (socket) => {
	console.log('new client connected');
	socket.emit('message' , 'connected to server');
	socket.on('message' , (message) => {
		console.log(message);
		socket.emit('message',message);
		socket.broadcast.emit('message' , message);
	})
});