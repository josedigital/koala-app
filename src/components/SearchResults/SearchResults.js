import React, { Component } from 'react'

import { jobsApi } from '../../utils/helpers.js';
import { jobsApiSearch } from '../../utils/helpers.js';
import SearchForm from '../Forms/SearchForm'
import ListItem from './ListItem';
import JobList from './JobList';

class SearchResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobList: []
        }

        this.setSearchResults = this.setSearchResults.bind(this);
              
    }

    setSearchResults(results){
        console.log("Inside setSearchResults in SearchResults");
        this.setState({
          jobList: results
        });
        console.log(this.state.jobList);

    }    
    render() {
        console.log("Inside Search Results Page");
        const profile = (this.props.profile) ? this.props.profile : ''
        return (
                
            <div> 
            <SearchForm setSearchResults={this.setSearchResults} /> 
            <JobList jobList={this.state.jobList} />         
            </div>    

        )
    }
}
export default SearchResults
