import React from 'react'
import { SavedJobsList } from '../index'
import { checkUser, createUser, isEmpty, jobHelpers } from '../../utils/helpers'

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      saved_jobs: [],
      status: REQUEST,
      message: ''
    }

    this.getSavedJobs = this.getSavedJobs.bind(this)
    this.saveJob = this.saveJob.bind(this)
    this.deleteJob = this.deleteJob.bind(this)

  }

  componentWillMount () {
    console.log('will mount')
    if (this.props.profile) {
      this.getSavedJobs(this.props.profile.email)
      checkUser(this.props.profile.nickname)
        .then(({data}) => {
          if (typeof data.user === 'string')
            createUser(this.props.profile)
              .then(data => console.log(data))
        })
    }
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
    this.getSavedJobs(this.props.profile.email)
    return 'content loading...'
    
  }


  // save jobs to app state
  getSavedJobs (email) {
    jobHelpers.getJobs(email).then(function(response) {
      if (response.data.Jobs !== this.state.saved_jobs) {
        this.setState({
          saved_jobs:response.data.Jobs,
          status: SUCCESS
        })
        this.render()
      }
    }.bind(this));
  }




  render () {
    return (
      <div className="Grid">
        <div className="Cell four">
          left
          {
            this.state.status == REQUEST ? this.loading() : <SavedJobsList jobs={this.state.saved_jobs} deleteJob={this.deleteJob} />
          }
          
        </div>
        <div className="Cell four">
          center
        </div>
        <div className="Cell four">
          right
        </div>
        
      </div>
    )
  }
}

export default Dashboard
