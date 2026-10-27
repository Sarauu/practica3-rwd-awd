# Práctica de Laboratorio: RWD vs. AWD

---

## ¿De qué trata este proyecto?

Este proyecto es una comparativa práctica entre dos formas de adaptar sitios web a distintas pantallas:

1. **Diseño Responsivo (RWD Puro - Versión A):** Envía el mismo archivo HTML a todos los dispositivos. El navegador se encarga de acomodar el contenido usando CSS (Grid, Flexbox, media queries y la etiqueta `<picture>`).
2. **Diseño Adaptativo (AWD - Versión B):** El servidor en Node.js/Express revisa desde qué dispositivo entra el usuario (con `express-useragent`). Si detecta un celular, le envía una versión más ligera de la página que no incluye elementos pesados (como la gráfica ni la tabla extensa de especificaciones).

---

## Tecnologías utilizadas

- **Backend:** Node.js y Express.
- **Plantillas:** EJS para renderizar la página desde el servidor.
- **Detección de dispositivos:** Middleware `express-useragent` para leer las cabeceras de la petición.
- **Estilos:** CSS moderno (variables HSL, Flexbox y CSS Grid) sin depender de frameworks externos.
- **Imágenes:** Archivos SVG optimizados. La versión para escritorio incluye detalles complejos y la versión móvil utiliza trazos simplificados para reducir el peso de descarga.

---

## Instalación y Puesta en Marcha Local

### Prerrequisitos
- Node.js (v18.0.0 o superior)
- npm (v9.0.0 o superior)

### 1. Clonar o acceder a la carpeta del proyecto
```bash
cd practica-rwd-awd
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor
```bash
npm start
```

O en modo desarrollo con recarga automática:
```bash
npm run dev
```

El servidor quedará disponible en: `http://localhost:3000`





