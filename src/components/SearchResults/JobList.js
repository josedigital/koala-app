import React, { Component } from 'react'
import ListItem from './ListItem';

const JobList = ({ jobList, handleSave }) => {
	return (
		<div className="container">
			<div className="Grid"> 
			{jobList.map((result, i) => <ListItem key={i} btnText={"Save Job"} result={result} handleSave={handleSave} />)}
			</div>
		</div>  
	)
}


export default JobList
