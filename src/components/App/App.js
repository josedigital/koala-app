import React from 'react'
import { HeaderContainer } from '../../containers'
import { SavedJobsList, HomePage, Dashboard } from '../index'
import { checkUser, createUser, isEmpty, jobHelpers } from '../../utils/helpers'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.checkLogin() // check is Auth0 lock is authenticating after login callback
  }

  

 

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {profile: this.props.profile }))
    
    return(
      <div className="container">
        <HeaderContainer />
        {
          this.props.isAuthenticated ? childrenWithProps : <HomePage />
        }
        {/* 
          this.state.status == REQUEST ? this.loading() : <SavedJobsList jobs={this.state.saved_jobs} deleteJob={this.deleteJob} />
        */}
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
