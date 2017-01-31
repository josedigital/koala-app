import React from 'react'

import {noteHelpers} from '../../utils/helpers'

// import EditableChild from '../EditableChild/EditableChild'
import TextArea from '../Forms/TextArea'
import TextInput from '../Forms/TextInput'
import Select from '../Forms/Select'
import InlineEdit from '../NoteList/InlineEdit'

class NoteEdit extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      jobId:'',
      jobNote: '',
      noteId:'',
      noteCategory: '',
      jobIdforNote: '588fee2814aacf02c224a2a8',
      notes: [],
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
    e.preventDefault()
    noteHelpers.deleteNote(this.state.jobId, this.state.noteId).then(function(){
      console.log("jobId & noteId sent into db for deletion")
    }.bind(this));
    this.setState({
      jobId: '',
      noteId: ''
    })
  }

  handleEditNote(jobNote, noteId, noteCategory){
      console.log(jobNote, noteId, noteCategory+'---back from child')
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
    let currentUser = this.props.profile.email
    noteHelpers.getNotes(this.state.jobIdforNote).then(function(response) {
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

            <h3>List of notes, these based on George's job, make it your own by pasting a job._id in noteEdit.js line 18</h3>

            <p>psuedo code for "edit" life cycle</p>
            <p>db Get user/job/notes -> save what is returned to state -> rendor to DOM notes in an editable format -> make changes to note -> db Update user/job/note -> (?)db Get user/job/note -> save what is returned to state -> rendor to DOM "new" notes in an editable format => start cycle over again </p>
            
              {this.state.notes.map ((note, idx) => <InlineEdit handleEditNote={this.handleEditNote} key={idx} note={note} />)}
            

        </div>

    )
  }
}

export default NoteEdit