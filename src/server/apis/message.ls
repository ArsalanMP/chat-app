module.exports = (params , socket , io) ->
    res <- mongodb.collection('messages').insert(params.data).then
    io.sockets.emit "serverMessage", params.data
    console.log params.data  