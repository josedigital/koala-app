import React from 'react'
import { Link } from 'react-router'
import SearchResults from '../SearchResults/SearchResults'
import SavedJobsList from '../SavedJobsList/SavedJobsList'
import DashboardCenterCellMessage from './DashboardCenterCellMessage'
import DashboardRightCellMessage from './DashboardRightCellMessage'

const Dashboard = ( {props} ) => {
	return (
		<div className="container">

            <div className="Grid around">
                <div className="Cell 12"> 
                    <h3><center>on Main Dashboard<br/>message here will be Select a job from My Jobs </center></h3>
                    <Link to='/dashboard'>Dashboard</Link> ~ 
                    <Link to='/dashboard/job/edit/:id'>DashboardEditJob</Link> ~ 
                    <Link to='/dashboard/job/:id/note/edit/:id'>DashboardEditNote</Link> ~ 
                    <Link to='/dashboard/job/:id/notes'>DashboardNoteList</Link> ~ 
                    <Link to='/dashboard/search-jobs'>DashboardSearchJobs</Link> ~ 
                    
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
                    <DashboardCenterCellMessage/>
                    
                </div>

                <div className="Cell four">
                    <h4>My Notes</h4>
                    <DashboardRightCellMessage/>
                    
                </div>

			</div>

		</div>  
	)
}


export default Dashboard