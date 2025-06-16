# 🏓 Ping Pong Coin - Retro Edition

Un juego de Ping Pong retro con efectos visuales neón, múltiples niveles de dificultad y easter eggs sorpresa.

## 🎮 Características

- **3 Niveles de Dificultad**
  - Nivel 1: Principiante - Velocidad moderada
  - Nivel 2: Velocidad Extrema - Pelota súper rápida
  - Nivel 3: Desafío IA - Enfréntate a una inteligencia artificial

- **Efectos Visuales Retro**
  - Diseño neón cyberpunk
  - Efectos de partículas
  - Trail de la pelota
  - Efectos de brillo (glow)
  - Modo disco secreto

- **Sistema de Audio**
  - Música de fondo diferente por nivel
  - Efectos de sonido para rebotes
  - Control de volumen integrado

- **Easter Eggs**
  - Modo disco activable con la tecla 'K'
  - Efectos visuales especiales

## 🎯 Cómo Jugar

### Controles
- **Jugador 1 (Izquierda)**: W/S para mover la paleta
- **Jugador 2 (Derecha)**: Flechas ↑/↓ para mover la paleta
- **Pausa**: Tecla Escape o botón de pausa
- **Easter Egg**: Presiona 'K' para activar el modo disco

### Objetivo
- Primer jugador en llegar a 10 puntos gana
- En el Nivel 3, juegas contra la IA

## 🚀 Instalación y Uso

1. **Descarga el proyecto**
   ```bash
   # Clona o descarga todos los archivos del proyecto
   git clone <URL_DEL_REPOSITORIO>
   ```

2. **Estructura de archivos requerida**
   ```plaintext
   ping-pong-coin/
   ├── index.html
   ├── css/
   │   └── style.css
   ├── js/
   │   └── game-simple.js
   └── assets/
       ├── sounds/
       │   ├── hit.mp3
       │   ├── bg-music.mp3
       │   ├── bg-music-2.mp3
       │   └── decide.mp3
       └── img/
           └── favicon.ico
   ```

3. **Ejecutar el juego**
   - Abre `index.html` en tu navegador web
   - O usa un servidor local como Live Server en VS Code

## 🎨 Tecnologías Utilizadas

- **HTML5 Canvas** - Para el renderizado del juego
- **CSS3** - Efectos visuales y animaciones neón
- **JavaScript ES6+** - Lógica del juego y física
- **Web Audio API** - Sistema de sonido

## 🎵 Archivos de Audio

El juego requiere los siguientes archivos de audio en la carpeta `assets/sounds/`:

- `hit.mp3` - Sonido de rebote de la pelota
- `bg-music.mp3` - Música de fondo para Nivel 1
- `bg-music-2.mp3` - Música de fondo para Niveles 2 y 3
- `decide.mp3` - Sonido del easter egg

## 🕹️ Niveles de Dificultad

### Nivel 1 - Principiante 🏓
- Velocidad de pelota: Moderada (6 unidades)
- Velocidad de paletas: Normal
- Ideal para aprender los controles

### Nivel 2 - Velocidad Extrema ⚡
- Velocidad de pelota: Muy rápida (12 unidades)
- Velocidad de paletas: Aumentada
- Desafío de reflejos

### Nivel 3 - Desafío IA 🤖
- Velocidad de pelota: Rápida (10 unidades)
- Jugador 1 controlado por IA inteligente
- La IA predice el movimiento de la pelota

## 🎪 Easter Eggs

- **Modo Disco**: Presiona 'K' en cualquier momento para activar efectos visuales especiales
- **Efectos de Partículas**: Se generan automáticamente en cada rebote
- **Colores Dinámicos**: En modo disco, los colores cambian constantemente

## 🔧 Personalización

### Modificar Velocidades
Edita las variables en `game-simple.js`:
```javascript
// Nivel 1
ballSpeedX = Math.random() > 0.5 ? 6 : -6;
ballSpeedY = Math.random() * 5 - 2.5;

// Nivel 2  
ballSpeedX = Math.random() > 0.5 ? 12 : -12;
ballSpeedY = Math.random() * 10 - 5;

// Nivel 3
ballSpeedX = Math.random() > 0.5 ? 10 : -10;
ballSpeedY = Math.random() * 9 - 4.5;
```

### Cambiar Colores
Modifica el array de colores en `style.css`:
```css
:root {
  --primary-color: #00ffff;
  --secondary-color: #ff00ff;
  --accent-color: #ffff00;
}
```

## 🐛 Solución de Problemas

### El audio no funciona
- Asegúrate de que los archivos de audio estén en `assets/sounds/`
- Los navegadores requieren interacción del usuario antes de reproducir audio
- Haz clic en cualquier parte de la página antes de iniciar el juego

### El juego se ve mal
- Verifica que `style.css` esté cargando correctamente
- Asegúrate de tener una conexión a internet para las fuentes de Google

### Controles no responden
- Haz clic en el área del juego para darle foco
- Verifica que no haya otras aplicaciones capturando las teclas

## 👨‍💻 Créditos

**Creado por**: Flavio Villanueva Medina

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🎯 Próximas Características

- [ ] Modo multijugador online
- [ ] Más efectos visuales
- [ ] Sistema de puntuaciones altas
- [ ] Más niveles de dificultad
- [ ] Power-ups especiales

---

¡Disfruta jugando Ping Pong Coin! 🏓✨
