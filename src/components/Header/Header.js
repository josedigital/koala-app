import React from 'react'
import { Link } from 'react-router'
import './Header.css'

const Header = ({ isAuthenticated, profile, error, onLoginClick, onLogoutClick }) =>
  <div className="Grid top">
    <div className="Cell three first">
        <h1>Koala App</h1>
    </div>
     <div className="Cell fill">
        <nav className="Main-nav">
          <ul className="Grid center">
            <li className="Cell Main-nav__item"><Link to='/' className="Main-nav__link">Home</Link></li>
            <li className="Cell Main-nav__item"><Link to='/job-list' className="Main-nav__link">Job List</Link></li>
            <li className="Cell Main-nav__item"><Link to='/note-list' className="Main-nav__link">Note List</Link></li>            
            <li className="Cell Main-nav__item"><Link to='/search-results' className="Main-nav__link">Search Results</Link></li>
            <li className="Cell Main-nav__item"><Link to='/dashboard' className="Main-nav__link">Dashboard</Link></li>        
          </ul>
        </nav>
    </div>
      <div className="Cell three"> 
         <div className="Grid center between">
            { !isAuthenticated ? (
              <button onClick={onLoginClick}>Login</button>
            ) : (

              <div className="Profile">
                 <div className="Cell two">
                  <img src={profile.picture} height="100vh" className="Profile__image" />
                </div>
                <div className="Cell eight fill">
                  Welcome, {profile.nickname} <br/>
                   <a onClick={onLogoutClick}>Logout</a>
                </div>
              </div>
            )}
            { error &&
              <p>{error}</p>
            }
          </div>
      </div>
  </div>

Header.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  profile: React.PropTypes.object,
  error: React.PropTypes.string,
  onLoginClick: React.PropTypes.func.isRequired,
  onLogoutClick: React.PropTypes.func.isRequired
}

export default Header
