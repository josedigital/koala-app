import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { AppContainer } from './containers'

import { HomePage, AboutPage, CustomJob, NotFoundPage, Note, NoteEdit, SearchResults, EditJob, Misc, Delete } from './components'

export default function createRoutes() {
  return(
    <Route path='/' component={AppContainer}>
      <IndexRoute component={HomePage} />
      <Route path='/about' component={AboutPage} />
      <Route path='/job-list' component={CustomJob} />
      <Route path='/note-list' component={Note} />
      <Route path='/note-edit' component={NoteEdit} />
      <Route path = '/search-results' component = { SearchResults } />
      <Route path ='/edit-job' component = { EditJob } />
      <Route path = '/misc' component = { Misc } />
      <Route path = '/delete-button' component = { Delete } />

      <Route path='*' component={NotFoundPage} />
      
    </Route>
  )
}
