import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { AppContainer } from './containers'

import { HomePage, AboutPage, CustomJob, NotFoundPage, NoteList, NoteEdit } from './components'




export default function createRoutes() {
  return(
    <Route path='/' component={AppContainer}>
      <IndexRoute component={HomePage} />
      <Route path='/about' component={AboutPage} />
      <Route path='/job-list' component={CustomJob} />
      <Route path='/note-list' component={NoteList} />
      <Route path='/note-edit' component={NoteEdit} />
      <Route path='*' component={NotFoundPage} />
      
    </Route>
  )
}
