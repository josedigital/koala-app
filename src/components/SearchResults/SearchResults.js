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

      return (
        <div className={this.props.isHome ? 'Home' : ''}>
          <SearchForm setSearchResults={this.setSearchResults} /> 
          { message }
          <JobList jobList={this.state.jobList} saveJob={this.props.saveJob} />
        </div>
      )
    }
}

export default SearchResults
