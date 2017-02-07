import React from 'react'

const SavedJobItem = ({title, id, viewJob, deleteJob}) => {
 return (
  <li>
    <span onClick={ () => {viewJob(id)} }>
      {title}
    </span>
    - <button onClick={ () => {deleteJob(id)} }>X</button>
  </li>
 ) 
}

export default SavedJobItem
