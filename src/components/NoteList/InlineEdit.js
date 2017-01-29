import React from 'react'
import ReactDom from 'react-dom'

export default class InlineEdit extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      editing: props.editing,
      text: props.text
    }
  }

  static propTypes = {
    text: React.PropTypes.string,
    editing: React.PropTypes.bool
  };

  static defaultProps = {
    text: "Default data of no note data from db",
    editing: false
  };

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