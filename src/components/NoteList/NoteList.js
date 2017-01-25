import React from 'react'

import {noteHelpers} from '../../utils/helpers'

import Note from '../Note/Note'
import TextArea from '../Forms/TextArea'
import TextInput from '../Forms/TextInput'
import Select from '../Forms/Select'

class NoteList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      jobId:'',
      jobNote: '',
      noteId:'',
      noteCategory: '',
      jobIdforNote: '5883bcf07270048fdcd1dd00',
      jobsArray: [],
      selectedJob: []
    }

     this.handleJobId = this.handleJobId.bind(this)
     this.handleJobNote = this.handleJobNote.bind(this)
     this.handleNoteId = this.handleNoteId.bind(this)
     this.handleCategory = this.handleCategory.bind(this)
     this.handleSubmitNote = this.handleSubmitNote.bind(this)
     this.handleSubmitDelete = this.handleSubmitDelete.bind(this)
    
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

  handleSubmitNote(e){
    e.preventDefault()
    noteHelpers.saveNote(this.state.jobId, this.state.noteCategory, this.state.jobNote).then(function(){
      console.log("jobId & jobNote sent into db")
    }.bind(this));
    this.setState({
      jobId: '',
      jobNote: '',
      noteCategory: ''
      
    })
  }

  handleSubmitDelete(e){
    e.preventDefault()
    noteHelpers.deleteNote(this.state.jobId, this.state.noteId).then(function(){
      console.log("jobId & noteId sent into db for deletion")
    }.bind(this));
    this.setState({
      jobId: '',
      noteId: ''
    })
  }

  componentDidMount() {
    noteHelpers.getNotes(this.state.jobIdforNote).then(function(response) {
      console.log(response.data[0].Jobs[0]._id)
    if (response.data[0].Jobs !== this.state.jobsArray) {
        this.setState({
          jobsArray:response.data[0].Jobs
        })
        console.log(this.state.jobsArray)
        for(var i =0; i<this.state.jobsArray.length; i++){
           if ( this.state.jobsArray[i]._id === this.state.jobIdforNote){
            this.setState({
              selectedJob: this.state.jobsArray[i].Notes
            })
          }
        }
      }
      console.log(this.state.selectedJob)
    }.bind(this));
  }

  render () {
    return (
      
        <div className="container list">

            <h3>Notes for Andy's first Job, 5883bcf07270048fdcd1dd00</h3>
            <ol>
              {this.state.selectedJob.map ((note, idx) => <Note key={idx} note={note} />)}
            </ol>
            

            

            <h1>Create Note</h1>

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


        </div>

    )
  }
}

export default NoteList
