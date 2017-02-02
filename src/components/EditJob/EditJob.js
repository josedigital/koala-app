import React from 'react'

import {jobHelpers} from '../../utils/helpers'

import TextArea from '../Forms/TextArea'
import TextInput from '../Forms/TextInput'
import Select from '../Forms/Select'


class EditJob extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      jobId: '589020aaa4a4de0eb9a034c3',
      title: 'test title',
      url: 'www.testurl.com',
      summary: 'summary test text',
      location: 'location test',
      company: 'Acme company'
    }
    // --- bind handles
    this.handleEditJobTitle = this.handleEditJobTitle.bind(this)
    this.handleEditJobUrl = this.handleEditJobUrl.bind(this)
    this.handleEditJobSummary = this.handleEditJobSummary.bind(this)
    this.handleEditJobLocation = this.handleEditJobLocation.bind(this)
    this.handleEditJobCompany = this.handleEditJobCompany.bind(this)
    // --- bind submits
    this.handleSubmit = this.handleSubmit.bind(this)

  }

    // --- handles
    handleEditJobTitle (e) {
        this.setState({
        title: e.target.value
        })
    }

    handleEditJobUrl (e) {
        this.setState({
            url: e.target.value
        })
        }

    handleEditJobSummary (e) {
        this.setState({
            summary: e.target.value
        })
        }

    handleEditJobLocation (e) {
        this.setState({
            location: e.target.value
        })
        }

    handleEditJobCompany (e) {
        this.setState({
            company: e.target.value
        })
        }
    
    // --- Submits
    handleSubmit(e){
        e.preventDefault()
        let jobId = this.state.jobId
        let newTitle = this.state.title
        let newUrl = this.state.url
        let newSummary = this.state.summary
        let newLocation = this.state.location
        let newCompany = this.state.company
        jobHelpers.editJob(jobId, newTitle, newUrl, newSummary, newLocation, newCompany).then(function(response){
        console.log("edited job fields saved in db")
        console.log(response.data)
        }.bind(this));
        this.setState({
        jobId: '',
        title: '',
        url: '',
        summary: '',
        location: '',
        company: ''
        })
    }


  render () {
    return (
        <div>
            <hr />
            <h1>Update the information for a Job </h1>
            <p>JobId = hard coded job.id from George's DB for testing. *Need to make a button that passes the jobID and info fields data into this component</p>
            
        <form onSubmit={ this.handleSubmit }>
      
          {/* Title field */}
          <div className="form-element">
            <label htmlFor='title' className="form-label">Job Title</label>
            <input
              value={ this.state.title } 
              onChange={ this.handleEditJobTitle }  
              label='Job Title'
              type='text'
              name='title'
              placeholder= {this.state.title} />
          </div>
          
          {/* Company */}      
          <div className="form-element">
            <label htmlFor='company' className="form-label">Company</label>
            <input
              value={ this.state.company } 
              onChange={ this.handleEditJobCompany }  
              label='company'
              type='text'
              name='company'
              placeholder= {this.state.company} />
          </div>
              
          
          {/* URL */}
          <div className="form-element">
            <label htmlFor='url' className="form-label">URL</label>
            <input
              value={ this.state.url } 
              onChange={ this.handleEditJobUrl }  
              label='Link to job posting'
              type='text'
              name='url'
              placeholder={this.state.url} />
          </div>
          
          {/* Summary Field */}
          <div className="form-element">
            <label htmlFor='summary' className="form-label">Summary</label>
            <textarea
              type='text'
              value={ this.state.summary } 
              onChange={ this.handleEditJobSummary } 
              label='Job Summary'
              name='summary'
              placeholder={this.state.summary} />
          </div>

          {/* Location field */}
          <div className="form-element">
            <label htmlFor='location' className="form-label">Location</label>
            <input
              value={ this.state.location } 
              onChange={ this.handleEditJobLocation } 
              label='Job Location'
              type='text'
              name='location'
              placeholder= {this.state.location} />
          </div>


          <button type="submit">
            Save Job Changes
          </button>

        </form>
            
        </div>

    )
  }
}

export default EditJob

