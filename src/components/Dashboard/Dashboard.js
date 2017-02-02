import React from 'react'
import SearchForm from '../Forms/SearchForm';

const Dashboard = ( props ) => {
	return (
		<div className="container large">
			<div className="Cell"> 
                <h1><center>Job Title Area</center></h1>
            <div className="Grid around">
                <div className="Cell fill">
                    <p>Left Section (1)<br/>Search bar</p>
                    <SearchForm/>
                        </div>
                <div className="Cell fill" >
                    <h3>Middle Section (2)<br/> Action area</h3>
                        </div>
                <div className="Cell fill">
                    <h3>Right Section (3)<br/> Saved Jobs/Notes</h3>
                        </div>
			</div>
			</div>
		</div>  
	)
}


export default Dashboard