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
      status: REQUEST,
      message: ''
    }

    this.getSavedJobs = this.getSavedJobs.bind(this)
    this.saveJob = this.saveJob.bind(this)
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
      if (response.data.Jobs !== this.state.saved_jobs) {
        this.setState({
          saved_jobs:response.data.Jobs,
          status: SUCCESS
        })
      }
    }.bind(this));
  }
  
	saveJob (job) {
    if (this.props.profile) {
    	jobHelpers.saveJob(this.props.profile.email, job.title, job.company, job.url, job.location)//missing this.state.summary from api call
    		.then(function (response) {
          this.getSavedJobs(this.props.profile.email)
    		}.bind(this))
    } else {
    	console.log('you have to be logged in')
    	this.setState({
    		message: 'You have to login to save jobs'
    	})
    }
	}    

  deleteJob (jobId) {
    const email = this.props.profile.email
    jobHelpers.deleteJob(email, jobId)
      .then(function(data) {
        this.getSavedJobs(email)
      }.bind(this));
  }


  loading () {
    return 'content loading...'
  }
  

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {profile: this.props.profile, saveJob: this.saveJob }))
    

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
