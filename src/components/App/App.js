import React from 'react'
import { HeaderContainer } from '../../containers'
import { SavedJobsList, SearchResults } from '../index'
import { checkUser, createUser, isEmpty, jobHelpers } from '../../utils/helpers'
import './App.css'

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.checkLogin() // check is Auth0 lock is authenticating after login callback

    this.state = {
      saved_jobs: [],
      status: REQUEST
    }

    this.getSavedJobs = this.getSavedJobs.bind(this)
    this.deleteJob = this.deleteJob.bind(this)
  }

  componentDidMount () {
    if (!isEmpty(this.props.profile)) {
      this.getSavedJobs(this.props.profile.email)
      checkUser(this.props.profile.nickname)
        .then(({data}) => {
          if (typeof data.user === 'string')
            createUser(this.props.profile)
              .then(data => console.log(data))
        })
    }
  }

  // save jobs to app state
  getSavedJobs (email) {
    jobHelpers.getJobs(email).then(function(response) {
      if (response.data.Jobs !== this.state.jobList) {
        this.setState({
          saved_jobs:response.data.Jobs,
          status: SUCCESS
        })
      }
    }.bind(this));
  }
  

  deleteJob (jobId) {
    const email = this.props.profile.email
    jobHelpers.deleteJob(email, jobId)
      .then(function(data) {
        console.log("user email and jobId sent to db for DELETION from Delete Comp #37")
        console.log(data.data)
        console.log('------------')
        console.log(data)
        this.getSavedJobs(email)
      }.bind(this));
    //maybe we should give the user a message when the item is deleted?
  }


  loading () {
    return 'content loading...'
  }
  

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {profile: this.props.profile}))
    

    return(
      <div className="container large">
        <HeaderContainer />
        {
          this.props.isAuthenticated ? childrenWithProps : <SearchResults />
        }
        { 
          this.state.status == REQUEST ? this.loading() : <SavedJobsList jobs={this.state.saved_jobs} deleteJob={this.deleteJob} />
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
