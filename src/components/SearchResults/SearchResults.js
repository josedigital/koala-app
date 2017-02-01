import React, { Component } from 'react'

import { jobsApi } from '../../utils/helpers.js';
import { jobsApiSearch } from '../../utils/helpers.js';
import TextInput from '../Forms/TextInput';
import SearchForm from '../Forms/SearchForm'
import ListItem from './ListItem';

class SearchResults extends Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     keyWord : '',
        //     location: '',
        //     searchResults: []
        // }
        //  this.handleKeyWordSearch = this.handleKeyWordSearch.bind(this);
        //  this.handleSubmitGetJobs = this.handleSubmitGetJobs.bind(this);
        //  this.handleLocationSearch = this.handleLocationSearch.bind(this);
    }

    // handleKeyWordSearch(e){
    //     this.setState({
    //       keyWord: e.target.value
    //   })
    // }


    // handleLocationSearch(e){
    //     this.setState({
    //       location: e.target.value
    //   })
    // }

    // handleSubmitGetJobs(e){

    //     e.preventDefault();   
        
    //     var term;
    //     var location;
      

    //     if(this.state.keyWord == '') {
    //         term = 'all';
    //     } else {
    //         term = this.state.keyWord;            
    //     }

    //     console.log("search term" + term); 

    //     if(this.state.location == ''){
    //         location = 'all';
    //     } else {
    //         location = this.state.location;
    //     }
    //     console.log("search location" + location); 
    //     jobsApiSearch(term, location).then(function(response) {
    //        this.setState({searchResults: response.data})
    //         console.log(this.state.searchResults);
    //     }.bind(this));

    // }

    // componentWillMount() {
    //     console.log(this.props.profile)
    //     jobsApi().then(function(response) {
    //        this.setState({searchResults: response.data})
    //         console.log(this.state.searchResults);
    //     }.bind(this));
    // }


    render() {
        console.log("Inside Search Results Page");
        const profile = (this.props.profile) ? this.props.profile : ''
        return (
                
            <div> 
            <SearchForm />          
            </div>    

        )
    }
}
export default SearchResults
