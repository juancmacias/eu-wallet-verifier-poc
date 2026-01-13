import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="container-custom">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-icon">🇪🇺</div>
            <div className="logo-text">
              <span className="logo-title">EU Wallet Verifier</span>
              <span className="logo-subtitle">eIDAS 2.0 PoC</span>
            </div>
          </Link>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              to="/verifier" 
              className={`nav-link ${isActive('/verifier') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Demo Verificador
            </Link>
            <Link 
              to="/docs" 
              className={`nav-link ${isActive('/docs') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Documentación
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Acerca de
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
