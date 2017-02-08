import React from 'react'
import { Link } from 'react-router'
import SearchResults from '../SearchResults/SearchResults';
import SavedJobsList from '../SavedJobsList/SavedJobsList';
import Note from '../Note/Note'
import NoteListing from '../Note/NoteListing'


const DashboardNoteList = ( {props} ) => {
	return (
		<div className="container">

            <div className="Grid around">
                <div className="Cell 12"> 
                    <h3><center>A JOB WILL HAVE BEEN SELECTED AT THIS POINT </center></h3>
                </div>
            </div>
                            
            <div className="Grid">

                <div className="Cell four">
                    <h4>My Jobs</h4>
                    <p>Saved Jobs component will go here after we get the savedJobs array available to this component</p>
                    {/*<SavedJobsList jobs={this.props.jobs}/>*/}
                    {/*This needs the savedJobsArray in state to work poperly*/}
                </div>

                <div className="Cell four" >
                    <Link to='/dashboard/search-jobs'>DashboardSearchJobs</Link>
                    <Note />       
                    
                </div>

                <div className="Cell four">
                    <h4>My Notes</h4>
                    <NoteListing />
                    
                </div>

			</div>

		</div>  
	)
}


export default DashboardNoteList