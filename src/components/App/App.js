import React from 'react'
import { HeaderContainer } from '../../containers'
import { SearchResults } from '../index'
import { checkUser, createUser, isEmpty } from '../../utils/helpers'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.checkLogin() // check is Auth0 lock is authenticating after login callback
  }

  componentDidMount () {
    if (!isEmpty(this.props.profile)) {
      checkUser(this.props.profile.nickname)
        .then(({data}) => {
          if (typeof data.user === 'string')
            createUser(this.props.profile)
              .then(data => console.log(data))
        })
    }
  }
  

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {profile: this.props.profile}))
    return(
      <div className="container large">
        <HeaderContainer />
        {
          this.props.isAuthenticated ? childrenWithProps : <SearchResults />
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
