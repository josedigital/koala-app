import React from 'react'
import { SearchResults } from '../index'
import './HomePage.css'

const HomePage = ({saveJob}) =>
  <div className="Home"> 
    <SearchResults saveJob={saveJob} /> 
  </div>

export default HomePage
