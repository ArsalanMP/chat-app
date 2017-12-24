module.exports = (params , pass) ->
  myquery = { _id: params._id }
  mongo.collection(\messages)
  .remove myquery
  .then (result) ->
    if result?
      return result
    else
      return \unsuccessful
  .catch (err) ->
    # handle error here or dont use catch to let flora take control of it
    console.log err