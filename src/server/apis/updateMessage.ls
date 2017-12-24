module.exports = (params , socket , io) ->
    myquery = { _id: params._id }

    mongo.collection(\messages)
    .updateOne myquery , params.newValue
    .then (result) ->
        if result?
            io.sockets.emit "serverMessageUpdate", params
            return result
        else
            return \unsuccessful
    .catch (err) ->
        # handle error here or dont use catch to let flora take control of it
        console.log err