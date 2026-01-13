import React from 'react';
import './Documentation.css';

const Documentation = () => {
  return (
    <div className="documentation-page">
      <div className="container-custom">
        <h1>Documentación</h1>
        
        <section className="doc-section">
          <h2>¿Qué es el EU Digital Identity Wallet?</h2>
          <p>
            El EU Digital Identity Wallet es parte del reglamento eIDAS 2.0, que permite a
            todos los ciudadanos, residentes y empresas de la UE tener una identidad digital
            europea reconocida en toda la Unión.
          </p>
        </section>

        <section className="doc-section">
          <h2>Características Principales</h2>
          <ul>
            <li><strong>Universal:</strong> Disponible para todos los ciudadanos de la UE</li>
            <li><strong>Seguro:</strong> Protección avanzada de datos personales</li>
            <li><strong>Interoperable:</strong> Funciona en todos los países de la UE</li>
            <li><strong>Control del usuario:</strong> Tú decides qué información compartir</li>
          </ul>
        </section>

        <section className="doc-section">
          <h2>Casos de Uso</h2>
          <ul>
            <li>Identificación en servicios públicos</li>
            <li>Verificación de edad</li>
            <li>Firma digital de documentos</li>
            <li>Acceso a servicios bancarios</li>
            <li>Registro en plataformas online</li>
          </ul>
        </section>

        <section className="doc-section">
          <h2>Referencias Técnicas</h2>
          <ul>
            <li>
              <a href="https://github.com/eu-digital-identity-wallet" target="_blank" rel="noopener noreferrer">
                Repositorio oficial EU Digital Identity Wallet
              </a>
            </li>
            <li>
              <a href="https://digital-strategy.ec.europa.eu/en/policies/eidas-regulation" target="_blank" rel="noopener noreferrer">
                Reglamento eIDAS 2.0
              </a>
            </li>
            <li>
              <a href="https://digital-strategy.ec.europa.eu/en/policies/discover-eudi-wallet-architecture-and-reference-framework" target="_blank" rel="noopener noreferrer">
                Arquitectura y Marco de Referencia
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
