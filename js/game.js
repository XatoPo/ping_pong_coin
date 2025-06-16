import { keysPressed } from "./input.js"
import { playHit, playMusicLevel1, playMusicLevel2, pauseMusic, toggleVolume } from "./sound.js"
import { GameState } from "./gameState.js"
import { GameRenderer } from "./gameRenderer.js"
import { GameLogic } from "./gameLogic.js"
import { EasterEggs } from "./easterEggs.js"
import { UIManager } from "./uiManager.js"

class PingPongGame {
  constructor() {
    this.gameState = new GameState()
    this.gameRenderer = new GameRenderer()
    this.gameLogic = new GameLogic(this.gameState)
    this.easterEggs = new EasterEggs(this.gameState)
    this.uiManager = new UIManager(this.gameState)

    this.init()
  }

  init() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setupGame())
    } else {
      this.setupGame()
    }
  }

  setupGame() {
    this.setupCanvas()
    this.setupEventListeners()
    this.uiManager.showWelcomeScreen()
  }

  setupCanvas() {
    const canvas = document.getElementById("pong")
    if (!canvas) {
      console.error("Canvas element not found!")
      return
    }

    canvas.width = 800
    canvas.height = 400
    this.gameRenderer.setCanvas(canvas)
  }

  setupEventListeners() {
    // Botones de navegación
    this.addEventListenerSafe("startBtn", "click", () => {
      this.uiManager.showMenuScreen()
    })

    this.addEventListenerSafe("backToWelcomeBtn", "click", () => {
      this.uiManager.showWelcomeScreen()
      pauseMusic()
    })

    // Botones de nivel
    this.addEventListenerSafe("level1Btn", "click", () => {
      this.startGame(1)
    })

    this.addEventListenerSafe("level2Btn", "click", () => {
      this.startGame(2)
    })

    this.addEventListenerSafe("level3Btn", "click", () => {
      this.startGame(3)
    })

    // Controles de juego
    this.addEventListenerSafe("backToMenuBtn", "click", () => {
      this.gameState.gameRunning = false
      this.gameState.gamePaused = false
      this.uiManager.showMenuScreen()
      pauseMusic()
    })

    this.addEventListenerSafe("pauseBtn", "click", () => {
      this.pauseGame()
    })

    this.addEventListenerSafe("resumeBtn", "click", () => {
      this.resumeGame()
    })

    this.addEventListenerSafe("restartBtn", "click", () => {
      this.restartGame()
    })

    this.addEventListenerSafe("pauseMenuBtn", "click", () => {
      this.gameState.gameRunning = false
      this.gameState.gamePaused = false
      this.uiManager.showMenuScreen()
      pauseMusic()
    })

    this.addEventListenerSafe("playAgainBtn", "click", () => {
      this.startGame(this.gameState.level)
    })

    this.addEventListenerSafe("endMenuBtn", "click", () => {
      this.uiManager.showMenuScreen()
    })

    this.addEventListenerSafe("closeEasterEggBtn", "click", () => {
      this.uiManager.showWelcomeScreen()
    })

    // Botón de volumen
    this.addEventListenerSafe("volumeBtn", "click", () => {
      toggleVolume() // Activar/desactivar volumen
      const volumeBtn = document.getElementById("volumeBtn")
      if (volumeBtn) {
        volumeBtn.textContent = isMuted ? "🔇" : "🔊"
      }
    })

    // Easter eggs y controles especiales
    document.addEventListener("keydown", (e) => {
      this.easterEggs.handleKeyPress(e, this.uiManager)
      this.handleSpecialKeys(e)
    })
  }

  addEventListenerSafe(elementId, event, handler) {
    const element = document.getElementById(elementId)
    if (element) {
      element.addEventListener(event, handler)
    } else {
      console.warn(`Element with id '${elementId}' not found`)
    }
  }

  handleSpecialKeys(e) {
    // Pausa con Escape
    if (e.key === "Escape" && this.gameState.gameRunning) {
      if (this.gameState.gamePaused) {
        this.resumeGame()
      } else {
        this.pauseGame()
      }
    }
  }

  startGame(level) {
    this.gameState.level = level
    this.gameState.resetGame()
    this.uiManager.showGameScreen()
    this.uiManager.setLevelBackground(level)
    this.gameState.gameRunning = true
    this.gameState.gamePaused = false

    // Música por nivel
    if (level === 1) {
      playMusicLevel1()
    } else {
      playMusicLevel2()
    }

    // Ajustar velocidad de la pelota para nivel 2
    if (level === 2) {
      this.gameState.ballSpeedX = Math.random() > 0.5 ? 10 : -10 // Reducir velocidad
      this.gameState.ballSpeedY = Math.random() * 8 - 4 // Reducir velocidad
    }

    this.gameLoop()
  }

  pauseGame() {
    if (this.gameState.gameRunning && !this.gameState.gamePaused) {
      this.gameState.gamePaused = true
      this.uiManager.showPauseScreen()
      pauseMusic()
    }
  }

  resumeGame() {
    if (this.gameState.gamePaused) {
      this.gameState.gamePaused = false
      this.uiManager.showGameScreen()
      if (this.gameState.level === 1) {
        playMusicLevel1()
      } else {
        playMusicLevel2()
      }
    }
  }

  restartGame() {
    this.gameState.gamePaused = false;
    this.gameState.resetGame(); // Reiniciar el juego con velocidad fija
    this.uiManager.showGameScreen();
    this.gameState.gameRunning = true;

    if (this.gameState.level === 1) {
        playMusicLevel1();
    } else {
        playMusicLevel2();
    }
  }

  endGame(message) {
    this.gameState.gameRunning = false
    this.gameState.gamePaused = false
    this.uiManager.showEndScreen(message, this.gameState.leftScore, this.gameState.rightScore)
    pauseMusic()
  }

  gameLoop() {
    if (!this.gameState.gameRunning) return

    this.gameLogic.update(keysPressed, playHit, (message) => this.endGame(message))
    this.gameRenderer.draw(this.gameState)

    requestAnimationFrame(() => this.gameLoop())
  }
}

// Inicializar el juego
new PingPongGame()