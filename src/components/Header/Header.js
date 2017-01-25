import React from 'react'
import { Link } from 'react-router'
import './Header.css'

const Header = ({ isAuthenticated, profile, error, onLoginClick, onLogoutClick }) =>
  <div>
    <h1>Koala App</h1>
    <nav className="Main-nav">
      <ul className="Grid center">
        <li className="Cell Main-nav__item"><Link to='/' className="Main-nav__link">Home</Link></li>
        <li className="Cell Main-nav__item"><Link to='/about' className="Main-nav__link">About</Link></li>
        <li className="Cell Main-nav__item"><Link to='/job-list' className="Main-nav__link">Job List</Link></li>
        <li className="Cell Main-nav__item"><Link to='/note-list' className="Main-nav__link">Note List</Link></li>
        <li className="Cell Main-nav__item"><Link to='/note-edit' className="Main-nav__link">Note Edit</Link></li>
      </ul>
    </nav>
    
    { !isAuthenticated ? (
      <button onClick={onLoginClick}>Login</button>
    ) : (
      <div className="Profile">
        <img src={profile.picture} height="100vh" className="Profile__image" />
        <br/>
        <span>Welcome, {profile.nickname}</span>
        <br/>
        <button onClick={onLogoutClick}>Logout</button>
      </div>
    )}
    { error &&
      <p>{error}</p>
    }
  </div>

Header.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  profile: React.PropTypes.object,
  error: React.PropTypes.string,
  onLoginClick: React.PropTypes.func.isRequired,
  onLogoutClick: React.PropTypes.func.isRequired
}

export default Header
