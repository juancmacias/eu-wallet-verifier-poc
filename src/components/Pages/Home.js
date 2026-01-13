import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="container-custom">
        <section className="hero">
          <div className="hero-content">
            <h1>🇪🇺 EU Digital Identity Wallet</h1>
            <h2>Verificador - Prueba de Concepto</h2>
            <p className="hero-description">
              Explora las capacidades del sistema de identidad digital europea (eIDAS 2.0)
              que permite a los ciudadanos de la UE verificar su identidad digitalmente.
            </p>
            <div className="hero-buttons">
              <a href="/eu-wallet-verifier-poc/verifier" className="btn btn-primary">
                Probar Demo
              </a>
              <a href="/eu-wallet-verifier-poc/docs" className="btn btn-secondary">
                Documentación
              </a>
            </div>
          </div>
        </section>

        <section className="features">
          <h3>Características del EU Digital Identity Wallet</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h4>Verificación Digital</h4>
              <p>Verifica tu identidad de forma segura y digital</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h4>Control de Datos</h4>
              <p>Tú decides qué información compartir y con quién</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h4>Credenciales Verificables</h4>
              <p>Usa credenciales digitales verificadas oficialmente</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏛️</div>
              <h4>Servicios Integrados</h4>
              <p>Accede a servicios públicos y privados de forma segura</p>
            </div>
          </div>
        </section>

        <section className="about-project">
          <h3>Sobre este Proyecto</h3>
          <p>
            Este es un Proof of Concept (PoC) educativo inspirado en el proyecto oficial
            <a href="https://github.com/eu-digital-identity-wallet" target="_blank" rel="noopener noreferrer">
              {' '}eu-digital-identity-wallet{' '}
            </a>
            de la Comisión Europea.
          </p>
          <p>
            El objetivo es explorar y demostrar las capacidades del sistema de identidad digital
            europea establecido en el reglamento eIDAS 2.0.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Home;
