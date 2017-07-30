require! {
  'react': { Component }: React
  './User.styl': css
  './helpers/createElement': { div , el , elem , img }
}

module.exports = class User extends Component

  (prop) ->
    super(prop)

  render: ->
    style = css.container
    if @props.currentUser.name is @props.user.name and @props.currentUser.avatar is @props.user.avatar
      style = css.selectedContainer
    
    div style ,
      children:
        img css.avatar ,
          src: @props.user.avatar
          alt: @props.user.name
        div css.textContainer ,
          children:
            div css.username ,
            children:
              @props.user.name
            div css.date ,
              children:
                'Connected at ' + new Date(@props.user.date).toLocaleTimeString!