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
        message: '',
        jobListEmpty: [{
          title:'You have no saved jobs'
        }]
    }

    this.setSearchResults = this.setSearchResults.bind(this)      
  }


    setSearchResults (results){
      this.setState({
        jobList: results
      });
    }


    render () {
      const profile = (this.props.profile) ? this.props.profile : ''
      const message = this.state.message
      //-g message
      //Trying to write a message to user that will print on the dashboard's left cell when you have no saved jobs. 

      // const jobs = (this.state.jobList >=0) ? this.sate.jobList : this.state.jobListEmpty

      //change prop value in line 39 to jobs

      return (
        <div className={this.props.isHome ? 'Home' : ''}>
          <SearchForm setSearchResults={this.setSearchResults} /> 
          <div className="text-center">{ message }</div>
          <JobList jobList={this.state.jobList} saveJob={this.props.saveJob} />
        </div>
      )
    }
}

export default SearchResults
