// Variables globales del juego
let currentScreen = "welcome"
let gameLevel = 1
let gameRunning = false
let gamePaused = false
let discoMode = false

// Variables de audio - CORREGIR RUTAS
const hitSound = new Audio("assets/sounds/hit.mp3")
const musicLevel1 = new Audio("assets/sounds/bg-music.mp3")
const musicLevel2 = new Audio("assets/sounds/bg-music-2.mp3")
const decideSound = new Audio("assets/sounds/decide.mp3")
let isMuted = false
let audioInitialized = false

// Configurar audios
;[hitSound, musicLevel1, musicLevel2, decideSound].forEach((audio) => {
  audio.load()
})

musicLevel1.loop = true
musicLevel2.loop = true

// Variables del canvas y contexto
let canvas, ctx

// Variables del juego
let ballX, ballY, ballSpeedX, ballSpeedY
let leftPaddleY, rightPaddleY
let leftScore = 0,
  rightScore = 0
let ballColor = "#00ffff"
let ballTrail = []
const particles = []

// Configuración del juego (valores originales)
const PADDLE_WIDTH = 12
const PADDLE_HEIGHT = 80
const BALL_SIZE = 8
let paddleSpeed = 6
let aiSpeed = 5

// Colores para efectos
const colors = [
  "#ff6347",
  "#ffd700",
  "#adff2f",
  "#00ffff",
  "#ff1493",
  "#ffff00",
  "#00ff00",
  "#ff4500",
  "#dc143c",
  "#ff00ff",
]

// Control de teclado
const keys = {}

// Funciones de audio
function initializeAudio() {
  if (!audioInitialized) {
    // Reproducir y pausar inmediatamente para inicializar
    ;[hitSound, musicLevel1, musicLevel2, decideSound].forEach((audio) => {
      audio
        .play()
        .then(() => {
          audio.pause()
          audio.currentTime = 0
        })
        .catch((e) => console.log("Audio initialization failed:", e))
    })
    audioInitialized = true
  }
}

function playHit() {
  if (!isMuted && audioInitialized) {
    hitSound.currentTime = 0
    hitSound.play().catch((e) => console.log("Hit sound failed:", e))
  }
}

function playMusicLevel1() {
  if (!isMuted && audioInitialized) {
    musicLevel2.pause()
    musicLevel1.currentTime = 0
    musicLevel1.play().catch((e) => console.log("Music level 1 failed:", e))
  }
}

function playMusicLevel2() {
  if (!isMuted && audioInitialized) {
    musicLevel1.pause()
    musicLevel2.currentTime = 0
    musicLevel2.play().catch((e) => console.log("Music level 2 failed:", e))
  }
}

function playDecideSound() {
  if (!isMuted && audioInitialized) {
    decideSound.currentTime = 0
    decideSound.play().catch((e) => console.log("Decide sound failed:", e))
  }
}

function pauseMusic() {
  musicLevel1.pause()
  musicLevel2.pause()
}

function toggleVolume() {
  isMuted = !isMuted
  ;[hitSound, musicLevel1, musicLevel2, decideSound].forEach((audio) => {
    audio.muted = isMuted
  })

  const volumeBtn = document.getElementById("volumeBtn")
  if (volumeBtn) {
    volumeBtn.textContent = isMuted ? "🔇" : "🔊"
  }
}

// Inicializar el juego
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners()
  canvas = document.getElementById("gameCanvas")
  if (canvas) {
    ctx = canvas.getContext("2d")
  }
  showScreen("welcomeScreen")
})

// Event listeners
function setupEventListeners() {
  // Pantalla de bienvenida
  const startBtn = document.getElementById("startBtn")
  if (startBtn) {
    startBtn.addEventListener("click", () => showScreen("menuScreen"))
  }

  // Pantalla de menú
  const backBtn = document.getElementById("backBtn")
  if (backBtn) {
    backBtn.addEventListener("click", () => showScreen("welcomeScreen"))
  }

  const level1Btn = document.getElementById("level1Btn")
  if (level1Btn) {
    level1Btn.addEventListener("click", () => startGame(1))
  }

  const level2Btn = document.getElementById("level2Btn")
  if (level2Btn) {
    level2Btn.addEventListener("click", () => startGame(2))
  }

  const level3Btn = document.getElementById("level3Btn")
  if (level3Btn) {
    level3Btn.addEventListener("click", () => startGame(3))
  }

  // Controles de juego
  const menuBtn = document.getElementById("menuBtn")
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      gameRunning = false
      pauseMusic()
      showScreen("menuScreen")
    })
  }

  const pauseBtn = document.getElementById("pauseBtn")
  if (pauseBtn) {
    pauseBtn.addEventListener("click", pauseGame)
  }

  // Pantalla de pausa
  const resumeBtn = document.getElementById("resumeBtn")
  if (resumeBtn) {
    resumeBtn.addEventListener("click", resumeGame)
  }

  const restartBtn = document.getElementById("restartBtn")
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      gamePaused = false
      startGame(gameLevel)
    })
  }

  const mainMenuBtn = document.getElementById("mainMenuBtn")
  if (mainMenuBtn) {
    mainMenuBtn.addEventListener("click", () => {
      gameRunning = false
      gamePaused = false
      pauseMusic()
      showScreen("menuScreen")
    })
  }

  // Pantalla de fin
  const playAgainBtn = document.getElementById("playAgainBtn")
  if (playAgainBtn) {
    playAgainBtn.addEventListener("click", () => startGame(gameLevel))
  }

  const endMenuBtn = document.getElementById("endMenuBtn")
  if (endMenuBtn) {
    endMenuBtn.addEventListener("click", () => showScreen("menuScreen"))
  }

  // Easter egg
  const closeEasterBtn = document.getElementById("closeEasterBtn")
  if (closeEasterBtn) {
    closeEasterBtn.addEventListener("click", () => showScreen("welcomeScreen"))
  }

  // Controles de teclado
  document.addEventListener("keydown", (e) => {
    keys[e.key] = true

    // Easter egg - tecla K
    if (e.key.toLowerCase() === "k") {
      discoMode = !discoMode
      playDecideSound()
      showScreen("easterEggScreen")
      setTimeout(() => {
        showScreen("welcomeScreen")
      }, 3000)
    }

    // Pausa con Escape
    if (e.key === "Escape" && gameRunning) {
      if (gamePaused) {
        resumeGame()
      } else {
        pauseGame()
      }
    }
  })

  document.addEventListener("keyup", (e) => {
    keys[e.key] = false
  })

  // Botón de volumen
  const volumeBtn = document.getElementById("volumeBtn")
  if (volumeBtn) {
    volumeBtn.addEventListener("click", toggleVolume)
  }

  // Inicializar audio en la primera interacción del usuario
  document.addEventListener("click", initializeAudio, { once: true })
  document.addEventListener("keydown", initializeAudio, { once: true })
}

// Mostrar pantalla
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active")
  })

  const screen = document.getElementById(screenId)
  if (screen) {
    screen.classList.add("active")
    currentScreen = screenId
  }
}

// Iniciar juego (configuración original)
function startGame(level) {
  gameLevel = level
  gameRunning = true
  gamePaused = false
  leftScore = 0
  rightScore = 0

  // Configurar nivel con valores originales
  const levelInfo = document.getElementById("levelInfo")
  if (levelInfo) {
    if (level === 1) {
      levelInfo.textContent = "NIVEL 1 - PRINCIPIANTE"
      paddleSpeed = 6
      aiSpeed = 5
      ballColor = "#00ffff"
    } else if (level === 2) {
      levelInfo.textContent = "NIVEL 2 - VELOCIDAD EXTREMA"
      paddleSpeed = 7
      aiSpeed = 6
      ballColor = "#ffd700"
    } else if (level === 3) {
      levelInfo.textContent = "NIVEL 3 - DESAFÍO IA"
      paddleSpeed = 7
      aiSpeed = 6
      ballColor = "#ff00ff"
    }
  }

  resetBall()
  updateScore()
  showScreen("gameScreen")
  gameLoop()

  // Reproducir música según el nivel
  if (level === 1) {
    playMusicLevel1()
  } else {
    playMusicLevel2()
  }
}

// Resetear pelota (velocidades constantes originales - TU VERSIÓN EXACTA)
function resetBall() {
  if (!canvas) return

  ballX = canvas.width / 2
  ballY = canvas.height / 2
  leftPaddleY = canvas.height / 2 - PADDLE_HEIGHT / 2
  rightPaddleY = canvas.height / 2 - PADDLE_HEIGHT / 2

  // Velocidades constantes por nivel (sin cambios durante el juego) - TU VERSIÓN ORIGINAL
  if (gameLevel === 1) {
    ballSpeedX = Math.random() > 0.5 ? 6 : -6 // Incrementar velocidad
    ballSpeedY = Math.random() * 5 - 2.5 // Incrementar velocidad
  } else if (gameLevel === 2) {
    ballSpeedX = Math.random() > 0.5 ? 12 : -12 // Incrementar velocidad
    ballSpeedY = Math.random() * 10 - 5 // Incrementar velocidad
  } else if (gameLevel === 3) {
    ballSpeedX = Math.random() > 0.5 ? 10 : -10 // Incrementar velocidad
    ballSpeedY = Math.random() * 9 - 4.5 // Incrementar velocidad
  }

  ballTrail = []
}

// Actualizar puntuación
function updateScore() {
  const scoreElement = document.getElementById("score")
  if (scoreElement) {
    scoreElement.textContent = `${leftScore} : ${rightScore}`
  }
}

// Pausar juego
function pauseGame() {
  if (gameRunning && !gamePaused) {
    gamePaused = true
    showScreen("pauseScreen")
  }
}

// Reanudar juego
function resumeGame() {
  if (gamePaused) {
    gamePaused = false
    showScreen("gameScreen")
  }
}

// Terminar juego
function endGame(message) {
  gameRunning = false
  gamePaused = false
  pauseMusic()

  const endMessage = document.getElementById("endMessage")
  const finalScore = document.getElementById("finalScore")

  if (endMessage) endMessage.textContent = message
  if (finalScore) finalScore.textContent = `Puntuación Final: ${leftScore} - ${rightScore}`

  showScreen("endScreen")
}

// Obtener color aleatorio
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

// Crear partícula
function createParticle(x, y, color) {
  particles.push({
    x: x,
    y: y,
    vx: (Math.random() - 0.5) * 4,
    vy: (Math.random() - 0.5) * 4,
    life: 30,
    color: color,
  })
}

// Función para calcular ganador (original)
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

// Actualizar juego (física original - TU VERSIÓN EXACTA)
function updateGame() {
  if (!gameRunning || gamePaused || !canvas) return

  // Mover pelota con velocidad constante
  ballX += ballSpeedX
  ballY += ballSpeedY

  // Trail de la pelota
  ballTrail.push({ x: ballX, y: ballY, color: ballColor })
  if (ballTrail.length > 10) {
    ballTrail.shift()
  }

  // Colisión con paredes superior e inferior
  if (ballY <= BALL_SIZE || ballY >= canvas.height - BALL_SIZE) {
    ballSpeedY = -ballSpeedY // Solo cambiar dirección, NO velocidad
    playHit() // Reproducir sonido
    ballColor = discoMode ? getRandomColor() : ballColor
    createParticle(ballX, ballY, ballColor)
  }

  // Colisión con paleta izquierda (SIN aceleración) - TU VERSIÓN ORIGINAL
  if (
    ballX - BALL_SIZE <= PADDLE_WIDTH + 10 &&
    ballY >= leftPaddleY &&
    ballY <= leftPaddleY + PADDLE_HEIGHT &&
    ballSpeedX < 0
  ) {
    ballSpeedX = -ballSpeedX // Solo cambiar dirección, mantener velocidad constante
    playHit() // Reproducir sonido
    // Efecto de ángulo basado en dónde golpea la paleta
    const relativeIntersectY = leftPaddleY + PADDLE_HEIGHT / 2 - ballY
    const normalizedRelativeIntersectionY = relativeIntersectY / (PADDLE_HEIGHT / 2)
    ballSpeedY = normalizedRelativeIntersectionY * Math.abs(ballSpeedX) * 0.5

    ballColor = discoMode ? getRandomColor() : ballColor
    createParticle(ballX, ballY, ballColor)
  }

  // Colisión con paleta derecha (SIN aceleración) - TU VERSIÓN ORIGINAL
  if (
    ballX + BALL_SIZE >= canvas.width - PADDLE_WIDTH - 10 &&
    ballY >= rightPaddleY &&
    ballY <= rightPaddleY + PADDLE_HEIGHT &&
    ballSpeedX > 0
  ) {
    ballSpeedX = -ballSpeedX // Solo cambiar dirección, mantener velocidad constante
    playHit() // Reproducir sonido
    // Efecto de ángulo basado en dónde golpea la paleta
    const relativeIntersectY = rightPaddleY + PADDLE_HEIGHT / 2 - ballY
    const normalizedRelativeIntersectionY = relativeIntersectY / (PADDLE_HEIGHT / 2)
    ballSpeedY = normalizedRelativeIntersectionY * Math.abs(ballSpeedX) * 0.5

    ballColor = discoMode ? getRandomColor() : ballColor
    createParticle(ballX, ballY, ballColor)
  }

  // Puntuación
  if (ballX < 0) {
    rightScore++
    updateScore()
    createParticle(ballX, ballY, "#ff0040")
    if (rightScore >= 10) {
      endGame(gameLevel === 3 ? "¡HAS DERROTADO A LA IA!" : "¡JUGADOR 2 GANA!")
      return
    }
    resetBall()
  }

  if (ballX > canvas.width) {
    leftScore++
    updateScore()
    createParticle(ballX, ballY, "#00ff00")
    if (leftScore >= 10) {
      endGame(gameLevel === 3 ? "¡LA IA TE HA VENCIDO!" : "¡JUGADOR 1 GANA!")
      return
    }
    resetBall()
  }

  // Control de paletas (lógica original) - TU VERSIÓN EXACTA
  if (gameLevel === 3) {
    // IA mejorada para nivel 3
    const ballCenter = ballY
    const paddleCenter = leftPaddleY + PADDLE_HEIGHT / 2
    const diff = ballCenter - paddleCenter

    if (Math.abs(diff) > 5) {
      if (diff > 0 && leftPaddleY < canvas.height - PADDLE_HEIGHT) {
        leftPaddleY += Math.min(aiSpeed, diff * 0.1)
      } else if (diff < 0 && leftPaddleY > 0) {
        leftPaddleY += Math.max(-aiSpeed, diff * 0.1)
      }
    }
  } else {
    // Control manual jugador 1
    if (keys["w"] && leftPaddleY > 0) {
      leftPaddleY -= paddleSpeed
    }
    if (keys["s"] && leftPaddleY < canvas.height - PADDLE_HEIGHT) {
      leftPaddleY += paddleSpeed
    }
  }

  // Jugador 2
  if (keys["ArrowUp"] && rightPaddleY > 0) {
    rightPaddleY -= paddleSpeed
  }
  if (keys["ArrowDown"] && rightPaddleY < canvas.height - PADDLE_HEIGHT) {
    rightPaddleY += paddleSpeed
  }

  // Actualizar partículas
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.x += p.vx
    p.y += p.vy
    p.life--
    if (p.life <= 0) {
      particles.splice(i, 1)
    }
  }
}

// Renderizar juego
function renderGame() {
  if (!ctx || !canvas) return

  // Limpiar canvas
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Línea central
  ctx.strokeStyle = discoMode ? getRandomColor() : "#00ffff"
  ctx.setLineDash([10, 10])
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(canvas.width / 2, 0)
  ctx.lineTo(canvas.width / 2, canvas.height)
  ctx.stroke()

  // Trail de la pelota
  ballTrail.forEach((point, index) => {
    ctx.save()
    ctx.globalAlpha = (index / ballTrail.length) * 0.5
    ctx.fillStyle = point.color
    ctx.beginPath()
    ctx.arc(point.x, point.y, BALL_SIZE * (index / ballTrail.length), 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  })

  // Pelota con efecto glow
  ctx.save()
  ctx.shadowColor = ballColor
  ctx.shadowBlur = 20
  ctx.fillStyle = ballColor
  ctx.beginPath()
  ctx.arc(ballX, ballY, BALL_SIZE, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // Paletas con efecto glow
  ctx.save()
  ctx.shadowColor = "#ffffff"
  ctx.shadowBlur = 10
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(10, leftPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT)
  ctx.fillRect(canvas.width - PADDLE_WIDTH - 10, rightPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT)
  ctx.restore()

  // Partículas
  particles.forEach((p) => {
    ctx.save()
    ctx.globalAlpha = p.life / 30
    ctx.fillStyle = p.color
    ctx.beginPath()
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  })

  // Efecto disco
  if (discoMode) {
    ctx.save()
    ctx.globalAlpha = 0.1
    ctx.fillStyle = getRandomColor()
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.restore()
  }
}

// Loop principal del juego
function gameLoop() {
  if (!gameRunning) return

  updateGame()
  renderGame()

  requestAnimationFrame(gameLoop)
}
