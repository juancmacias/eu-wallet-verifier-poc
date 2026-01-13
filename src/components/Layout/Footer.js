import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container-custom">
        <div className="footer-content">
          <div className="footer-section">
            <h3>EU Wallet Verifier PoC</h3>
            <p>Prueba de concepto del sistema de identidad digital europea</p>
          </div>
          
          <div className="footer-section">
            <h4>Enlaces</h4>
            <ul>
              <li><a href="https://github.com/juancmacias/eu-wallet-verifier-poc" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://digital-strategy.ec.europa.eu/en/policies/eidas-regulation" target="_blank" rel="noopener noreferrer">eIDAS 2.0</a></li>
              <li><a href="https://github.com/eu-digital-identity-wallet" target="_blank" rel="noopener noreferrer">EU DI Wallet</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Autor</h4>
            <p>Juan Carlos Macías</p>
            <p><a href="https://juancarlosmacias.es" target="_blank" rel="noopener noreferrer">juancarlosmacias.es</a></p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Juan Carlos Macías. Licencia MIT.</p>
          <p className="disclaimer">
            Proyecto educativo independiente, no afiliado con la Comisión Europea.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
