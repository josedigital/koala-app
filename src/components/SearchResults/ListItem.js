import React, { Component } from 'react';

export default class ListItem extends Component {
constructor() {
		super();	
	}

	render() {
		return (	
			<div className="container">
	       		 <div className="col-lg-6">          
						<h3>{this.props.result.title}</h3>
						 <p>{this.props.result.company}</p>
						  <a className="btn btn-warning" href={`#/ViewListings/${this.props.result.title}`}>{this.props.btnText}</a>
				</div>
			</div>			
		);
	}
}