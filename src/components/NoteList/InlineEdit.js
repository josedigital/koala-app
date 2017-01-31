import React from 'react'
import ReactDom from 'react-dom'

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
      noteCategory: '',
      jobIdforNote: ''
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  static propTypes = {
    text: React.PropTypes.string,
    editing: React.PropTypes.bool
  };

  static defaultProps = {
    text: "no data from database",
    editing: false
  };

  handleJobId (e) {
    this.setState({
      jobId: e.target.value
    })
  }

  handleJobNote (e) {
    this.setState({
      jobNote: e.target.value
    })
  }

  componentDidMount(){
    console.log(this.props.note._id)//note showing up
    this.setState({
      jobNote: this.props.note.noteText,
      noteId: this.props.note._id,
      noteCategory: this.props.note.category
    })
  }

  editElement = () => {
    this.setState({editing: true}, () => {
      // Focus and select all text
      ReactDom.findDOMNode(this.refs.textField.value);
      console.log(this.refs.textField.value)
    });
  }

  keyAction = (e) => {
     if(e.keyCode === 13) {
       // Enter to save
       this.setState({text: e.target.value, editing: false});
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
            defaultValue={this.state.text}
            ref="textField" />
        </div>
      );
    } else {
      return(
        <div onDoubleClick={this.editElement}>
          {this.state.text}
        </div>
      );
    }
  }

  render() {
    return this.renderElement();
  }
}