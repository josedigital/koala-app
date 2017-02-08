import React from 'react'
import { browserHistory, Router, Route, Link, withRouter } from 'react-router'
import { SavedJobsList, SearchResults } from '../index'
import { checkUser, createUser, isEmpty, jobHelpers, noteHelpers } from '../../utils/helpers'
import NoteListing from '../Note/NoteListing'

import './Dashboard.css'

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      saved_jobs: [],
      status: REQUEST,
      message: '',
      search_visible: false,
      notes:''
    }

    this.getSavedJobs = this.getSavedJobs.bind(this)
    this.saveJob = this.saveJob.bind(this)
    this.deleteJob = this.deleteJob.bind(this)
    this.viewJob = this.viewJob.bind(this)
    this.showHideSearch = this.showHideSearch.bind(this)

  }

  componentWillMount () {
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


  viewJob (jobId) {
    noteHelpers.getNotes(jobId).then(function(response) { 
    if (response.data.Notes !== this.state.notes) {
        this.setState({
          notes:response.data.Notes
        })
        // console.log(this.state.notes)//good
      }
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



  showHideSearch (e) {
    e.preventDefault()
    this.setState({
      search_visible: !this.state.search_visible
    })
  }




  render () {
    return (
      <div className="Grid Dashboard">
        <div className="Cell four">
          {
            this.state.status == REQUEST ? this.loading() : <SavedJobsList jobs={this.state.saved_jobs} viewJob={this.viewJob} deleteJob={this.deleteJob} 
          />
          }
          
        </div>
        <div className="Cell four">
          <p><a href="" onClick={this.showHideSearch}>New Job Search</a></p>
          {
            this.state.search_visible
              ? <SearchResults saveJob={this.saveJob} classes={'animated fadeInDown'} />
              : null
          }
          
        </div>
        <div className="Cell four">
          
          default
        </div>
        
      </div>
    )
  }
}

export default Dashboard
