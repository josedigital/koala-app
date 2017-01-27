import React, { Component } from 'react'

import { jobsApi } from '../../utils/helpers.js'
import ListItem from './ListItem';

class SearchResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchResults: []
        }

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
                {this.state.searchResults.map((result, i) => <ListItem key={i} btnText={"Save Job"} result={result} profile={profile} />)}
             </div>    

        )
    }
}
export default SearchResults
