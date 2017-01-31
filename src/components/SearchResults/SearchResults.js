import React, { Component } from 'react'

import { jobsApi } from '../../utils/helpers.js';
import { jobsApiSearch } from '../../utils/helpers.js';
import TextInput from '../Forms/TextInput';
import ListItem from './ListItem';

class SearchResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keyWord : '',
            searchResults: []
        }
        this.handleKeyWordSearch = this.handleKeyWordSearch.bind(this);
         this.handleSubmitGetJobs = this.handleSubmitGetJobs.bind(this);
    }

    handleKeyWordSearch(e){
        this.setState({
          keyWord: e.target.value
      })
    }

    handleSubmitGetJobs(e){

        e.preventDefault();
        
        console.log("inside keyword search handlesubmit" + this.state.keyWord );
        jobsApiSearch(this.state.keyWord).then(function(response) {
           this.setState({searchResults: response.data})
            console.log(this.state.searchResults);
        }.bind(this));

    }

    componentWillMount() {
        console.log(this.props.profile)
        jobsApi().then(function(response) {
           this.setState({searchResults: response.data})
            console.log(this.state.searchResults);
        }.bind(this));
    }


    render() {
        console.log("Inside Search Results Page");
        const profile = (this.props.profile) ? this.props.profile : ''
        return (
                
            <div> 
             <div className="Grid center">               
                 <h1>Search Jobs</h1>               
            </div>
            <div className="Grid center">
                <form onSubmit={ this.handleSubmitGetJobs}>
                 <TextInput 
                    label='Enter Key Word To Search'
                    inputType='text'
                    name='keyWord'
                    controlFunction={this.handleKeyWordSearch}
                    content={this.state.keyWord}
                    placeholder='Search For Keyword' />
                    <button type="submit">
                    Search
                    </button>
                </form>  
            </div>  
            <hr/>
            <div className="container">
             <div className="Grid">         
                {this.state.searchResults.map((result, i) => <ListItem key={i} btnText={"Save Job"} result={result} profile={profile} />)}
            </div>
            </div>
        </div>    

        )
    }
}
export default SearchResults
