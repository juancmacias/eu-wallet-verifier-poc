import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container-custom">
        <h1>Acerca de este Proyecto</h1>
        
        <section className="about-section">
          <h2>Sobre el PoC</h2>
          <p>
            Este es un <strong>Proof of Concept (PoC)</strong> educativo del verificador de
            identidad digital europea, inspirado en el proyecto oficial de la Comisión Europea.
          </p>
          <p>
            El objetivo es explorar y demostrar las capacidades del sistema de identidad digital
            europea (eIDAS 2.0), permitiendo comprender mejor cómo funciona la verificación de
            credenciales digitales en el contexto europeo.
          </p>
        </section>

        <section className="about-section">
          <h2>Estado del Proyecto</h2>
          <div className="status-badge">🚧 En desarrollo activo</div>
          <p>Este proyecto se encuentra en fase inicial de desarrollo.</p>
          <h3>Objetivos Completados</h3>
          <ul className="checklist">
            <li className="checked">✅ Comprender la arquitectura del EU Digital Identity Wallet</li>
            <li className="checked">✅ Implementar interfaz de verificación básica</li>
          </ul>
          <h3>Próximos Pasos</h3>
          <ul className="checklist">
            <li>⏳ Integrar verificación de credenciales simuladas</li>
            <li>⏳ Crear flujo de autenticación completo</li>
            <li>⏳ Documentar hallazgos y recomendaciones</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Tecnologías Utilizadas</h2>
          <div className="tech-stack">
            <span className="tech-badge">React 18</span>
            <span className="tech-badge">React Router</span>
            <span className="tech-badge">JavaScript ES6+</span>
            <span className="tech-badge">CSS3</span>
          </div>
        </section>

        <section className="about-section">
          <h2>Autor</h2>
          <div className="author-card">
            <h3>Juan Carlos Macías</h3>
            <div className="author-links">
              <a href="https://juancarlosmacias.es" target="_blank" rel="noopener noreferrer">
                🌐 Portfolio
              </a>
              <a href="https://github.com/juancmacias" target="_blank" rel="noopener noreferrer">
                💻 GitHub
              </a>
              <a href="https://www.linkedin.com/in/juancarlosmacias/" target="_blank" rel="noopener noreferrer">
                💼 LinkedIn
              </a>
            </div>
          </div>
        </section>

        <section className="about-section disclaimer">
          <h2>Aviso Legal</h2>
          <p>
            Este PoC es <strong>independiente</strong> y no está oficialmente afiliado con la
            Comisión Europea. Es un proyecto educativo para explorar las tecnologías del
            EU Digital Identity Wallet.
          </p>
          <p>
            Licencia: <strong>MIT</strong> - Consulta el repositorio para más detalles.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
