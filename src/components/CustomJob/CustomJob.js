import React from 'react'

import {jobHelpers} from '../../utils/helpers'
import JobLister from '../JobLister/JobLister'


class CustomJob extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      url: '',
      summary: '',
      location: '',
      jobList: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleChange(e){
    //console.log(e.target.value)
    var newState = {};
    newState[e.target.name] = e.target.value;
    console.log(newState)
    this.setState(newState);
	}

  handleSubmit(e){
		e.preventDefault()
    var userEmail = this.props.profile.email
		jobHelpers.saveJob(userEmail, this.state.title, this.state.url, this.state.summary, this.state.location)
      .then(function () {
        console.log("4 state values sent to DB through saveJob helper")
		  }.bind(this));
		this.setState({
			title: '',
			url: '',
      summary: '',
      location: ''
		})
	}
    //-- TO TEST DELETE FUNCTION --
    handleDelete(e){
		e.preventDefault()
    var userEmail = this.props.profile.email
    //console.log('***'+userEmail, this.state.job_id)//good
		jobHelpers.deleteJob(userEmail, this.state.job_id)
      .then(function(data){
        console.log("job_id for USER sent to db for DELETION")
        console.log(data.data)
        this.componentWillMount()
		}.bind(this));
		this.setState({
			job_id: []       
		})
	}

  
  componentWillMount () {
    var userEmail = this.props.profile.email
    //console.log('#60 customjob userEmail='+userEmail)//good
    jobHelpers.getJobs(userEmail).then(function(response) {
      //console.log(response.data.Jobs)
      if (response.data.Jobs !== this.state.jobList) {
        this.setState({
          jobList:response.data.Jobs
        })
        console.log('this array is being mapped',this.state.jobList)
      }
    }.bind(this));
  }
  

  render () {
    return (
      <div className="container home">
        <h2>All of {this.props.profile.nickname}'s Jobs</h2>
        <ol>
         {this.state.jobList.map ((job, idx) =>  <JobLister key={idx} job={job} email={this.props.profile.email}/> )}
        </ol>

        
        <h2>Add a custom Job to {this.props.profile.nickname}'s list</h2>

        <form onSubmit={ this.handleSubmit }>
      
          {/* Title field */}
          <div className="form-element">
            <label htmlFor='title' className="form-label">Job Title</label>
            <input
              value={ this.state.title } 
              onChange={ this.handleChange }  
              label='Job Title'
              type='text'
              name='title'
              placeholder='Job Title' />
          </div>
              
          
          {/* URL */}
          <div className="form-element">
            <label htmlFor='url' className="form-label">URL</label>
            <input
              value={ this.state.url } 
              onChange={ this.handleChange }  
              label='Link to job posting'
              type='text'
              name='url'
              placeholder='www.myjobposting.com' />
          </div>
          
          {/* Summary Field */}
          <div className="form-element">
            <label htmlFor='summary' className="form-label">Summary</label>
            <textarea
              value={ this.state.summary } 
              onChange={ this.handleChange } 
              label='Job Summary'
              name='summary'
              placeholder='Front End job requires knowledge of SASS' />
          </div>

          {/* Location field */}
          <div className="form-element">
            <label htmlFor='location' className="form-label">Location</label>
            <input
              value={ this.state.location } 
              onChange={ this.handleChange } 
              label='Job Location'
              type='text'
              name='location'
              placeholder='Austin, TX' />
          </div>

          {/*Seems like we are missing Company name. *Check data from API call */}

          <button type="submit">
            Save Job
          </button>

        </form>
        
        {/*can delete below this, only for testing*/}
        <hr />
        <h2>Delete a Job from {this.props.profile.nickname}'s list</h2>

        <form onSubmit={ this.handleDelete }>
          {/* Location field */}
          <div className="form-element">
            <label htmlFor='job_id' className="form-label">Job _id number</label>
            <input
              value={ this.state.job_id } 
              onChange={ this.handleChange } 
              label='job_id'
              type='text'
              name='job_id'
              placeholder='58822a7016bedeae03c955e8' />
            </div>
            <button type="submit">
              Delete Job
            </button>

        </form>
      </div>
    )  
  }
  
}

export default CustomJob
