import React, { Component } from 'react';

const ListItem = ({ result, handleSave, url }) => {
	return (
		<div className="container medium center">
			<h4>{result.title}</h4>
			<p>Hiring Company: {result.company}</p>
			<p>{result.location}</p>
			<a href={result.url} target="_blank" value={url}>Job Description</a>
			<br />
			<button onClick={ () => { handleSave(result) } }>Save Job</button>
			<hr/>
		</div>
	)
}

export default ListItem
