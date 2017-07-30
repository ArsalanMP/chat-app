require! {
  'react': { Component }: React
  './Login.styl': css
  'cartoon-avatar': { generate_avatar }
  './helpers/createElement': { div , el , elem , img ,input}
}

module.exports = class Login extends Component

  (props)->
    super(props);
    @state = { username: '' ,avatar: generate_avatar() }

  onUserInput: (event) ~>
    @setState username: event.target.value 

  onSubmitName: (e) ~> 
    e.preventDefault()
    @props.setUpdate { username: this.state.username , avatar: this.state.avatar }

  render: ->
    div css.back,
    children:
      div css.container,
      children:
        div css.avatarContainer ,
        children: 
          img  css.avatar,
            src: @state.avatar
            alt: @state.username
        div css.formContainer,
          children:
            elem 'form' ,
              onSubmit: @onSubmitName
              children:
                input css.myInput ,
                  onChange: @onUserInput
                  value: @state.inputValue
                div css.myBtn ,
                  onClick: @onSubmitName
                  children: 'Login'

