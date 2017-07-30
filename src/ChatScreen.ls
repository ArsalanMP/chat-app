require! {
  'react': { Component }: React
  './ChatScreen.styl': css
  'socket.io-client': io
  './MessageList': MessageList
  './UserList': UserList
  './helpers/createElement': { div , el , elem , img , input}
}

module.exports = class Page extends Component

  (props) ->
    super(props);
    @state =
      msgText: ''
      messages : []
      users : []

  componentDidMount: ->
    @socket = io 'http://localhost:3001'

    @socket.emit 'functionCall' , { fn:'getAllMessages' , data: @props.user }, (messages, users) ~>
      @setState { messages , users }
      @refs.endoflist.scrollIntoView()

    @socket.on 'onlineUsers', (users) ~>
      @setState { users }

    @socket.on 'userConnected', (user) ~> 
      users = @state.users
      users.push(user)
      @setState { users }

    @socket.on 'userDisconnected', (user) ~>
      users = @state.users.filter (el) ->
        el.name isnt user.name || el.avatar isnt user.avatar
      @setState { users }

    @socket.on 'serverMessage', (msg) ~>
      messages = @state.messages
      messages.push(msg)
      @setState { messages }
      @refs.endoflist.scrollIntoView()

  onUserInput: (event) ~>
    @setState { msgText: event.target.value }

  onSendMessage: (event) ~>
    if (event.key is 'Enter')
      message = @state.msgText;
      @setState { msgText: '' }
      if message.length > 0
        messageJson =
          message: message
          user: @props.user
          date: Date.now()
        @socket.emit 'functionCall' , { fn : 'message' , data : messageJson }

  render: ->
    div null ,
      children:
        div css.column ,
          children:
            div null ,
              children:
                elem UserList ,
                  list: @state.users
                  user: @props.user 
        div css.container ,
          children:
            div css.chatForm ,
              children:
                input css.myInput ,
                  onKeyUp: @onSendMessage
                  onChange: @onUserInput
                  value: @state.msgText
                  placeholder: 'Enter your message'
            div css.listDiv ,
              children: 
                elem MessageList ,
                  list: @state.messages
                  user: @props.user
                div null ,
                  ref:'endoflist'