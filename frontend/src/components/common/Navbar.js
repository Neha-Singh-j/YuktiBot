import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          YuktiBot
          <span className="logo-icon">🤖</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/code-editor" className="navbar-link">Editor</Link>
          <Link to="/interview" className="navbar-link">Interview</Link>
          <Link to="/about" className="navbar-link">About</Link>
          <Link to="/contact" className="navbar-link">Contact</Link>
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/signup" className="navbar-link">Signup</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;