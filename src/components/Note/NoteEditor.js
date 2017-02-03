import React from 'react'
import {noteHelpers} from '../../utils/helpers'

export default class NoteEditor extends React.Component {
  constructor(props){
    super(props);
    this.state={
      editing: false,
      content: 'testing',
      jobNote: '',
      noteId:'',
      noteCategory: '',
    };
    this.handleSubmitEditedNote = this.handleSubmitEditedNote.bind(this);
    this.startEditing = this.startEditing.bind(this);
		this.finishEditing = this.finishEditing.bind(this);
		this.newChanges = this.newChanges.bind(this);
		this.renderEdit = this.renderEdit.bind(this);
		this.renderNoteToEdit = this.renderNoteToEdit.bind(this);
	}

  componentDidMount() {
    this.setState({
      content: this.props.content ? this.props.content: '',
      jobNote: this.props.note.noteText,
      noteId: this.props.note._id,
      noteCategory: this.props.note.category
    });
  }

  handleSubmitEditedNote(e){
    // e.preventDefault()
    noteHelpers.editNote(this.props.note._id, this.state.content, this.props.note.category).then(function(response){
      console.log("note updated for " + this.state.noteId + " category " + this.props.note.category)
      console.log(response.data)
    }.bind(this));
  }

  finishEditing (e) {
    let editing = this.state.editing;
    this.setState({
      editing: false
    })
    this.handleSubmitEditedNote(e);

    // if(this.props.onEditingFinish){
    //   this.props.onEditingFinish(e, this.state.content);
    // }
  }

  startEditing (e) {
    let editing = this.state.editing;
    this.setState({
      editing: true
    })

    // if(this.props.onEditingStart){
    //   this.props.onEditingStart(e, this.state.content);
    // }
  }

  newChanges (e) {
    let content = e.target.value;
    this.setState({
      content: content
    })
  }

  renderEdit () {
    return (
      <div>
        <textarea autoFocus onChange={this.newChanges} value={this.state.content} onBlur={this.finishEditing} />
        <div>
          <button onClick={this.finishEditing} type="button">Finish Edit</button>
        </div>
      </div>
    )
  }

  renderNoteToEdit () {
    return (
      <span onClick={this.startEditing}>
        {this.state.content}
      </span>
    )
  }

  render () {
    return (
      <div>
        {this.state.editing ? (this.renderEdit()) : (this.renderNoteToEdit())}
      </div>
    )
  }
}

