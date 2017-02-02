import React from 'react'
import NoteItem from './NoteItem'
import NoteEditor from './NoteEditor'
import {noteHelpers} from '../../utils/helpers'

export default class Note extends React.Component {
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
  }

  componentDidMount() {
    let currentUser = this.props.profile.email
    noteHelpers.getNotes(this.state.jobIdforNote).then(function(response) {
      //console.log(response.data.Notes)//good
     
    if (response.data.Notes !== this.state.notes) {
      this.setState({
        notes:response.data.Notes
      })
        console.log(this.state.notes)//good
      }
    }.bind(this))
  }

  render () {
    return (
      <div className = "container list">
        <NoteEditor content="Can I edit this" />
      </div>
    )
  }
}
