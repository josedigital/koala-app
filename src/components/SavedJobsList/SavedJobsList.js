import React from 'react'
import SavedJobItem from './SavedJobItem'

const SavedJobsList = ({jobs, viewJob, deleteJob}) => {
  const savedJobs = jobs.map( (job) => <SavedJobItem key={job._id} title={job.title} id={job._id} viewJob={viewJob} deleteJob={deleteJob} />)
  return (
    <ul>
      {savedJobs}
    </ul>
  )
}

export default SavedJobsList
