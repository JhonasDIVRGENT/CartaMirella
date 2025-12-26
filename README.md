# 💜 Carta Digital Interactiva - Gengar Theme

Una experiencia web inmersiva e interactiva con temática de Pokémon (Gengar/Ghost Type) que simula un videojuego retro. Esta carta digital combina diseño pixel art, animaciones suaves y una narrativa emotiva.

![Gengar Theme](assets/img/GengarIcon1.png)

## 🎮 Demo

Abre `index.html` en tu navegador para experimentar la carta digital completa.

## ✨ Características

- 🎨 **Diseño Pixel Art Retro**: Estética inspirada en GameBoy Advance
- 🌟 **Animaciones Fluidas**: Efectos de partículas, flotación y transiciones suaves
- 💬 **Efecto Typewriter**: El texto de la carta se escribe automáticamente
- 🎵 **Reproductor Spotify Integrado**: Estilo Gameboy con playlist personalizada
- 💜 **Interactividad**: Click en cualquier parte genera corazones y mini-Gengars flotantes
- 📱 **Totalmente Responsive**: Optimizado para mobile, tablet y desktop
- ♿ **Accesible**: Soporte para teclado y respeto a preferencias de movimiento reducido

## 🛠️ Tecnologías Utilizadas

### Frontend Core
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño modular con metodología BEM
- **JavaScript ES6+**: Módulos nativos y programación funcional

### Librerías y Frameworks
- **[NES.css](https://nostalgic-css.github.io/NES.css/)**: Framework CSS estilo 8-bits para botones y contenedores
- **Google Fonts**: 
  - `Press Start 2P`: Tipografía pixel para títulos
  - `VT323`: Tipografía monospace para textos largos

### APIs y Servicios
- **Spotify Embed API**: Integración de playlist musical

## 📁 Estructura del Proyecto

```
CartaMire/
│
├── index.html                 # Punto de entrada principal
│
├── css/                       # Arquitectura CSS modular
│   ├── main.css              # Archivo principal que importa todos los módulos
│   ├── base/
│   │   ├── reset.css         # Normalización de estilos del navegador
│   │   └── variables.css     # CSS Custom Properties (colores, fuentes, espaciado)
│   ├── layout/
│   │   ├── container.css     # Sistema de grids y layouts
│   │   └── header.css        # Estilos del header estilo menú de juego
│   └── components/
│       ├── card.css          # Estilos de la carta y sprite de Gengar
│       ├── dialog.css        # Pantalla de intro y caja de diálogo RPG
│       ├── player.css        # Reproductor Spotify estilo Gameboy
│       ├── animations.css    # Keyframes y efectos animados
│       └── responsive.css    # Optimizaciones mobile/tablet
│
├── js/                        # JavaScript modular (ES Modules)
│   ├── app.js                # Controlador principal de la aplicación
│   └── modules/
│       ├── domManager.js     # Gestión y manipulación del DOM
│       ├── effects.js        # Sistema de partículas y efectos visuales
│       └── audioPlayer.js    # Controles visuales del reproductor
│
└── assets/                    # Recursos multimedia
    ├── img/
    │   └── GengarIcon1.png   # Sprite personalizado de Gengar
    └── sounds/               # Placeholder para efectos de sonido
```

## 🎨 Paleta de Colores (Gengar Theme)

```css
/* Colores Primarios */
--color-primary: #4A2BA9        /* Morado Gengar Profundo */
--color-secondary: #A66CFF      /* Lavanda Espectral */
--color-accent: #FF0000         /* Ojos Rojos Brillantes */

/* Fondos */
--color-bg-dark: #0A0014        /* Negro Profundo */
--color-bg-medium: #1A0F2E      /* Morado Oscuro */
--color-bg-light: #2D1B4E       /* Morado Medio */
```

## 🧩 Arquitectura y Lógica

### 1. Sistema de Módulos ES6

El proyecto utiliza **ES Modules** para una arquitectura escalable y mantenible:

```javascript
// app.js - Orquestador principal
import { initDOM, addClass, removeClass } from './modules/domManager.js';
import { initParticles, typewriterEffect } from './modules/effects.js';
import { initAudioPlayer } from './modules/audioPlayer.js';
```

### 2. Flujo de la Aplicación

```
┌─────────────────────┐
│  Pantalla de Intro  │ ← Usuario ve "Carta de Jhonas"
│  (Press Start)      │
└──────────┬──────────┘
           │ Click/Enter
           ▼
┌─────────────────────┐
│  Fade Out Intro     │ ← Transición suave (1s)
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Inicialización:    │
│  • Partículas       │ ← Canvas con sistema de partículas
│  • Click Effects    │ ← Event listeners para interactividad
│  • Audio Player     │ ← Controles decorativos
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Typewriter Effect  │ ← Texto se escribe letra por letra
│  (50ms por letra)   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Estado Final       │ ← Usuario puede interactuar libremente
│  (Totalmente activo)│
└─────────────────────┘
```

### 3. Sistema de Partículas (Canvas)

**Archivo**: `js/modules/effects.js`

```javascript
class Particle {
    constructor(canvas) {
        this.x = random position
        this.y = random position
        this.speedX = random velocity
        this.speedY = random velocity
        this.color = random purple shade
    }
    
    update() {
        // Movimiento continuo con wrap-around
        this.x += this.speedX
        this.y += this.speedY
        
        // Si sale de la pantalla, reaparece del otro lado
        if (this.x > canvas.width) this.x = 0
    }
    
    draw(ctx) {
        // Dibuja círculo con opacidad
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    }
}
```

**Características**:
- 50 partículas flotantes simultáneas
- Conexiones dinámicas entre partículas cercanas
- Animación a 60 FPS usando `requestAnimationFrame`
- Colores aleatorios de la paleta Gengar

### 4. Efecto Typewriter

**Archivo**: `js/modules/effects.js`

```javascript
async function typewriterEffect(text, element, speed = 50) {
    return new Promise((resolve) => {
        let index = 0;
        element.textContent = '';
        
        const interval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}
```

**Características**:
- Velocidad configurable (50ms por defecto)
- Promesa que se resuelve al completar
- Auto-scroll para mantener texto visible
- Cursor parpadeante durante la escritura

### 5. Gestión del DOM

**Archivo**: `js/modules/domManager.js`

**Patrón de diseño**: Singleton con caché de elementos

```javascript
export const DOM = {
    introScreen: null,
    mainContent: null,
    letterText: null,
    // ... más elementos
};

export function initDOM() {
    // Cachea todos los elementos al inicio
    DOM.introScreen = document.getElementById('intro-screen');
    DOM.mainContent = document.getElementById('main-content');
    // ...
}
```

**Ventajas**:
- ✅ Acceso rápido a elementos (sin querySelector repetido)
- ✅ Funciones puras para manipulación
- ✅ Validación de elementos existentes
- ✅ Mejor rendimiento

### 6. Sistema de Animaciones CSS

**Archivo**: `css/components/animations.css`

**Animaciones principales**:

```css
/* Flotación del Gengar */
@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

/* Efecto de brillo pulsante */
@keyframes pulse-glow-image {
    from { filter: drop-shadow(0 0 40px var(--color-secondary)); }
    to { filter: drop-shadow(0 0 60px var(--color-secondary)); }
}

/* Corazones flotantes */
@keyframes float-up {
    0% { opacity: 1; transform: translateY(0) scale(1); }
    100% { opacity: 0; transform: translateY(-200px) scale(0.5); }
}
```

### 7. Diseño Responsive

**Estrategia**: Mobile-First

```css
/* Base: Mobile (< 576px) */
.gengar-container {
    width: 120px;
    height: 120px;
}

/* Tablet (577px - 768px) */
@media (min-width: 577px) {
    .gengar-container {
        width: 180px;
        height: 180px;
    }
}

/* Desktop (> 768px) */
@media (min-width: 769px) {
    .gengar-container {
        width: 250px;
        height: 250px;
    }
}
```

## 🚀 Cómo Usar

### Instalación Local

1. **Clona o descarga el proyecto**
```bash
git clone <tu-repositorio>
cd CartaMire
```

2. **Abre el archivo HTML**
```bash
# Opción 1: Doble click en index.html

# Opción 2: Con Live Server (VS Code)
# Instala la extensión "Live Server"
# Click derecho en index.html → "Open with Live Server"

# Opción 3: Con Python
python -m http.server 8000
# Abre http://localhost:8000
```

3. **¡Disfruta la experiencia!**
   - Click en "PRESS START"
   - Lee la carta mientras se escribe
   - Escucha la música de Spotify
   - Click en cualquier parte para efectos interactivos

### Personalización

#### Cambiar la Playlist de Spotify

Edita `index.html` línea 74:

```html
<iframe 
    src="https://open.spotify.com/embed/playlist/TU_PLAYLIST_ID?utm_source=generator"
    ...
</iframe>
```

#### Cambiar el Texto de la Carta

Edita `js/app.js` línea 28:

```javascript
const LETTER_TEXT = `Tu mensaje personalizado aquí...`;
```

#### Cambiar Colores

Edita `css/base/variables.css`:

```css
:root {
    --color-primary: #TU_COLOR;
    --color-secondary: #TU_COLOR;
    --color-accent: #TU_COLOR;
}
```

#### Cambiar la Imagen de Gengar

Reemplaza `assets/img/GengarIcon1.png` con tu imagen preferida.

## 📱 Compatibilidad

| Navegador | Versión Mínima | Estado |
|-----------|----------------|--------|
| Chrome    | 61+            | ✅ Completo |
| Firefox   | 60+            | ✅ Completo |
| Safari    | 11+            | ✅ Completo |
| Edge      | 79+            | ✅ Completo |
| Opera     | 48+            | ✅ Completo |

**Dispositivos**:
- ✅ Desktop (1920x1080 y superiores)
- ✅ Laptop (1366x768 y superiores)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 576px)
- ✅ Landscape mode

## ⚡ Optimizaciones de Rendimiento

1. **CSS**:
   - Uso de CSS Custom Properties para cambios dinámicos
   - Animaciones con `transform` y `opacity` (GPU accelerated)
   - `will-change` para animaciones críticas

2. **JavaScript**:
   - Módulos ES6 para code splitting
   - Event delegation donde es posible
   - `requestAnimationFrame` para animaciones suaves
   - Debounce en resize events

3. **Imágenes**:
   - Formato PNG optimizado
   - Lazy loading en iframe de Spotify

## 🎯 Características Técnicas Destacadas

### 1. Arquitectura Modular
- Separación de responsabilidades (DOM, Effects, Audio)
- Funciones puras y reutilizables
- Fácil mantenimiento y escalabilidad

### 2. Accesibilidad
- Navegación por teclado (Enter/Space para "Press Start")
- Soporte para `prefers-reduced-motion`
- Atributos ARIA en elementos interactivos
- Contraste de colores WCAG AA compliant

### 3. SEO
- Meta tags descriptivos
- Estructura HTML semántica
- Títulos jerárquicos correctos

### 4. Best Practices
- Metodología BEM para CSS
- Mobile-first responsive design
- Progressive enhancement
- Graceful degradation

## 🐛 Solución de Problemas

### Las animaciones no funcionan
- Verifica que JavaScript esté habilitado
- Comprueba la consola del navegador (F12)
- Asegúrate de que todos los archivos CSS estén cargados

### El reproductor de Spotify no carga
- Verifica tu conexión a internet
- Comprueba que la URL de la playlist sea correcta
- Algunos bloqueadores de anuncios pueden interferir

### Las partículas no se ven
- El navegador debe soportar Canvas API
- Verifica que `particle-canvas` exista en el DOM

## 📄 Licencia

Este proyecto es de uso personal. Creado con 💜 por Jhonas para Mire.

## 🙏 Créditos

- **Diseño y Desarrollo**: Jhonas
- **Inspiración**: Pokémon (Gengar)
- **Framework CSS**: NES.css
- **Fuentes**: Google Fonts (Press Start 2P, VT323)
- **Música**: Spotify

---

**Hecho con mucho amor y código** 💜✨

*"Agradezco al universo que me hizo chocar contigo. Vales oro."*
