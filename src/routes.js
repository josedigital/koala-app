import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { AppContainer } from './containers'
import { HomePage, Dashboard, AboutPage, CustomJob, NotFoundPage, Note, NoteEdit, SearchResults, EditJob, Misc, Delete, DashboardEditJob, DashboardEditNote, DashboardNoteList, DashboardSearchJobs } from './components'

export default function createRoutes() {
  return(
    <Route path='/' component={AppContainer}>
      <IndexRoute component={Dashboard} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/about' component={AboutPage} />
      <Route path='/job-list' component={CustomJob} />
      <Route path='/note-list' component={Note} />
      <Route path = '/search-results' component = { SearchResults } />
      <Route path ='/edit-job' component = { EditJob } />
      <Route path = '/misc' component = { Misc } />
      <Route path = '/delete-button' component = { Delete } />

      <Route path = '/dashboard' component = { Dashboard } />
      <Route path = '/dashboard/job/edit/:id' component = { DashboardEditJob } />
      <Route path = '/dashboard/job/:id/note/edit/:id' component = { DashboardEditNote } />
      <Route path = '/dashboard/job/:id/notes' component = { DashboardNoteList } />
      <Route path = '/dashboard/search-jobs' component = { DashboardSearchJobs } />

      <Route path='*' component={NotFoundPage} />
      
    </Route>
  )
}
