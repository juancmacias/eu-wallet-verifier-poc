# Análisis de Viabilidad: Backend PHP para Verificador EU Digital Identity Wallet

**Fecha**: 13 de enero de 2026  
**Proyecto**: EU Wallet Verifier PoC  
**Objetivo**: Implementar verificación funcional con backend PHP

---

## 1. Estado Actual de EU Digital Identity Wallet

### 1.1 Programa Piloto EUDI Wallet
La Comisión Europea lanzó el **Large Scale Pilot (LSP)** en 2023-2024 con cuatro consorcios:

1. **DC4EU** (Digital Credentials for Europe)
2. **POTENTIAL** 
3. **EWC** (European Wallet Consortium)
4. **NOBID** (Nordic-Baltic eID)

### 1.2 Estado de Implementación (Enero 2026)
- ✅ **Fase piloto activa** en 11 países
- ✅ **ARF v1.4** (Architecture Reference Framework) publicado
- ⚠️ **APIs en fase beta** - acceso limitado
- ⚠️ **Wallets certificados** disponibles solo para pilotos
- 🔴 **No hay APIs públicas de producción** todavía
- 📅 **Lanzamiento oficial estimado**: 2026-2027

### 1.3 Wallets Disponibles (Piloto)

#### Wallets Oficiales del Piloto:
- **INJI Wallet** (India, adaptado para UE)
- **Lissi Wallet** (Alemania)
- **Validated ID** (España)
- **Thales DIS** (Francia)
- **Intesi Group** (Italia)

**Acceso**: Requiere participación en consorcio piloto o acuerdos bilaterales.

---

## 2. Arquitectura Propuesta: PHP Backend + React Frontend

### 2.1 Stack Tecnológico

#### Frontend (Actual)
- React 18.3.1
- React Router 6
- JavaScript ES6+

#### Backend (Propuesto)
```
PHP 8.1+
├── Framework: Laravel 10.x (recomendado) o Symfony
├── Base de datos: MySQL 8.0 / PostgreSQL
├── WebSockets: Ratchet (PHP WebSocket library)
├── JWT: firebase/php-jwt
├── QR Codes: endroid/qr-code
└── Crypto: phpseclib3 (RSA, ECDSA)
```

#### Infraestructura
```
Apache/Nginx + PHP-FPM
├── SSL/TLS (Let's Encrypt)
├── Redis (caché y sesiones WebSocket)
└── Composer (dependencias PHP)
```

### 2.2 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    React Frontend                        │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐          │
│  │   Home    │  │ Verifier  │  │   Docs    │          │
│  └─────┬─────┘  └─────┬─────┘  └───────────┘          │
│        │              │                                  │
│        └──────────────┴──── API Calls (Axios)           │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS/REST + WebSocket
                     ↓
┌─────────────────────────────────────────────────────────┐
│                  PHP Backend API                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Laravel/Symfony Framework                        │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐ │  │
│  │  │   Routes   │  │Controllers │  │  Services  │ │  │
│  │  └────────────┘  └────────────┘  └────────────┘ │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │            Core Services                          │  │
│  │  • QRCodeService (generar códigos)               │  │
│  │  • VerificationService (validar credenciales)    │  │
│  │  • CryptoService (firmas digitales)              │  │
│  │  • WebSocketServer (tiempo real)                 │  │
│  │  • SessionManager (gestión de sesiones)          │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │           Database Layer                          │  │
│  │  • verification_sessions                          │  │
│  │  • mock_credentials                               │  │
│  │  • verification_logs                              │  │
│  │  • public_keys (para validación)                 │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│              EU Digital Identity Wallet                  │
│         (Simulado / API Sandbox cuando disponible)       │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Flujo de Verificación Propuesto

### 3.1 Proceso Paso a Paso

```
1. Usuario selecciona tipo de credencial
   ↓
2. Frontend solicita sesión de verificación a Backend PHP
   POST /api/verification/create
   ↓
3. Backend genera:
   - Session ID único
   - Challenge criptográfico
   - QR Code con deep link
   ↓
4. Frontend muestra QR + conexión WebSocket
   WS /ws/verification/{sessionId}
   ↓
5. Usuario escanea QR con Wallet (simulado o real)
   ↓
6. Wallet envía Verifiable Presentation (VP) firmada
   POST /api/verification/submit
   ↓
7. Backend valida:
   - Firma digital (ECDSA/RSA)
   - Emisor autorizado
   - No revocada
   - Timestamps válidos
   ↓
8. Backend notifica resultado vía WebSocket
   ↓
9. Frontend muestra datos verificados
```

### 3.2 Endpoints API PHP

```php
// Crear sesión de verificación
POST /api/verification/create
Body: { "credentialType": "id-card", "requiredFields": ["name", "birthDate"] }
Response: { "sessionId": "uuid", "qrCodeData": "openid4vp://...", "expiresIn": 300 }

// Enviar credencial (simulado como wallet)
POST /api/verification/submit
Body: { "sessionId": "uuid", "verifiablePresentation": { ... } }
Response: { "success": true, "verificationId": "uuid" }

// Obtener resultado de verificación
GET /api/verification/result/{sessionId}
Response: { "status": "verified", "data": { ... }, "timestamp": "..." }

// WebSocket para actualizaciones en tiempo real
WS /ws/verification/{sessionId}
Events: 
  - scanning (wallet escaneó QR)
  - verifying (procesando credencial)
  - verified (completado)
  - error (fallo)
```

---

## 4. Implementación con Protocolos Estándar

### 4.1 OpenID for Verifiable Presentations (OpenID4VP)

El estándar actual de la UE para EUDI Wallet:

```php
// Ejemplo de Authorization Request
$authRequest = [
    'response_type' => 'vp_token',
    'client_id' => 'https://verifier.example.com',
    'redirect_uri' => 'https://verifier.example.com/callback',
    'presentation_definition' => [
        'id' => 'eu-identity-verification',
        'input_descriptors' => [
            [
                'id' => 'eu_id_card',
                'format' => ['jwt_vc_json'],
                'constraints' => [
                    'fields' => [
                        ['path' => ['$.credentialSubject.givenName']],
                        ['path' => ['$.credentialSubject.familyName']],
                        ['path' => ['$.credentialSubject.birthDate']]
                    ]
                ]
            ]
        ]
    ],
    'nonce' => bin2hex(random_bytes(16)),
    'state' => bin2hex(random_bytes(16))
];

// Generar deep link para wallet
$deepLink = 'openid4vp://?request_uri=' . urlencode($callbackUrl);
```

### 4.2 Validación de Credenciales Verificables (W3C VC)

```php
class VerificationService {
    public function validateVerifiablePresentation($vp) {
        // 1. Verificar estructura W3C
        if (!$this->validateW3CStructure($vp)) {
            throw new InvalidCredentialException();
        }
        
        // 2. Verificar firma digital (JWT)
        $jwt = $vp['verifiableCredential'][0];
        $publicKey = $this->getIssuerPublicKey($jwt['iss']);
        
        if (!$this->verifyJWTSignature($jwt, $publicKey)) {
            throw new InvalidSignatureException();
        }
        
        // 3. Verificar emisor autorizado
        if (!$this->isAuthorizedIssuer($jwt['iss'])) {
            throw new UnauthorizedIssuerException();
        }
        
        // 4. Verificar no revocada
        if ($this->isRevoked($jwt['jti'])) {
            throw new RevokedCredentialException();
        }
        
        // 5. Verificar timestamps
        if (!$this->validateTimestamps($jwt)) {
            throw new ExpiredCredentialException();
        }
        
        return $this->extractCredentialData($jwt);
    }
}
```

---

## 5. Acceso a Wallets Certificados de la UE

### 5.1 Proceso Oficial para Participar en el Piloto

#### Opción A: Participación Directa en LSP
1. **Contactar consorcio piloto**:
   - DC4EU: https://www.dc4eu.eu/contact
   - EWC: https://eudiwalletconsortium.org/
   - POTENTIAL: https://www.potential-project.eu/
   
2. **Requisitos**:
   - Ser entidad pública o privada de país UE
   - Propuesta de caso de uso
   - Compromiso de recursos técnicos
   - Firmar NDA y acuerdos de datos

3. **Proceso** (3-6 meses):
   - Solicitud formal
   - Evaluación técnica
   - Aprobación consorcio
   - Acceso a sandbox y documentación

#### Opción B: Sandbox Público (Limitado)
Algunos proveedores ofrecen sandboxes limitados:

**1. Validated ID (España)**
- URL: https://www.validatedid.com/eudi-wallet
- Sandbox: Disponible con registro
- Stack: OpenID4VC + W3C DID

**2. Sphereon OpenID4VC**
- GitHub: https://github.com/Sphereon-Opensource
- Sandbox público para testing
- Compatible con estándares EU

**3. EBSI (European Blockchain Services Infrastructure)**
- URL: https://ec.europa.eu/digital-building-blocks/wikis/display/EBSI
- Testnet disponible
- Requiere registro EU Login

### 5.2 Acceso a Documentación Técnica

**Repositorios Oficiales**:
```
1. ARF (Architecture Reference Framework)
   https://github.com/eu-digital-identity-wallet

2. Especificaciones Técnicas
   https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework

3. Reference Implementation
   https://github.com/eu-digital-identity-wallet/eudi-srv-web-verifier-endpoint-23220-4-mdoc

4. ISO 18013-5 (mDL - mobile Driver License)
   Implementación de referencia disponible
```

**Contactos Oficiales**:
- **DG CNECT** (Comisión Europea): CNECT-EUDI-WALLET@ec.europa.eu
- **CEF Digital**: https://ec.europa.eu/digital-building-blocks/sites/display/CEFDIGITAL

---

## 6. Roadmap de Implementación

### 6.1 Fase 1: Backend Simulado (2-3 semanas)
✅ **Viable con tu infraestructura cPanel actual**

**Semana 1-2**:
- [ ] Setup Laravel en subdirectorio `/api`
- [ ] Crear base de datos y migraciones
- [ ] Implementar QRCodeService
- [ ] Implementar VerificationService (mock)
- [ ] Endpoints REST básicos

**Semana 3**:
- [ ] WebSocket server con Ratchet
- [ ] CryptoService (firmas mock)
- [ ] Testing e integración con React
- [ ] Deploy en cPanel

**Resultado**: Sistema funcional con verificación simulada pero realista.

### 6.2 Fase 2: Integración con Sandbox (1-2 meses)
⚠️ **Requiere acceso a sandbox externo**

- [ ] Solicitar acceso a Sphereon/Validated ID
- [ ] Implementar OpenID4VP real
- [ ] Integrar con EBSI testnet
- [ ] Gestión de DIDs y claves públicas
- [ ] Testing con wallets de prueba

### 6.3 Fase 3: Producción con APIs Oficiales (6-12 meses)
🔴 **Requiere certificación y APIs oficiales disponibles**

- [ ] Participación en consorcio piloto
- [ ] Certificación como Relying Party
- [ ] Integración con Trust Framework
- [ ] Auditoría de seguridad
- [ ] Despliegue en producción

---

## 7. Estimación de Costes y Recursos

### 7.1 Infraestructura

**Fase 1 (Simulado)**:
- ✅ **Coste**: €0 (usa cPanel actual)
- Hosting PHP + MySQL: Ya disponible
- SSL: Let's Encrypt gratuito
- Composer: Gratuito

**Fase 2 (Sandbox)**:
- Coste sandbox: €0-100/mes (según proveedor)
- Posible VPS adicional: €10-30/mes

**Fase 3 (Producción)**:
- Certificación: €500-2000 (una vez)
- Hosting dedicado: €50-200/mes
- Licencias: Variable según país

### 7.2 Desarrollo

**Fase 1**: 40-60 horas
**Fase 2**: 80-120 horas
**Fase 3**: 200-400 horas + certificación

---

## 8. Recomendación Final

### ✅ Viable para PoC con Backend PHP Simulado

**Pros**:
- Funcionalidad completa sin APIs externas
- Demuestra arquitectura y flujos reales
- Base sólida para integración futura
- Coste cero, usa infraestructura actual
- Experiencia de usuario realista

**Contras**:
- Verificación no es criptográficamente real
- No conecta con wallets certificados reales
- Requiere disclaimer educativo

### 📋 Plan Inmediato Recomendado

1. **Implementar Fase 1** (backend simulado PHP)
   - Sistema funcional en 2-3 semanas
   - Experiencia de usuario completa
   - Portfolio profesional

2. **Documentar arquitectura** para integración futura
   - Código preparado para OpenID4VP
   - Interfaces para APIs reales
   - Migración fluida cuando APIs estén disponibles

3. **Monitorizar evolución** del programa piloto
   - Solicitar acceso a sandboxes disponibles
   - Preparar participación en fase beta pública (2026-2027)

---

## 9. Próximos Pasos

¿Quieres que proceda con la **Fase 1**?

Si es así, implementaré:
1. Estructura Laravel en `/api`
2. Base de datos con migraciones
3. Servicios de verificación simulada
4. Integración con el frontend React actual
5. WebSocket para actualizaciones en tiempo real
6. Documentación completa

**Tiempo estimado**: 2-3 días de desarrollo intensivo.

---

**Autor**: GitHub Copilot  
**Proyecto**: EU Wallet Verifier PoC  
**Licencia**: MIT
