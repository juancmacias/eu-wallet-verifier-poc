# EU Wallet Verifier PoC - Instrucciones para Agentes de IA

## Contexto del Proyecto

Este es un **Proof of Concept** de un verificador de identidad digital europea (eIDAS 2.0) basado en el proyecto oficial de la Comisión Europea. Es una SPA React enfocada en demostrar las capacidades del EU Digital Identity Wallet.

## Arquitectura

### Estructura Base
- **SPA React 18** con react-router-dom en modo subdirectorio (`/eu-wallet-verifier/`)
- Layout centralizado: `Layout.js` (Header + contenido + Footer) envuelve todas las páginas
- Rutas principales: `/` (Home), `/verifier` (Demo), `/docs` (Documentación), `/about` (Acerca de)
- Los componentes Page están importados en [App.js](src/App.js#L4-L7) pero **no existen aún** - están pendientes de implementación

### Configuración de Routing
- **Basename configurado**: `/eu-wallet-verifier/` en [index.js](src/index.js#L11) - mantener consistencia con `.htaccess`
- Catch-all route redirige a `/` con `<Navigate to="/" replace />`
- `.htaccess` configura RewriteBase y fallback a index.html para SPA routing en Apache

### Estilos
- CSS modules por componente (ej: `Header.css`, `Layout.css`)
- Clase personalizada: `container-custom` en lugar de estándar "container"
- Header usa emoji 🇪🇺 como logo icon y toggle mobile menu con estado local

## Convenciones Específicas

### Componentes
- **No usar TypeScript** pese a keywords en package.json - el código es JavaScript puro
- Componentes funcionales con hooks (useState, useLocation)
- Patrón de navegación: Link de react-router-dom con clase `active` basada en `useLocation()`
- Props destructuradas directamente en parámetros de función

### Naming
- Archivos CSS colocados junto al componente relacionado (ej: `Header.js` + `Header.css`)
- Imports relativos desde `src/` (ej: `'./components/Layout/Layout'`)

### Estado y Interacción
- Estado local con useState para funcionalidad de menú móvil (toggle hamburguesa)
- `setIsMenuOpen(false)` al hacer clic en links para cerrar menú en mobile

## Flujo de Desarrollo

### Scripts Disponibles
```bash
npm start          # Dev server en localhost:3000
npm run build      # Build + copia .htaccess a build/
npm test           # Jest + React Testing Library
npm run deploy     # Build + mensaje para subir a cPanel
```

### Deploy a cPanel (Producción)
1. `npm run build` genera `/build` con `.htaccess` incluido
2. Subir **contenido** de `build/` (no la carpeta) a `/public_html/eu-wallet-verifier/`
3. URL final: `https://juancarlosmacias.es/eu-wallet-verifier/`

### Configuración Apache (.htaccess)
- **RewriteBase crítico**: `/eu-wallet-verifier/` debe coincidir con basename de React Router
- Fallback para SPA: todas las rutas no-archivo → `index.html`
- Headers de seguridad y cache configurados (1 año para assets, 1 mes para CSS/JS)

## Puntos de Integración (Pendientes)

### Componentes Faltantes
Los siguientes componentes están **referenciados pero no implementados**:
- `src/components/Pages/Home.js`
- `src/components/Pages/VerifierDemo.js` - núcleo del PoC (demo de verificación)
- `src/components/Pages/Documentation.js`
- `src/components/Pages/About.js`
- `src/components/Layout/Footer.js` - usado en Layout pero no existe

### Servicios Futuros (README menciona)
- `src/services/walletService.js` - lógica de verificación de credenciales
- Estructura de carpetas para assets (images/, styles/) sin implementar

## Decisiones de Diseño

### Por Qué Subdirectorio
Diseñado para convivir en portfolio existente (`juancarlosmacias.es`), no dominio propio - de ahí basename y RewriteBase

### Por Qué Sin TypeScript
Keywords en package.json son aspiracionales - actualmente 100% JavaScript para simplicidad del PoC

### Referencias eIDAS
Proyecto educativo inspirado en [eu-digital-identity-wallet](https://github.com/eu-digital-identity-wallet) - no afiliado oficialmente con la CE

## Para Nuevas Features

Al agregar páginas:
1. Crear componente en `src/components/Pages/`
2. Actualizar import y Route en [App.js](src/App.js)
3. Añadir link en [Header.js](src/components/Layout/Header.js) si aplica navegación

Al modificar routing:
- Sincronizar basename en `index.js` con RewriteBase en `.htaccess`
- Ejecutar `npm run build` para incluir `.htaccess` actualizado
