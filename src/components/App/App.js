import React from 'react'
import { HeaderContainer } from '../../containers'
import { checkUser, createUser } from '../../utils/helpers'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.checkLogin() // check is Auth0 lock is authenticating after login callback
  }

  componentDidMount () {
    console.log(this.props.profile)
    checkUser(this.props.profile.nickname)
      .then(({data}) => {
        if (typeof data.user === 'string')
          createUser(this.props.profile)
            .then(data => console.log(data))
      })
  }
  

  render() {
    return(
      <div>
        <HeaderContainer />
        {
          this.props.isAuthenticated ? this.props.children : 'no dice'
        }
        
      </div>
    )
  }
}

App.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  children: React.PropTypes.element.isRequired,
  checkLogin: React.PropTypes.func.isRequired
}

export default App
