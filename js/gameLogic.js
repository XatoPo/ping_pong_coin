export class GameLogic {
  constructor(gameState) {
    this.gameState = gameState;
  }

  update(keysPressed, playHit, endGameCallback) {
    if (!this.gameState.gameRunning || this.gameState.gamePaused) return;

    const canvas = document.getElementById("pong");
    if (!canvas) return;

    // Actualizar posición de la pelota
    this.gameState.ballX += this.gameState.ballSpeedX;
    this.gameState.ballY += this.gameState.ballSpeedY;

    // Agregar trail a la pelota
    this.gameState.ballTrail.push({
      x: this.gameState.ballX,
      y: this.gameState.ballY,
      color: this.gameState.ballColor,
    });
    if (this.gameState.ballTrail.length > 10) {
      this.gameState.ballTrail.shift();
    }

    // Colisión con paredes superior e inferior
    if (
      this.gameState.ballY <= this.gameState.ballSize ||
      this.gameState.ballY >= canvas.height - this.gameState.ballSize
    ) {
      this.gameState.ballSpeedY = -this.gameState.ballSpeedY;
      playHit(); // Reproducir sonido en rebote
      this.gameState.ballColor = this.gameState.discoMode
        ? this.gameState.getRandomColor()
        : this.gameState.ballColor;
      this.gameState.createParticle(
        this.gameState.ballX,
        this.gameState.ballY,
        this.gameState.ballColor
      );
    }

    // Colisión con paleta izquierda
    if (
      this.gameState.ballX - this.gameState.ballSize <=
        this.gameState.paddleWidth + 10 &&
      this.gameState.ballY >= this.gameState.leftPaddleY &&
      this.gameState.ballY <=
        this.gameState.leftPaddleY + this.gameState.paddleHeight &&
      this.gameState.ballSpeedX < 0
    ) {
      this.gameState.ballSpeedX = -this.gameState.ballSpeedX * 1.05;
      playHit(); // Reproducir sonido en rebote
      this.gameState.ballColor = this.gameState.discoMode
        ? this.gameState.getRandomColor()
        : this.gameState.ballColor;
      this.gameState.createParticle(
        this.gameState.ballX,
        this.gameState.ballY,
        this.gameState.ballColor
      );
    }

    // Colisión con paleta derecha
    if (
      this.gameState.ballX + this.gameState.ballSize >=
        canvas.width - this.gameState.paddleWidth - 10 &&
      this.gameState.ballY >= this.gameState.rightPaddleY &&
      this.gameState.ballY <=
        this.gameState.rightPaddleY + this.gameState.paddleHeight &&
      this.gameState.ballSpeedX > 0
    ) {
      this.gameState.ballSpeedX = -this.gameState.ballSpeedX * 1.05;
      playHit(); // Reproducir sonido en rebote
      this.gameState.ballColor = this.gameState.discoMode
        ? this.gameState.getRandomColor()
        : this.gameState.ballColor;
      this.gameState.createParticle(
        this.gameState.ballX,
        this.gameState.ballY,
        this.gameState.ballColor
      );
    }

    // Puntuación
    if (this.gameState.ballX < 0) {
      this.gameState.rightScore++;
      this.gameState.updateScore();
      this.gameState.createParticle(
        this.gameState.ballX,
        this.gameState.ballY,
        "#ff0040"
      );
      if (this.gameState.rightScore >= 10) {
        endGameCallback(
          this.gameState.level === 3
            ? "¡HAS DERROTADO A LA IA!"
            : "¡JUGADOR 2 GANA!"
        );
        return;
      }
      this.gameState.resetPositions();
    }

    if (this.gameState.ballX > canvas.width) {
      this.gameState.leftScore++;
      this.gameState.updateScore();
      this.gameState.createParticle(
        this.gameState.ballX,
        this.gameState.ballY,
        "#00ff00"
      );
      if (this.gameState.leftScore >= 10) {
        endGameCallback(
          this.gameState.level === 3
            ? "¡LA IA TE HA VENCIDO!"
            : "¡JUGADOR 1 GANA!"
        );
        return;
      }
      this.gameState.resetPositions();
    }

    // Control de paletas
    this.updatePaddles(keysPressed, canvas);
    this.gameState.updateParticles();
  }

  updatePaddles(keysPressed, canvas) {
    if (this.gameState.level === 3) {
      // IA mejorada para nivel 3
      const ballCenter = this.gameState.ballY;
      const paddleCenter =
        this.gameState.leftPaddleY + this.gameState.paddleHeight / 2;
      const diff = ballCenter - paddleCenter;

      if (Math.abs(diff) > 5) {
        if (
          diff > 0 &&
          this.gameState.leftPaddleY <
            canvas.height - this.gameState.paddleHeight
        ) {
          this.gameState.leftPaddleY += Math.min(
            this.gameState.aiSpeed,
            diff * 0.1
          );
        } else if (diff < 0 && this.gameState.leftPaddleY > 0) {
          this.gameState.leftPaddleY += Math.max(
            -this.gameState.aiSpeed,
            diff * 0.1
          );
        }
      }
    } else {
      // Control manual jugador 1
      if (keysPressed["w"] && this.gameState.leftPaddleY > 0) {
        this.gameState.leftPaddleY -= this.gameState.paddleSpeed;
      }
      if (
        keysPressed["s"] &&
        this.gameState.leftPaddleY < canvas.height - this.gameState.paddleHeight
      ) {
        this.gameState.leftPaddleY += this.gameState.paddleSpeed;
      }
    }

    // Control jugador 2
    if (keysPressed["ArrowUp"] && this.gameState.rightPaddleY > 0) {
      this.gameState.rightPaddleY -= this.gameState.paddleSpeed;
    }
    if (
      keysPressed["ArrowDown"] &&
      this.gameState.rightPaddleY < canvas.height - this.gameState.paddleHeight
    ) {
      this.gameState.rightPaddleY += this.gameState.paddleSpeed;
    }
  }
}
