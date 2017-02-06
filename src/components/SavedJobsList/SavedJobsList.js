import React from 'react'
import SavedJobItem from './SavedJobItem'

const SavedJobsList = ({jobs, deleteJob}) => {
  console.log('jobs'+jobs)
  const savedJob = jobs.map( (job) => <SavedJobItem key={job._id} title={job.title} id={job._id} deleteJob={deleteJob} />)
  return (
    <ul>
      {savedJob}
    </ul>
  )
}

export default SavedJobsList
