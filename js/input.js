// Control de teclado para las paletas

const keysPressed = {};

window.addEventListener('keydown', e => {
    keysPressed[e.key] = true;
});

window.addEventListener('keyup', e => {
    keysPressed[e.key] = false;
});

// Exportamos keysPressed para usar en game.js
export { keysPressed };