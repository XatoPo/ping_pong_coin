import { playDecideSound } from './sound.js';

export class EasterEggs {
  constructor(gameState) {
    this.gameState = gameState
    this.konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "KeyB",
      "KeyA",
    ]
    this.konamiIndex = 0
  }

  handleKeyPress(e, uiManager) {
    // Easter Egg simple - tecla K
    if (e.key.toLowerCase() === "k") {
      this.gameState.discoMode = !this.gameState.discoMode
      playDecideSound() // Reproducir sonido decide.mp3
      uiManager.showEasterEggScreen()
      setTimeout(() => {
        uiManager.showWelcomeScreen()
      }, 3000)
    }

    // Konami Code
    if (e.code === this.konamiCode[this.konamiIndex]) {
      this.konamiIndex++
      if (this.konamiIndex === this.konamiCode.length) {
        this.gameState.discoMode = true
        alert("¡MODO DISCO ACTIVADO PERMANENTEMENTE!")
        this.konamiIndex = 0
      }
    } else {
      this.konamiIndex = 0
    }
  }
}
