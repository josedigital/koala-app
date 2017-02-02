import React from 'react'
import { Link } from 'react-router'


const Misc = (props) => {
  return (
    <div>
        <h1>Links to single components</h1>
        
          <Link to='/edit-job' >Edit Job</Link>
          <hr />
          <Link to='/delete-button'>Delete Button</Link>
        
    </div>
  )
}



export default Misc