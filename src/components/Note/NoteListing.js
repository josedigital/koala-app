import React from 'react'
import {noteHelpers} from '../../utils/helpers'
import Delete from '../ListActions/Delete'

export default class NoteListing extends React.Component {
  constructor (props) {
  super(props)
    this.state = {
      jobId: this.props.job._id,
      notes: []
    };
  }

  componentDidMount() {
    let currentUser = this.props.profile.email
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