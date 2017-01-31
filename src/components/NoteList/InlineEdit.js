import React from 'react'
import ReactDom from 'react-dom'
import {noteHelpers} from '../../utils/helpers'

export default class InlineEdit extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      editing: props.editing,
      // text: props.text,
      text: this.props.note.noteText,
      jobId:'',
      jobNote: '',
      noteId:'',
      noteCategory: ''
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.handleSubmitEditedNote = this.handleSubmitEditedNote.bind(this)
  }

  static propTypes = {
    text: React.PropTypes.string,
    editing: React.PropTypes.bool
  };

  static defaultProps = {
    // text: "Default data of no note data from db",
    editing: false
  };

  componentDidMount(){
    console.log(this.props.note._id, this.props.note.category)//note showing up
    this.setState({
      jobNote: this.props.note.noteText,
      noteId: this.props.note._id,
      noteCategory: this.props.note.category
    })
  }

  // editElement = () => {
  //   this.setState({editing: true}, () => {
  //     // Focus and select all text
  //     ReactDom.findDOMNode(this.refs.textField.value);
  //     console.log(this.refs.textField.value)
  //   });
  // }
  
  editElement = (e) => {
    this.setState({
      editing: true,
    })
  }

  handleSubmitEditedNote(e){
    // e.preventDefault()
    noteHelpers.editNote(this.props.note._id, e.target.value, this.props.note.category).then(function(response){
      console.log("note updated for " + this.state.noteId + " category " + this.props.note.category)
      console.log(response.data)
    }.bind(this));
    this.setState({
    text: e.target.value
    })
  }


  keyAction = (e) => {
     if(e.keyCode === 13) {
       // Enter to save
       console.log(e.target.value)  //has value
       this.setState({editing: false });
       this.handleSubmitEditedNote(e)
     } else if(e.keyCode === 27) {
       // ESC to cancel
       this.setState({editing: false});
     }
  }

  renderElement = () => {
    if(this.state.editing) {
      return(
        <div>
          <input
            type="text"
            onKeyDown={this.keyAction}
            defaultValue={this.props.note.noteText} 
            ref= "textField" />
        </div>
      );
    } else {
      return(
        <div onDoubleClick={this.editElement}>
          <p>{this.state.text}</p>
          <hr />
        </div>
      );
    }
  }

  render() {
    return this.renderElement();
  }
}