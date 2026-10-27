const express = require('express');
const useragent = require('express-useragent');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Función para cargar catálogo de 12 componentes de hardware de servidor
const productsPath = path.join(__dirname, 'data', 'products.json');
function getProducts() {
  try {
    return JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  } catch (err) {
    console.error('Error al cargar products.json:', err);
    return [];
  }
}

// Configuración de motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos (CSS, JS, imágenes SVG de alta y baja resolución)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de detección de cliente mediante cabeceras HTTP (User-Agent)
app.use(useragent.express());

// Middleware para registrar en consola la detección del agente
app.use((req, res, next) => {
  const ua = req.useragent;
  const isMobileDetected = ua.isMobile;
  const clientType = isMobileDetected ? '📱 MÓVIL' : '💻 ESCRITORIO';
  // console.log(`[HTTP ${req.method}] ${req.url} — Cliente detectado: ${clientType} (${ua.browser} / ${ua.os})`);
  next();
});

/* ========================================================
   RUTAS PRINCIPALES DEL LABORATORIO
   ======================================================== */

// Redirigir ruta raíz directamente a /responsive (RWD)
app.get('/', (req, res) => {
  res.redirect('/responsive');
});

/**
 * Fase 2: Implementación Versión A (RWD - Responsive Web Design)
 * Entrega exactamente el mismo documento HTML a todos los dispositivos.
 * El cliente (navegador) adapta la interfaz mediante media queries fluidas.
 */
app.get('/responsive', (req, res) => {
  const products = getProducts();
  // RWD Puro: El servidor entrega exactamente el mismo documento HTML sin inspeccionar al cliente
  res.render('responsive', {
    products,
    architecture: 'RWD'
  });
});

/**
 * Fase 3: Implementación Versión B (AWD - Adaptive Web Design)
 * El servidor participa activamente inspeccionando el User-Agent.
 * Genera un DOM especializado según el tipo de cliente identificado:
 * - mobile.ejs: DOM podado sin el gráfico radar ni la tabla pesada de especificaciones.
 * - desktop.ejs: DOM completo con matriz exhaustiva y benchmark canvas.
 * 
 * Permite además el parámetro de consulta ?view=mobile o ?view=desktop para facilitar
 * las pruebas manuales en el navegador sin tener que modificar el emulador de DevTools.
 */
app.get('/adaptive', (req, res) => {
  const products = getProducts();
  const viewOverride = req.query.view; // 'mobile' | 'desktop'
  
  // Determinamos si se atiende como móvil:
  // 1. Si existe parámetro explícito de prueba (?view=mobile)
  // 2. Si no hay parámetro, utilizamos la inspección de cabeceras HTTP (express-useragent)
  let isMobileClient = false;
  
  if (viewOverride === 'mobile') {
    isMobileClient = true;
  } else if (viewOverride === 'desktop') {
    isMobileClient = false;
  } else {
    isMobileClient = Boolean(req.useragent.isMobile);
  }

  if (isMobileClient) {
    // Renderizado condicional en servidor: Plantilla móvil podada
    res.render('mobile', {
      products,
      architecture: 'AWD-Mobile',
      isMobile: true,
      client: req.useragent
    });
  } else {
    // Renderizado condicional en servidor: Plantilla de escritorio completa
    res.render('desktop', {
      products,
      architecture: 'AWD-Desktop',
      isMobile: false,
      client: req.useragent
    });
  }
});

// Endpoint API auxiliar para telemetría
app.get('/api/hardware', (req, res) => {
  const products = getProducts();
  res.json({
    total: products.length,
    detectedClient: {
      isMobile: req.useragent.isMobile,
      browser: req.useragent.browser,
      os: req.useragent.os,
      platform: req.useragent.platform
    },
    items: products
  });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Servidor de Práctica RWD vs. AWD activo`);
  console.log(` URL Local:     http://localhost:${PORT}`);
  console.log(` Versión RWD:   http://localhost:${PORT}/responsive`);
  console.log(` Versión AWD:   http://localhost:${PORT}/adaptive`);
  console.log(` AWD Móvil:     http://localhost:${PORT}/adaptive?view=mobile`);
  console.log(` AWD Desktop:   http://localhost:${PORT}/adaptive?view=desktop`);
  console.log(`====================================================`);
});
