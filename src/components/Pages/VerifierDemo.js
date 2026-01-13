import React from 'react';
import './VerifierDemo.css';

const VerifierDemo = () => {
  return (
    <div className="verifier-demo-page">
      <div className="container-custom">
        <h1>Demo del Verificador</h1>
        <div className="demo-container">
          <div className="coming-soon">
            <div className="coming-soon-icon">🚧</div>
            <h2>Próximamente</h2>
            <p>
              La demo interactiva del verificador de credenciales está en desarrollo.
            </p>
            <p>
              Aquí podrás probar el proceso de verificación de credenciales digitales
              del EU Digital Identity Wallet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifierDemo;
