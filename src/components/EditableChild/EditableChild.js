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
        this.handleSubmitNote = this.handleSubmitNote.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    
  }
  //not using this right now until I find the problem
  handleEdit (e){
      e.preventDefault()
      this.setState({
          jobNote: e.target.value,
          noteId: this.props.note._id,
          noteCategory: this.props.note.category
      })
      console.log(this.state.jobNote)//empty
      this.handleSubmitNote()
  }


  handleSubmitNote(){
      this.props.handleEditNote(
          this.state.jobNote
          )
  }

  componentDidMount(){
      console.log(this.props.note._id)//note showing up
      this.setState({
          jobNote: this.props.note.noteText,
          noteId: this.props.note._id,
          noteCategory: this.props.note.category
      })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleEdit}>
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
    </div>
    )
  }
}

export default EditableChild

// took out of textarea NO WORK defaultValue={this.state.jobNote}