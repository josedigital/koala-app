import React, { Component } from 'react'

import { jobsApi } from '../../utils/helpers.js';
import { jobsApiSearch, jobHelpers } from '../../utils/helpers.js';
import SearchForm from '../Forms/SearchForm'
import ListItem from './ListItem';
import JobList from './JobList';

class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
        jobList: [],
        message: ''
    }

    this.handleSave = this.handleSave.bind(this)
    this.setSearchResults = this.setSearchResults.bind(this)
            
  }

	handleSave (result) {
    if (this.props.profile) {
    	jobHelpers.saveJob(this.props.profile.email, result.title, result.company, result.url, result.location)//missing this.state.summary from api call
    		.then(function (response) {
    			console.log(response.data)
    		}.bind(this))
    } else {
    	console.log('you have to be logged in')
    	this.setState({
    		message: 'You have to login to save jobs'
    	})
    }

	}    

    setSearchResults (results){
      this.setState({
        jobList: results
      });
    }


    render () {
      const profile = (this.props.profile) ? this.props.profile : ''
      const message = this.state.message
      return (
        <div>
          <SearchForm setSearchResults={this.setSearchResults} /> 
          { message }
          <JobList jobList={this.state.jobList} handleSave={this.handleSave} />
        </div>
      )
    }
}

export default SearchResults
