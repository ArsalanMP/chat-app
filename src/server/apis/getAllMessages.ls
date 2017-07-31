module.exports = (params, socket , io , response) ->
    users.push params.data
    io.sockets.emit "userConnected", params.data
    socket['_user'] = params.data
    console.log params.data.name + ' joined the room'
    
    messages <- mongodb.collection('messages').find().toArray().then
    console.log messages
    response messages , users