import React from 'react'
import { browserHistory } from 'react-router'
import { SearchResults } from '../index'
import './HomePage.css'

const HomePage = ({saveJob, profile}) =>
  <div className="Home">
    {profile ? browserHistory.push('/dashboard') : 'home' }
  </div>

export default HomePage
