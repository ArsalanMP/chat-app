express = require 'express'
app = express()
http = require('http').Server(app)
io = require('socket.io')(http)
require './intiMongoService'
global.users = []

io.on 'connection', (socket) -> 
  socket.on 'functionCall' , (params , res) -> functionCall(params , socket , io , res)
  socket.on "disconnect" , -> disconnect(socket , io)

functionCall = (params , socket, io , response) ->
  api = require './apis/' + params.fn
  api(params , socket , io , response)

disconnect = (socket , io) -> 
  user = socket._user;
  if user?
    console.log user.name +' left the room'
    newusers = users.filter (el) ->
      el.name isnt user.name or el.avatar isnt user.avatar
    users = newusers 
    io.sockets.emit "userDisconnected", socket._user

http.listen 3001, ->
  console.log 'listening on *:3001'