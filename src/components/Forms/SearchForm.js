import React, { Component } from 'react'

import { jobsApi } from '../../utils/helpers.js';
import { jobsApiSearch } from '../../utils/helpers.js';
import TextInput from '../Forms/TextInput';
import ListItem from '../SearchResults/ListItem';

class SearchForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keyWord : '',
            location: '',
            searchResults: []
        }
         this.handleKeyWordSearch = this.handleKeyWordSearch.bind(this);
         this.handleLocationSearch = this.handleLocationSearch.bind(this);
         this.handleSubmitGetJobs = this.handleSubmitGetJobs.bind(this);
       
    }

    handleKeyWordSearch(e){
        this.setState({
          keyWord: e.target.value
      })
    }


    handleLocationSearch(e){
        this.setState({
          location: e.target.value
      })
    }

    handleSubmitGetJobs(e){

        e.preventDefault();   
        
        var term;
        var location;
      

        if(this.state.keyWord == '') {
            term = 'all';
        } else {
            term = this.state.keyWord;            
        }

        console.log("search term" + term); 

        if(this.state.location == ''){
            location = 'all';
        } else {
            location = this.state.location;
        }
        console.log("search location" + location); 
        jobsApiSearch(term, location).then(function(response) {
           this.setState({searchResults: response.data})
            console.log(this.state.searchResults);
        }.bind(this));

    }

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

        var formInline= {
        	display: 'inherit',
    		margin: 10
        }
        var btnInline = {
        	margin: 40,
      		marginLeft: 15
        }
        return (
                
            <div> 
             <div className="Grid center">               
                 <h1>Search Jobs</h1>               
            </div>
            <div className="Grid center">
                <form onSubmit={ this.handleSubmitGetJobs} style={formInline}>
                    <TextInput 
                    label='Title'
                    inputType='text'
                    name='keyWord'
                    controlFunction={this.handleKeyWordSearch}
                    content={this.state.keyWord}
                    placeHolder='Search For Keyword'/>
                     <TextInput 
                    label='Location'
                    inputType='text'
                    name='location'
                    controlFunction={this.handleLocationSearch}
                    content={this.state.location}
                    placeHolder='Austin,TX'/>
                    <button type="submit" style={btnInline}>
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
export default SearchForm
