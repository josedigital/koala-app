import React from 'react'
import {noteHelpers, jobHelpers} from '../../utils/helpers'
import Delete from '../ListActions/Delete'
import NoteItem from './NoteItem'

export default class NoteListing extends React.Component {
  constructor (props) {
  super(props)
    this.state = {
      jobId: '588fee2814aacf02c224a2a8',
      notes: []
    };
  }

  componentDidMount() {
    let currentUser = this.state.user
    console.log(currentUser)
    console.log(this.state.jobId)
    noteHelpers.getNotes(this.state.jobId).then(function(response) { 
    if (response.data.Notes !== this.state.notes) {
        this.setState({
          notes:response.data.Notes
        })
        console.log(this.state.notes)//good
      }
    }.bind(this));
  }

  render () {
    return (
      <div>
        {this.state.notes.map ((note, idx) => <NoteItem key={idx} note={note} />)}
      </div>
    )
  }
}