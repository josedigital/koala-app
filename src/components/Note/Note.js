import React from 'react'
import NoteItem from './NoteItem'
import NoteEditor from './NoteEditor'
import NoteListing from './NoteListing'
import {noteHelpers} from '../../utils/helpers'

export default class Note extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className = "container list">
        <NoteListing />
      </div>
    )
  }
}
