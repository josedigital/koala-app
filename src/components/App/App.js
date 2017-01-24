import React from 'react'
import { HeaderContainer } from '../../containers'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.checkLogin() // check is Auth0 lock is authenticating after login callback
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
