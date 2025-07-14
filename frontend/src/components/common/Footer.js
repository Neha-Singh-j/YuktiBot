import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <Link to="/" className="footer-logo-link">
            YuktiBot
          </Link>
          <p>Master your coding interviews with AI</p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Resources</h4>
            <Link to="/questions">Interview Questions</Link>
            <Link to="/guide">Interview Guide</Link>
            <Link to="/blog">Blog</Link>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>

          <div className="footer-column">
            <h4>Connect</h4>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} YuktiBot. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;