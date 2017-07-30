require! {
  'react': { Component }: React
  './ChatScreen.ls': ChatScreen
  './App.styl': css
  './Login.ls': Login
  './helpers/createElement': { div , el , elem , img , input}
}

module.exports = class App extends Component

  (prop) ->
    super(prop);
    @state =
      username : 'guest'
      avatar : 'https://www.jinlisting.com/wp-content/themes/pointfinder/images/empty_avatar.jpg'

  setUpdate: (update) ~>
    @setState update

  render: ->
    if @state.username isnt 'guest' 
      elem ChatScreen,
        user: 
          name: @state.username
          avatar: @.state.avatar
          date: Date.now!
    else
      elem Login,
        setUpdate: @setUpdate 