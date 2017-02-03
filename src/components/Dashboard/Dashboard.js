import React from 'react'
import SearchResults from '../SearchResults/SearchResults';

const Dashboard = ( props ) => {
	return (
		<div className="container full">

            <div className="Grid around">
                <div className="Cell 12"> 
                    <h2><center>Job Title Area</center></h2>
                </div>
            </div>
                            
            <div className="Grid">

                <div className="Cell four">
                    <SearchResults/>
                </div>

                <div className="Cell four" >
                    <p>Middle Section (2)<br/> Action area</p>
                </div>

                <div className="Cell four">
                    <p>Right Section (3)<br/> Saved Jobs/Notes</p>
                </div>

			</div>

		</div>  
	)
}


export default Dashboard