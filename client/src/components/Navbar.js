import React, { useContext } from 'react';
import { Link ,useHistory} from 'react-router-dom'
import { UserContext } from '../App'

//Link is used for not to reload the page 
//after clicking the button like signin,signup 
//Also instead of "a" tag use "Link to"
//import {Link} from'react-router-dom'
const Navbar = () => {
  const { state, dispatch } = useContext(UserContext)
  const history = useHistory()
  const renderList = () => {
    if (state) {
      return [
        <li><Link to="/myfollowingpost">Explore</Link></li>,
        <li><Link to="/Profile">Profile</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li>
          <button className="btn #c62828 red darken-3"
            onClick={() => {
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')

              }}
            
            >Logout

          </button>
        </li>
      ]
    } else {
      return [
        <li><Link to="/Signin">Signin</Link></li>,
        <li><Link to="/Signup">Signup</Link></li>
      ]
    }
  }

  return (
    <nav>
      <div className="nav-wrapper white sticky" >
        <Link to={state ? "/" : "/signin"} className="brand-logo left ">Instagram</Link>
        <ul id="nav-mobile" className="right ">
          {renderList()}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;

