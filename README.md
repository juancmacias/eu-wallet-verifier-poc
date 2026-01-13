# 🇪🇺 EU Digital Identity Wallet - Verifier PoC

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![eIDAS 2.0](https://img.shields.io/badge/eIDAS-2.0-orange.svg)](https://digital-strategy.ec.europa.eu/en/policies/eidas-regulation)

> Prueba de concepto de un verificador de identidad digital europea basado en el proyecto oficial de la Comisión Europea.

## 📋 Descripción

Este proyecto es una implementación de prueba de concepto (PoC) del **EU Digital Identity Wallet Verifier**, inspirado en el proyecto oficial [eu-digital-identity-wallet](https://github.com/eu-digital-identity-wallet) de la Comisión Europea.

El objetivo es explorar y demostrar las capacidades del sistema de identidad digital europea (eIDAS 2.0), que permite a los ciudadanos de la UE:
- ✅ Verificar su identidad digitalmente
- 🔐 Controlar sus datos personales
- 📱 Usar credenciales verificables
- 🏛️ Interactuar con servicios públicos y privados de forma segura

## 🎯 Objetivos del PoC

- [x] Comprender la arquitectura del EU Digital Identity Wallet
- [x] Implementar interfaz de verificación básica
- [ ] Integrar verificación de credenciales simuladas
- [ ] Crear flujo de autenticación completo
- [ ] Documentar hallazgos y recomendaciones

## 🛠️ Tecnologías

- **Frontend**: React 18.3.1 + TypeScript
- **Styling**: CSS3 + Bootstrap (opcional)
- **Build**: Webpack (via Create React App)
- **Deploy**: cPanel (Apache)

## 📁 Estructura del Proyecto

```
eu-wallet-verifier-poc/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Verifier/
│   │   ├── Credential/
│   │   └── Layout/
│   ├── services/
│   │   └── walletService.js
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   ├── App.js
│   └── index.js
├── .htaccess (para cPanel)
├── package.json
└── README.md
```

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ y npm
- Git

### Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/juancmacias/eu-wallet-verifier-poc.git
cd eu-wallet-verifier-poc

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

El proyecto se abrirá automáticamente en `http://localhost:3000`

## 📦 Build para Producción

```bash
# Generar build optimizado
npm run build

# Los archivos estarán en la carpeta build/
```

## 🌐 Deploy en cPanel

1. **Build del proyecto**:
   ```bash
   npm run build
   ```

2. **Subir archivos**:
   - Conectar por FTP/File Manager a cPanel
   - Crear carpeta: `/public_html/eu-wallet-verifier/`
   - Subir todo el contenido de `build/` (no la carpeta, solo el contenido)

3. **Configurar .htaccess**:
   - El archivo `.htaccess` ya está incluido en el build
   - Asegura el routing correcto de React en Apache

4. **Acceso**:
   - URL: `https://juancarlosmacias.es/eu-wallet-verifier/`

## 🔗 Referencias Oficiales

- [EU Digital Identity Wallet - GitHub](https://github.com/eu-digital-identity-wallet)
- [eIDAS 2.0 - Comisión Europea](https://digital-strategy.ec.europa.eu/en/policies/eidas-regulation)
- [EU Digital Identity Architecture](https://digital-strategy.ec.europa.eu/en/policies/discover-eudi-wallet-architecture-and-reference-framework)

## 📄 Licencia

Este proyecto es un PoC educativo basado en especificaciones públicas de la UE. 
Consulta el [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Juan Carlos Macías**
- Portfolio: [juancarlosmacias.es](https://juancarlosmacias.es)
- GitHub: [@juancmacias](https://github.com/juancmacias)
- LinkedIn: [Juan Carlos Macías](https://www.linkedin.com/in/juancarlosmacias/)

## 📝 Estado del Proyecto

🚧 **En desarrollo activo** - Este es un proyecto de prueba de concepto en fase inicial.

---

**Nota**: Este PoC es independiente y no está oficialmente afiliado con la Comisión Europea. 
Es un proyecto educativo para explorar las tecnologías del EU Digital Identity Wallet.
