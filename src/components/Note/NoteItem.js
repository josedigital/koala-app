import React from 'react'

export default class NoteItem extends React.Component {
  render () {
    return (
      <div>
        <p>Category = {this.props.note.category}</p>
        <p>The Note = {this.props.note.noteText}</p>
        
        <hr />
      </div>
    )
  }
}