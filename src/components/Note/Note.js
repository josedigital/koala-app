import React, {Component} from 'react'

class Note extends Component {
  render () {
    return (
      <li>
        <p>{this.props.note.noteText}</p>
        <p>{this.props.note.category}</p>
        <hr />
    </li>
    )
  }
}

export default Note
