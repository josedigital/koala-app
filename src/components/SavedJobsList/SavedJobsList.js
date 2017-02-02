import React from 'react'
import SavedJobItem from './SavedJobItem'

const SavedJobsList = ({jobs}) => {
  const savedJob = jobs.map( (job) => <SavedJobItem key={job._id} title={job.title} />)
  return (
    <ul>
      {savedJob}
    </ul>
  )
}

export default SavedJobsList
