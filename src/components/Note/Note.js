import React, {Component} from 'react'

class Note extends Component {
  render () {
    return (
      <div>
        <p>The Note = {this.props.note.noteText}</p>
        <p>category = {this.props.note.category}</p>
        <hr />
      </div>
    )
  }
}

export default Note
