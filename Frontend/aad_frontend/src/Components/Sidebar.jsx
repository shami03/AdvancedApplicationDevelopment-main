import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Sidebar.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const currentPath = location.pathname;
  const nav = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userRole = localStorage.getItem('userRole');
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const name = localStorage.getItem('userName');

  const closeSidebar = () => {
    setIsOpen(false);
  };
  const handleResize = () => {
    if (window.innerWidth <= 768) { 
      setIsOpen(false);
    }
    if (window.innerWidth > 768) { 
      setIsOpen(true);
    }
  };

  window.addEventListener('resize', handleResize);
  const renderMenuItems = () => {
    switch (userRole) {
      case 'admin':
        return (
          <>
            <li>
              <Link to="/admin-dashboard" className={currentPath === '/admin-dashboard' ? 'selected' : ''}>
                {isOpen ? <><DashboardIcon /> &nbsp;Dashboard</> : <PersonIcon />}
              </Link>
            </li>
            <li>
              <Link to="/users" className={currentPath === '/users' ? 'selected' : ''}>
                {isOpen ? <><PersonIcon /> &nbsp;Users</> : <PersonIcon />}
              </Link>
            </li>
            <li>
              <Link to="/banks" className={currentPath === '/banks' ? 'selected' : ''}>
                {isOpen ? <><AccountBalanceIcon />&nbsp; Banks</> : <AccountBalanceIcon />}
              </Link>
            </li>
            <li>
              <Link to="/all-loans" className={currentPath === '/all-loans' ? 'selected' : ''}>
                {isOpen ? <><AccountBalanceIcon /> &nbsp;Loans</> : <AccountBalanceIcon />}
              </Link>
            </li>
            <li>
              <Link to="/schemes" className={currentPath === '/schemes' ? 'selected' : ''}>
                {isOpen ? <><DescriptionIcon /> &nbsp;Schemes</> : <DescriptionIcon />}
              </Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout} className={currentPath === '/logout' ? 'selected' : ''}>
                {isOpen ? <><LogoutIcon /> &nbsp;Logout</> : <LogoutIcon />}
              </Link>
            </li>
          </>
        );
      case 'bank':
        return (
          <>
            <li>
              <Link to="/bank-dashboard" className={currentPath === '/bank-dashboard' ? 'selected' : ''}>
                {isOpen ? <><DashboardIcon /> &nbsp;Dashboard</> :   <DashboardIcon />}
              </Link>
            </li>
            <li>
              <Link to="/applications" className={currentPath === '/applications' ? 'selected' : ''}>
                {isOpen ? <><AccountBalanceIcon /> &nbsp;Applications</> : <AccountBalanceIcon />}
              </Link>
            </li>
            <li>
              <Link to="/reports" className={currentPath === '/reports' ? 'selected' : ''}>
                {isOpen ? <><DescriptionIcon /> &nbsp;Reports</> : <DescriptionIcon />}
              </Link>
            </li>
            <li>
              <Link to="/documents" className={currentPath === '/documents' ? 'selected' : ''}>
                {isOpen ? <><DescriptionIcon /> &nbsp;Documents</> : <DescriptionIcon />}
              </Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout} className={currentPath === '/logout' ? 'selected' : ''}>
                {isOpen ? <><LogoutIcon />&nbsp; Logout</> : <LogoutIcon />}
              </Link>
            </li>
          </>
        );
      default:
        return (
          <>
            <li>
              <Link to="/user" className={currentPath === '/user' ? 'selected' : ''}>
                {isOpen ? <><DashboardIcon /> &nbsp;Dashboard</> : <DashboardIcon />}
              </Link>
            </li>
            <li>
              <Link to="/loans" className={currentPath === '/loans' ? 'selected' : ''}>
                {isOpen ? <><AccountBalanceIcon /> &nbsp;Loans</> : <AccountBalanceIcon />}
              </Link>
            </li>
            <li>
              <Link to="/documents" className={currentPath === '/documents' ? 'selected' : ''}>
                {isOpen ? <><DescriptionIcon /> &nbsp;Documents</> : <DescriptionIcon />}
              </Link>
            </li>
            <li>
              <Link to="/profile" className={currentPath === '/profile' ? 'selected' : ''}>
                {isOpen ? <><PersonIcon /> &nbsp;Profile</> : <PersonIcon />}
              </Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout} className={currentPath === '/logout' ? 'selected' : ''}>
                {isOpen ? <><LogoutIcon /> &nbsp; Logout</> : <LogoutIcon />}
              </Link>
            </li>
          </>
        );
    }
  };
  

  const handleLogout = () => {
    if (window.confirm('Are you sure')) {
      localStorage.setItem('isLoggedIn', false);
      localStorage.setItem('userName', '');
      localStorage.setItem('userRole', '');
      nav('/');
    } else {
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'close'}`}>
      <div className="sidebar-header">
        <div className="logo">
          {isOpen ? (
            <div className="logo-div">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="logo" />
              <h5>{name}</h5>
            </div>
          ) : (
            <img onClick={toggleSidebar} className="logo-close" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="logo" />
          )}
        </div>
        <div className="toggle-button" onClick={toggleSidebar}>
          {isOpen ? <MenuIcon /> : <></>}
        </div>
      </div>
      <div className={`menu-container ${isOpen ? 'open' : 'close'}`}>
        <ul className="sidebar-menu">
          {renderMenuItems()}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
