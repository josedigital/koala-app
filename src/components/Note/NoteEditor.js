import React from 'react'

export default class NoteEditor extends React.Component {
  constructor(props){
    super(props);
    this.state={
      editing: false,
      content: 'testing',
      element_class: 'editor'
    };
    this.startEditing = this.startEditing.bind(this);
		this.finishEditing = this.finishEditing.bind(this);
		this.newChanges = this.newChanges.bind(this);
		this.renderEdit = this.renderEdit.bind(this);
		this.renderNoteToEdit = this.renderNoteToEdit.bind(this);
	}

  componentDidMount() {
    this.setState({
      content: this.props.content ? this.props.content: ''
    });
  }

  finishEditing (e) {
    let editing = this.state.editing;
    this.setState({
      editing: false
    })

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
        <textarea autoFocus className={this.state.element_class + "-edit-area"} onChange={this.newChanges} value={this.state.content} onBlur={this.finishEditing} />
        <div>
          <button className={this.state.element_class + "-finish-btn"} onClick={this.finishEditing} type="button">Finish Edit</button>
        </div>
      </div>
    )
  }

  renderNoteToEdit () {
    return (
      <span className={this.state.element_class + "-editingNote"} onClick={this.startEditing}>
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

