import React from 'react'
import NoteItem from './NoteItem'
import NoteEditor from './NoteEditor'
import NoteListing from './NoteListing'
import {noteHelpers} from '../../utils/helpers'
import TextArea from '../Forms/TextArea'
import Select from '../Forms/Select'

export default class Note extends React.Component {
  constructor (props) {
    super(props)
      this.state = {
        jobId: this.props.job._id,
        noteCategory:'',
        noteText:''
      }
      this.handleCategory = this.handleCategory.bind(this)
      this.handleNoteText = this.handleNoteText.bind(this)
      this.handleSubmitNote = this.handleSubmitNote.bind(this)
  }

  handleCategory (e) {
    this.setState({
      noteCategory: e.target.value
    })
  }

  handleNoteText (e) {
    this.setState({
      noteText: e.target.value
    })
  }
  
  handleSubmitNote(e){
    e.preventDefault()
    let currentUser = this.props.profile.email
    noteHelpers.saveNote(currentUser,this.state.jobId, this.state.noteCategory, this.state.noteText).then(function(response){
      console.log(response.data)
      console.log("jobId, NoteCategory & noteText sent into db")
    }.bind(this));
    this.setState({
      jobId: '',
      noteText: '',
      noteCategory: ''
      
    })
  }

  render () {
    return (
      <div className = "container list">
      <h4>Description</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae molestiae sunt aut, nemo impedit illum debitis unde, quas! Modi similique repudiandae mollitia fugiat magnam maxime excepturi autem minus, explicabo velit! </p>
        <form onSubmit={ this.handleSubmitNote }>
          <p><strong>Select a Note Category:</strong></p>
            <Select 
              name='category'
              controlFunction={this.handleCategory}
              selectedValue={this.state.noteCategory}
              options={['Position Research','Company Information', 'Project Highlights', 'Interview Questions']} />
            <TextArea
              label='Write your note below'
              name='noteText'
              controlFunction={this.handleNoteText}
              content={this.state.noteText} />
            <button type="submit">
              Create Note
            </button>
            </form>
      </div>
    )
  }
}
