import React, { Component } from 'react'
import ListItem from './ListItem';

class JobList extends Component{
	constructor(props){
		super(props)
	}

	render(){
		console.log("Inside JobList Component");
        const profile = (this.props.profile) ? this.props.profile : ''

		return(

			 <div className="container">
	             <div className="Grid"> 
	             {this.props.jobList.map((result, i) => <ListItem key={i} btnText={"Save Job"} result={result} profile={profile} />)}
	             </div>
             </div>   

			)
	}

}
export default JobList
