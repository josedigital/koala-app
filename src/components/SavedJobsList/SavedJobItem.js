import React from 'react'
import { Link } from 'react-router'

const SavedJobItem = ({title, id, viewJob, deleteJob}) => {
 return (
  <li>
    <span onClick={ () => {viewJob(id)} }>
      <Link to={'/dashboard/job/:id/notes'+ id}>{title}</Link>
    </span>
    - <button onClick={ () => {deleteJob(id)} }>X</button>
  </li>
 ) 
}

export default SavedJobItem
