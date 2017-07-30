require! {
  'react': { Component }: React
  './Message.styl': css
  './helpers/createElement': { div , img }
}

module.exports = class Message extends Component

  (prop)->
    super(prop)

  render: ->
    { user, message, date } = @props.message

    style = css.messageContainer
    if @props.user.name is user.name and @props.user.avatar is user.avatar
      style = css.myMessageContainer

    div css.container ,
      children:
        img css.avatar ,
          src: user.avatar
          alt: user.name
        div style ,
          children:
            div css.username ,
              children:
                user.name
            div css.message ,
              children:
                message
        div css.date ,
          children:
            new Date(date).toLocaleTimeString!