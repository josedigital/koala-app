import React from 'react'

import {noteHelpers} from '../../utils/helpers'

import EditableChild from '../EditableChild/EditableChild'
import TextArea from '../Forms/TextArea'
import TextInput from '../Forms/TextInput'
import Select from '../Forms/Select'

class NoteEdit extends React.Component {
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
     this.handleEditNote = this.handleEditNote.bind(this)
    
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
    // e.preventDefault()
    noteHelpers.deleteNote(this.state.jobId, this.state.noteId).then(function(){
      console.log("jobId & noteId sent into db for deletion")
    }.bind(this));
    this.setState({
      jobId: '',
      noteId: ''
    })
  }

  handleEditNote(jobNote, noteId, noteCategory){
      console.log("info back from child")
    // noteHelpers.saveNote(this.state.jobId, this.state.noteCategory, this.state.jobNote).then(function(){
    //     console.log("jobId & jobNote sent into db")
    // }.bind(this));
    // this.setState({
    //     jobId: '',
    //     jobNote: '',
    //     noteCategory: ''
        
    // })
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

            <h3>Can we edit notes for Andy's first Job?, 5883bcf07270048fdcd1dd00</h3>

            <p>psuedo code for "edit" life cycle</p>
            <p>db Get user/job/notes -> save what is returned to state -> rendor to DOM notes in an editable format -> make changes to note -> db Update user/job/note -> (?)db Get user/job/note -> save what is returned to state -> rendor to DOM "new" notes in an editable format => start cycle over again </p>
            <ol>
              {this.state.selectedJob.map ((note, idx) => <EditableChild handleEditNote={this.handleEditNote} key={idx} note={note} />)}
            </ol>

        </div>

    )
  }
}

export default NoteEdit