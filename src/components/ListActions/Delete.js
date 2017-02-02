import React from 'react'
import {noteHelpers, jobHelpers} from '../../utils/helpers'

class Delete extends React.Component {
  constructor (props) {
    super(props)

    // --- bind submits
    this.SubmitDeleteJob = this.SubmitDeleteJob.bind(this)
    this.SubmitDeleteNote = this.SubmitDeleteNote.bind(this)
    // --- bind handles
    this.SwitchCase = this.SwitchCase.bind(this)
  }
  
  // --- handles
  SwitchCase(){
      let userEmail = this.props.email
      let deleteThis = this.props.deleteThis
      let noteId = this.props.noteId
      let jobId = this.props.jobId

      switch(deleteThis){

          case 'job':
            this.SubmitDeleteJob(userEmail, jobId)
            break

          case 'note':
            this.SubmitDeleteNote(jobId, noteId)
            break
      }
  }

  // --- submits
  SubmitDeleteJob(userEmail, jobId){
    jobHelpers.deleteJob(userEmail, jobId)
    .then(function(data){
    console.log("user email and jobId sent to db for DELETION from Delete Comp #37")
    console.log(data.data)
    }.bind(this));
    //maybe we should give the user a message when the item is deleted?
  }

  SubmitDeleteNote(jobId, noteId){
    noteHelpers.deleteNote(jobId, noteId).then(function(){
      console.log("jobId & noteId sent into db for deletion")
    }.bind(this));
    //maybe we should give the user a message when the item is deleted?
  }

  


render () {
    return (
       <button onClick={ this.SwitchCase }>> Delete </button>
    )
  }
}

export default Delete