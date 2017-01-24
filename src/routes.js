import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { AppContainer } from './containers'
import { HomePage, AboutPage, CustomJob, NotFoundPage } from './components'

export default function createRoutes() {
  return(
    <Route path='/' component={AppContainer}>
      <IndexRoute component={HomePage} />
      <Route path='/about' component={AboutPage} />
      <Route path='/job-list' component={CustomJob} />
      <Route path='*' component={NotFoundPage} />
    </Route>
  )
}
