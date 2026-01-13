import React, { useState } from 'react';
import './VerifierDemo.css';

const VerifierDemo = () => {
  const [verificationState, setVerificationState] = useState('idle'); // idle, scanning, verifying, verified, error
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [verifiedData, setVerifiedData] = useState(null);

  const credentialTypes = [
    { id: 'id-card', name: 'Tarjeta de Identidad', icon: '🪪', description: 'DNI/NIE Europeo' },
    { id: 'drivers-license', name: 'Licencia de Conducir', icon: '🚗', description: 'Permiso de conducción' },
    { id: 'age-verification', name: 'Verificación de Edad', icon: '🔞', description: 'Mayor de 18 años' },
    { id: 'student-card', name: 'Carnet de Estudiante', icon: '🎓', description: 'Credencial académica' },
  ];

  const mockVerifiedData = {
    'id-card': {
      name: 'María García López',
      birthDate: '15/03/1990',
      nationality: 'Española',
      documentNumber: 'ES-12345678A',
      issueDate: '01/01/2020',
      expiryDate: '01/01/2030',
    },
    'drivers-license': {
      name: 'María García López',
      licenseNumber: 'ES-DL-9876543',
      categories: 'B, AM',
      issueDate: '10/06/2015',
      expiryDate: '10/06/2035',
    },
    'age-verification': {
      status: 'Verificado',
      message: 'El usuario es mayor de 18 años',
      verified: true,
    },
    'student-card': {
      name: 'María García López',
      university: 'Universidad Complutense de Madrid',
      studentId: 'UCM-2024-5678',
      program: 'Ingeniería Informática',
      validUntil: '30/06/2026',
    },
  };

  const handleSelectCredential = (credential) => {
    setSelectedCredential(credential);
    setVerificationState('idle');
    setVerifiedData(null);
  };

  const handleStartVerification = () => {
    setVerificationState('scanning');
    
    // Simular escaneo QR
    setTimeout(() => {
      setVerificationState('verifying');
      
      // Simular verificación
      setTimeout(() => {
        setVerifiedData(mockVerifiedData[selectedCredential.id]);
        setVerificationState('verified');
      }, 2000);
    }, 2000);
  };

  const handleReset = () => {
    setVerificationState('idle');
    setSelectedCredential(null);
    setVerifiedData(null);
  };

  return (
    <div className="verifier-demo-page">
      <div className="container-custom">
        <h1>Demo del Verificador</h1>
        <p className="demo-intro">
          Simula el proceso de verificación de credenciales digitales del EU Digital Identity Wallet.
          Esta es una demostración educativa con datos ficticios.
        </p>

        {/* Selector de tipo de credencial */}
        {!selectedCredential && (
          <div className="credential-selector">
            <h2>Selecciona el tipo de credencial a verificar</h2>
            <div className="credential-grid">
              {credentialTypes.map((credential) => (
                <div
                  key={credential.id}
                  className="credential-card"
                  onClick={() => handleSelectCredential(credential)}
                >
                  <div className="credential-icon">{credential.icon}</div>
                  <h3>{credential.name}</h3>
                  <p>{credential.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Proceso de verificación */}
        {selectedCredential && (
          <div className="verification-process">
            <div className="selected-credential-info">
              <span className="credential-icon-large">{selectedCredential.icon}</span>
              <div>
                <h3>{selectedCredential.name}</h3>
                <p>{selectedCredential.description}</p>
              </div>
            </div>

            {verificationState === 'idle' && (
              <div className="verification-step">
                <h2>Iniciar Verificación</h2>
                <p>El usuario escaneará un código QR con su EU Digital Identity Wallet para compartir sus credenciales.</p>
                <button className="btn btn-primary" onClick={handleStartVerification}>
                  🔍 Generar código QR y verificar
                </button>
              </div>
            )}

            {verificationState === 'scanning' && (
              <div className="verification-step scanning">
                <div className="qr-code-mock">
                  <div className="qr-pattern"></div>
                </div>
                <h2>Esperando escaneo...</h2>
                <p>El usuario debe escanear este código QR con su wallet</p>
                <div className="loading-spinner"></div>
              </div>
            )}

            {verificationState === 'verifying' && (
              <div className="verification-step verifying">
                <div className="verification-icon">🔐</div>
                <h2>Verificando credenciales...</h2>
                <p>Validando la autenticidad de los datos</p>
                <div className="loading-spinner"></div>
              </div>
            )}

            {verificationState === 'verified' && verifiedData && (
              <div className="verification-step verified">
                <div className="verification-icon success">✅</div>
                <h2>Credencial Verificada</h2>
                <div className="verified-data">
                  {Object.entries(verifiedData).map(([key, value]) => (
                    <div key={key} className="data-row">
                      <span className="data-label">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="data-value">{value}</span>
                    </div>
                  ))}
                </div>
                <p className="verification-note">
                  ✓ Los datos han sido verificados criptográficamente<br />
                  ✓ La firma digital es válida<br />
                  ✓ El emisor está autorizado
                </p>
              </div>
            )}

            <button className="btn btn-secondary" onClick={handleReset}>
              ← Verificar otra credencial
            </button>
          </div>
        )}

        <div className="demo-disclaimer">
          <strong>⚠️ Nota:</strong> Esta es una simulación educativa. Los datos mostrados son ficticios
          y el proceso está simplificado. Un verificador real requeriría integración con wallets certificados
          y protocolos de seguridad adicionales.
        </div>
      </div>
    </div>
  );
};

export default VerifierDemo;
