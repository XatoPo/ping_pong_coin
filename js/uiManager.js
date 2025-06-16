export class UIManager {
  constructor(gameState) {
    this.gameState = gameState
  }

  showScreen(screenId) {
    // Remover clase active de todas las pantallas
    document.querySelectorAll(".screen").forEach((s) => {
      s.classList.remove("active")
    })

    // Mostrar la pantalla solicitada
    const screen = document.getElementById(screenId)
    if (screen) {
      screen.classList.add("active")
    } else {
      console.error(`Screen with id '${screenId}' not found`)
    }
  }

  showWelcomeScreen() {
    this.showScreen("welcomeScreen")
  }

  showMenuScreen() {
    this.showScreen("menuScreen")
  }

  showGameScreen() {
    this.showScreen("gameScreen")
  }

  showPauseScreen() {
    this.showScreen("pauseScreen")
  }

  showEndScreen(message, leftScore, rightScore) {
    this.showScreen("endScreen")
    const messageElement = document.getElementById("endScreenMessage")
    const scoreElement = document.getElementById("finalScore")

    if (messageElement) {
      messageElement.textContent = message
    }
    if (scoreElement) {
      scoreElement.textContent = `Puntuación Final: ${leftScore} - ${rightScore}`
    }
  }

  showEasterEggScreen() {
    this.showScreen("easterEggScreen")
  }

  setLevelBackground(level) {
    const gameScreen = document.getElementById("gameScreen")
    const levelTitle = document.getElementById("levelTitle")

    if (!gameScreen || !levelTitle) return

    gameScreen.classList.remove("level-1", "level-2", "level-3")

    if (level === 1) {
      gameScreen.classList.add("level-1")
      levelTitle.textContent = "NIVEL 1 - PRINCIPIANTE"
    } else if (level === 2) {
      gameScreen.classList.add("level-2")
      levelTitle.textContent = "NIVEL 2 - VELOCIDAD EXTREMA"
    } else if (level === 3) {
      gameScreen.classList.add("level-3")
      levelTitle.textContent = "NIVEL 3 - DESAFÍO IA"
    }
  }
}