import React, { useEffect, useState } from 'react';
import '../Styles/Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg'
const Navbar = () => {
const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);
  const name=localStorage.getItem("userName")

  return (
    <div className="nav">
      <header>
        <div className="nav-content">
          <div className='logo'>
            <Link to="/">
              <img className="logo1" alt="logo" src={logo}/></Link>
          </div>
          <div className="logo-name"> 
            <h2 className="name">Agri Tech</h2>
          
          </div>
          
          <div className="toggle">
          </div>
          <div className='links'>
            <ul>
              <li className='li-elements' >
                <div className='services'><Link to='/#ser'>Services</Link>
               
            </div>
              </li>
              <li className='li-elements'>
                <div className='partners'><Link to='/loan-calculator'>EMI CALCULATOR</Link></div>
              </li>
              
              </ul>
              </div>
              
              <div className="top-bar">
                <ul>
                  <li className="li-elements">
                    <Link to="/faq">FAQ'S</Link>
                  </li>
                  <li className="li-elements">
                    <Link to="/about">About</Link>
                  </li>
                  {isLoggedIn ? <>
                    <li className="li-elements"> <Link to='/profile'> {name}</Link></li>
                  </>:<>
                  <li className="li-elements">
                    <Link to="/register">Register</Link>
                  </li>
                  <li className="li-elements">
                    <Link to="/login">Login</Link>
                  </li>
                  </>}

                </ul>
          </div>
        </div>
        <div className='socialIcons'></div>
      </header>
    </div>
  );
};

export default Navbar;
