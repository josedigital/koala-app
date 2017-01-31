import React from 'react'

import {noteHelpers} from '../../utils/helpers'

import Note from '../Note/Note'
import TextArea from '../Forms/TextArea'
import TextInput from '../Forms/TextInput'
import Select from '../Forms/Select'
import InlineEdit from './InlineEdit'

class NoteList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      jobId:'',
      jobNote: '',
      noteId:'',
      noteCategory: '',
      jobIdforNote: '588fee2814aacf02c224a2a8',
      notes: [],
      selectedJob: [],
      currentNoteValue: "I need to edit this on the fly which is {this.state.currentNoteValue}"
    }

     this.handleJobId = this.handleJobId.bind(this)
     this.handleJobNote = this.handleJobNote.bind(this)
     this.handleNoteId = this.handleNoteId.bind(this)
     this.handleCategory = this.handleCategory.bind(this)
     this.handleSubmitNote = this.handleSubmitNote.bind(this)
     this.handleSubmitDelete = this.handleSubmitDelete.bind(this)
     this.handleEditNote = this.handleEditNote.bind(this)
     this.handleSubmitEditedNote = this.handleSubmitEditedNote.bind(this)
     this.handleSubmitGetNotes = this.handleSubmitGetNotes.bind(this)
    

    
  }
  handleJobId (e) {
    this.setState({
      jobId: e.target.value
    })
  }

  handleJobNote (e) {
    this.setState({
      jobNote: e.target.value
    })
  }

  handleNoteId (e) {
    this.setState({
      noteId: e.target.value
    })
  }

  handleCategory (e) {
    this.setState({
      noteCategory: e.target.value
    })
  }

  handleEditNote (e) {
    this.setState({
      currentNoteValue: e.target.value
    })
  }

  handleSubmitNote(e){
    e.preventDefault()
    let currentUser = this.props.profile.email
    noteHelpers.saveNote(currentUser,this.state.jobId, this.state.noteCategory, this.state.jobNote).then(function(response){
      console.log(response.data)
      console.log("jobId, NoteCategory & jobNote sent into db")
    }.bind(this));
    this.setState({
      jobId: '',
      jobNote: '',
      noteCategory: ''
      
    })
  }

  handleSubmitDelete(e){
    e.preventDefault()
    let currentUser = this.props.profile.email
    noteHelpers.deleteNote(currentUser, this.state.jobId, this.state.noteId).then(function(data){
      console.log("jobId & noteId sent into db for deletion")
      console.log(data.data)
    }.bind(this));
    this.setState({
      jobId: '',
      noteId: ''
    })
  }

  handleSubmitEditedNote(e){
    e.preventDefault()
    //let currentUser = this.props.profile.email
    //let georgeJobId = '588d04873a136af32247aa73'
    let georgeNoteId = '588ee0f87efdb733a8d5efcb'
    let editedCategory = 'Interview Questions'
    let currentNoteValue = this.state.currentNoteValue
    noteHelpers.editNote(georgeNoteId, currentNoteValue, editedCategory).then(function(response){
      console.log("note updated for noteId 588ee0f87efdb733a8d5efcb")
      console.log(response.data)
    }.bind(this));
    this.setState({
    currentNoteValue: ""
    })
  }

  handleSubmitGetNotes(e){
    e.preventDefault()
    let currentUser = this.props.profile.email
    noteHelpers.getNotes(this.state.jobId).then(function(response) {
      //console.log(response.data.Notes)//good
     
    if (response.data.Notes !== this.state.notes) {
        this.setState({
          notes:response.data.Notes
        })
        //console.log(this.state.notes)//good
      }
    }.bind(this));

  }


  render () {
    return (
      
        <div className="container list">

            <h1>Search for Note, Enter a job id that has notes</h1>
            <form onSubmit={ this.handleSubmitGetNotes }>
              <TextInput 
                label='Enter a job_id that note belongs to'
                inputType='text'
                name='jobId'
                controlFunction={this.handleJobId}
                content={this.state.jobId}
                placeholder='55689900083355' />
                <button type="submit">
                Search for Notes
              </button>
            </form>


            
              {this.state.notes.map ((note, idx) => <Note key={idx} note={note} />)}
            
            

            

            <h1>Create a Notes for {this.props.profile.nickname}s' Jobs</h1>

            <form onSubmit={ this.handleSubmitNote }>
              <TextInput 
                label='Enter a job_id that note belongs to'
                inputType='text'
                name='jobId'
                controlFunction={this.handleJobId}
                content={this.state.jobId}
                placeholder='55689900083355' />

              <p>Select a Note Category:</p>
              <Select 
                name='category'
                controlFunction={this.handleCategory}
                selectedValue={this.state.noteCategory}
                options={['Position Research','Company Information', 'Project Highlights', 'Interview Questions']} />

              <TextArea
                label='Create a note for the job_id above'
                name='jobNote'
                controlFunction={this.handleJobNote}
                content={this.state.jobNote} />

              <button type="submit">
                Create Note
              </button>

            </form>

            <h1>Delete Note </h1>
            <form onSubmit={ this.handleSubmitDelete }>
              <TextInput 
                label='Enter a job_id that note belongs to'
                inputType='text'
                name='jobId'
                controlFunction={this.handleJobId}
                content={this.state.jobId}
                placeholder='55689900083355' />


              <TextInput 
                label='Enter the note_id you want to delete'
                inputType='text'
                name='noteId'
                controlFunction={this.handleNoteId}
                content={this.state.noteId}
                placeholder='2480928709872' />

              <button type="submit">
                Delete Note
              </button>
            </form>
            <hr />
            <h1>Update the value of a Note </h1>
            <p>User = Current User</p>
            <p>JobId = hard coded job.id from George's DB for testing</p>
            <p>NoteId = hard coded note.id from George's DB for testing</p>
            <p>Current note value = {this.state.currentNoteValue}</p>
            <form onSubmit={this.handleSubmitEditedNote}>
          
              <TextArea
                label='Edit this note text'
                inputType='text'
                name='currentNoteValue'
                onChange={this.handleEditNote}
                controlFunction={this.handleEditNote}
                content={this.state.currentNoteValue}
                placeholder={this.state.currentNoteValue} />

              <button type="submit">
                Edit Note
              </button>


            </form>
            
        </div>

    )
  }
}

export default NoteList

