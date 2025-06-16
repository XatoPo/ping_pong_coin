export class GameState {
  constructor() {
    // Configuración del juego
    this.paddleWidth = 12
    this.paddleHeight = 80
    this.ballSize = 8
    this.paddleSpeed = 6
    this.aiSpeed = 5

    // Estado del juego
    this.ballX = 0
    this.ballY = 0
    this.ballSpeedX = 0
    this.ballSpeedY = 0
    this.leftPaddleY = 0
    this.rightPaddleY = 0
    this.leftScore = 0
    this.rightScore = 0
    this.level = 0
    this.gameRunning = false
    this.gamePaused = false
    this.ballColor = "#00ffff"
    this.ballTrail = []
    this.discoMode = false
    this.particles = []

    // Colores para efectos
    this.colorArray = [
      "#ff6347",
      "#ffd700",
      "#adff2f",
      "#00ffff",
      "#ff1493",
      "#ffff00",
      "#00ff00",
      "#00ff7f",
      "#ff4500",
      "#dc143c",
      "#ff00ff",
      "#8a2be2",
      "#7fff00",
      "#ff8c00",
      "#32cd32",
      "#00bfff",
      "#ff0040",
      "#00ff80",
    ]

    this.resetGame()
  }

  getRandomColor() {
    return this.colorArray[Math.floor(Math.random() * this.colorArray.length)]
  }

  getBallAppearance() {
    if (this.level === 1) {
      return "#00ffff"
    } else if (this.level === 2) {
      return "#ffd700"
    } else if (this.level === 3) {
      return "#ff00ff"
    }
    return "#00ffff"
  }

  resetGame() {
    this.leftScore = 0
    this.rightScore = 0
    this.resetPositions()
    this.updateScore()
  }

  resetPositions() {
    const canvas = document.getElementById("pong");
    if (!canvas) return;

    this.leftPaddleY = canvas.height / 2 - this.paddleHeight / 2;
    this.rightPaddleY = canvas.height / 2 - this.paddleHeight / 2;
    this.ballX = canvas.width / 2;
    this.ballY = canvas.height / 2;
    this.ballTrail = [];

    // Configuración por nivel (velocidad fija)
    if (this.level === 1) {
        this.ballSpeedX = Math.random() > 0.5 ? 6 : -6; // Velocidad fija
        this.ballSpeedY = Math.random() * 5 - 2.5; // Velocidad fija
        this.paddleSpeed = 5
        this.aiSpeed = 4
        this.ballColor = "#00ffff"
    } else if (this.level === 2) {
        this.ballSpeedX = Math.random() > 0.5 ? 10 : -10; // Velocidad fija
        this.ballSpeedY = Math.random() * 8 - 4; // Velocidad fija
        this.paddleSpeed = 7
        this.aiSpeed = 6
        this.ballColor = "#ffd700"
    } else if (this.level === 3) {
        this.ballSpeedX = Math.random() > 0.5 ? 10 : -10; // Velocidad fija
        this.ballSpeedY = Math.random() * 9 - 4.5; // Velocidad fija
        this.paddleSpeed = 6
        this.aiSpeed = 7
        this.ballColor = "#ff00ff"
    }
  }

  updateScore() {
    const scoreDisplay = document.getElementById("score")
    if (scoreDisplay) {
      scoreDisplay.textContent = `${this.leftScore} : ${this.rightScore}`
    }
  }

  createParticle(x, y, color) {
    this.particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      life: 30,
      color: color,
    })
  }

  updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]
      p.x += p.vx
      p.y += p.vy
      p.life--

      if (p.life <= 0) {
        this.particles.splice(i, 1)
      }
    }
  }
}