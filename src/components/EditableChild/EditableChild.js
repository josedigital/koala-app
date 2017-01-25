import React, {Component} from 'react'

class EditableChild extends Component {
    constructor (props) {
        super(props)
            this.state = {
                jobId:'',
                jobNote: '',
                noteId:'',
                noteCategory: '',
                jobIdforNote: ''
                }

        this.handleEdit = this.handleEdit.bind(this)
    
  }

  handleEdit (e){
      this.setState({
          jobNote: e.target.value,
          noteId: this.props.note._id,
          noteCategory: this.props.note.category
      })
  }

   //this is the problem here, this prop is only available in the <li> --i think??
//   handleSubmitNote(e){
//       e.preventDefault()
//       this.props.handleEditNote(this.state.jobNote, this.state.noteId, this.state.noteCategory)
     
//   }

  render () {
    return (
      <li>
        <form onSubmit={this.handleSubmitNote}>
            <textarea
                defaultValue={this.props.note.noteText}
                label='Create or Edit a note'
                name='jobNote'
                >       
            </textarea>
        <button type='submit'>Save Edit</button>
        </form>
        <p>{this.props.note.category}</p>
        
        <hr />
    </li>
    )
  }
}

export default EditableChild