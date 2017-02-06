import React from 'react'
import { Link } from 'react-router'
import SearchResults from '../SearchResults/SearchResults';
import SavedJobsList from '../SavedJobsList/SavedJobsList';


const DashboardSearchJobs = ( {props} ) => {
	return (
		<div className="container">

            <div className="Grid around">
                <div className="Cell 8"> 
                    <h3>this is the DashboardSearchJobs</h3>
                </div>
            </div>
                            
            <div className="Grid">

                <div className="Cell four">
                    <h4>My Jobs</h4>
                    <p>Saved Jobs component will go here after we get the savedJobs array available to this component</p>
                    {/*<SavedJobsList jobs={this.props.jobs}/>*/}
                    {/*This needs the savedJobsArray in state to work poperly*/}
                </div>

                <div className="Cell eight" >
                    <SearchResults/>

                </div>

			</div>

		</div>  
	)
}


export default DashboardSearchJobs