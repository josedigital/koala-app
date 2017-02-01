import React from 'react'

var inputInline ={
  padding: 10
};

const TextInput= (props) => {
  return (
    <div className="form-element" style={inputInline}>
      <label htmlFor={props.name} className="form-label">{props.label}</label>
      <input 
        type={props.inputType} 
        name={props.name} 
        value={props.content} 
        onChange={props.controlFunction} 
        placeholder={props.placeHolder}
        id={props.name} />
    </div>
  )
}

TextInput.propTypes = {
  label: React.PropTypes.string.isRequired,
  inputType: React.PropTypes.oneOf(['text','number']).isRequired,
  name: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  controlFunction: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string
}

export default TextInput
