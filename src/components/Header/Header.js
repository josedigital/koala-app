import React from 'react'
import { Link } from 'react-router'
import './Header.css'

const Header = ({ isAuthenticated, profile, error, onLoginClick, onLogoutClick }) =>
  <div className="Grid top">
    <div class="Cell three first">
        <h5>Koala App</h5>
    </div>
     <div class="Cell six third">
        <nav className="Main-nav">
          <ul className="Grid center">
            <li className="Cell Main-nav__item"><Link to='/' className="Main-nav__link">Home</Link></li>
            <li className="Cell Main-nav__item"><Link to='/about' className="Main-nav__link">About+</Link></li>
            <li className="Cell Main-nav__item"><Link to='/job-list' className="Main-nav__link">Job List</Link></li>
            <li className="Cell Main-nav__item"><Link to='/note-list' className="Main-nav__link">Note List</Link></li>
            <li className="Cell Main-nav__item"><Link to='/note-edit' className="Main-nav__link">Note Edit</Link></li>
            <li className="Cell Main-nav__item"><Link to='/search-results' className="Main-nav__link">Search Results</Link></li>
            <li className="Cell Main-nav__item"><Link to='/misc' className="Main-nav__link">Misc</Link></li>

          </ul>
        </nav>
    </div>
     <div class="Cell three second"> 
         <div class="Grid center between">
            { !isAuthenticated ? (
              <button onClick={onLoginClick}>Login</button>
            ) : (

              <div className="Profile">
                 <div className="Cell four">
                  <img src={profile.picture} height="100vh" className="Profile__image" />
                </div>
                <div className="Cell four fill">
                  <span>Welcome, {profile.nickname}</span> 
                </div>
                <div className="Cell three">
                  <button onClick={onLogoutClick}>Logout</button>
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
