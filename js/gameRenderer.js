export class GameRenderer {
  constructor() {
    this.canvas = null
    this.context = null
  }

  setCanvas(canvas) {
    this.canvas = canvas
    this.context = canvas.getContext("2d")
  }

  draw(gameState) {
    if (!this.context || !this.canvas) return

    // Limpiar canvas
    this.context.fillStyle = "rgba(0, 0, 0, 0.1)"
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Dibujar línea central
    this.drawCenterLine(gameState)

    // Dibujar trail de la pelota
    this.drawBallTrail(gameState)

    // Dibujar pelota con efecto glow
    this.drawBall(gameState)

    // Dibujar paletas con efecto glow
    this.drawPaddles(gameState)

    // Dibujar partículas
    this.drawParticles(gameState)

    // Efecto disco mode
    if (gameState.discoMode) {
      this.drawDiscoEffect(gameState)
    }
  }

  drawCenterLine(gameState) {
    this.context.strokeStyle = gameState.discoMode ? gameState.getRandomColor() : "#00ffff"
    this.context.setLineDash([10, 10])
    this.context.lineWidth = 2
    this.context.beginPath()
    this.context.moveTo(this.canvas.width / 2, 0)
    this.context.lineTo(this.canvas.width / 2, this.canvas.height)
    this.context.stroke()
  }

  drawBallTrail(gameState) {
    gameState.ballTrail.forEach((point, index) => {
      this.context.save()
      this.context.globalAlpha = (index / gameState.ballTrail.length) * 0.5
      this.context.fillStyle = point.color
      this.context.beginPath()
      this.context.arc(point.x, point.y, gameState.ballSize * (index / gameState.ballTrail.length), 0, Math.PI * 2)
      this.context.fill()
      this.context.restore()
    })
  }

  drawBall(gameState) {
    this.context.save()
    this.context.shadowColor = gameState.ballColor
    this.context.shadowBlur = 20
    this.context.fillStyle = gameState.ballColor
    this.context.beginPath()
    this.context.arc(gameState.ballX, gameState.ballY, gameState.ballSize, 0, Math.PI * 2)
    this.context.fill()
    this.context.restore()
  }

  drawPaddles(gameState) {
    this.context.save()
    this.context.shadowColor = "#ffffff"
    this.context.shadowBlur = 10
    this.context.fillStyle = "#ffffff"

    // Paleta izquierda
    this.context.fillRect(10, gameState.leftPaddleY, gameState.paddleWidth, gameState.paddleHeight)

    // Paleta derecha
    this.context.fillRect(
      this.canvas.width - gameState.paddleWidth - 10,
      gameState.rightPaddleY,
      gameState.paddleWidth,
      gameState.paddleHeight,
    )
    this.context.restore()
  }

  drawParticles(gameState) {
    gameState.particles.forEach((p) => {
      this.context.save()
      this.context.globalAlpha = p.life / 30
      this.context.fillStyle = p.color
      this.context.beginPath()
      this.context.arc(p.x, p.y, 2, 0, Math.PI * 2)
      this.context.fill()
      this.context.restore()
    })
  }

  drawDiscoEffect(gameState) {
    this.context.save()
    this.context.globalAlpha = 0.1
    this.context.fillStyle = gameState.getRandomColor()
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.restore()
  }
}
