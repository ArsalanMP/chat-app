require! {
  'react': { Component }: React
  './User': User
  './helpers/createElement': { div , elem }
}

module.exports = class UserList extends Component

  (prop) ->
    super(prop)

  render: ->
    div null ,
      children:
          @props.list.map (user, index) ~>
            elem User ,
              user: user
              currentUser: @props.user
              key: index

  