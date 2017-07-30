require! {
  'react': { Component }: React
  './Message': Message
  './helpers/createElement': { div , elem }
}

module.exports = class MessageList extends Component

  (prop) ->
    super(prop)

  render: ->
    div null ,
      children:
        @props.list.map (message, index) ~>
          elem Message ,
            message: message
            user: @props.user
            key: index