import React, { Component } from 'react';

import {jobHelpers} from '../../utils/helpers'

export default class ListItem extends Component {
constructor(props) {
		super(props)
			this.state = {}

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(e){
		e.preventDefault()
		jobHelpers.saveJob(this.props.user, this.props.result.title, this.props.result.url, this.props.result.location)//missing this.state.summary from api call
      	.then(function (response) {
        console.log("4 prop values sent to DB through saveJob helper")
		console.log(response.data)
		  }.bind(this))
	}
		

	render() {
		return (	
			<div className="container">
	       		 <form onSubmit={ this.handleSubmit }>          
						<h4>{this.props.result.title}</h4>
						 <p>Hiring Company: {this.props.result.company}</p>
						 <p>{this.props.result.location}</p>
						 <a href={this.props.result.url} target="_blank" value={this.props.url}>Job Description</a>
						 <br />
						 <br />
						 <button type='submit'>Save Job</button>
						 
						 {/*<a className="btn btn-warning" href={`#/ViewListings/${this.props.result.title}`}>{this.props.btnText}</a>*/}
				</form>
			</div>			
		);
	}
}