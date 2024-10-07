const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const infoMessage = document.getElementById('infoMessage');
const scoreDisplay = document.getElementById('score');

let gameRunning = false;
let car, obstacles, items;
let gameSpeed = 2;
let score = 0;

const messages = [
  "Faça o autoexame mensalmente!",
  "A mamografia detecta o câncer de mama no início!",
  "Cuide da sua saúde: pratique exercícios!",
  "A prevenção salva vidas!",
  "A alimentação saudável ajuda na prevenção do câncer!",
  "O câncer de mama é mais fácil de tratar quando detectado cedo.",
  "Converse com suas amigas sobre a saúde da mulher!",
  "Mantenha um estilo de vida ativo para melhorar sua saúde.",
  "O autoexame pode salvar sua vida!",
  "Fique atenta a alterações nas mamas.",
  "As mulheres devem fazer mamografia anualmente após os 40 anos.",
  "Cuidado com a desinformação sobre câncer de mama.",
  "O apoio emocional é importante durante o tratamento.",
  "A prática de exercícios ajuda na recuperação.",
  "Informação é poder: aprenda sobre saúde da mulher!",
  "Se sentir algo diferente, procure um médico imediatamente!",
  "A saúde da mulher deve ser prioridade.",
  "Câncer de mama não é um tabu; fale sobre isso!",
  "Seja uma defensora da saúde: informe-se e informe os outros!",
  "A conscientização é uma ferramenta poderosa.",
  "Lembre-se: você não está sozinha na luta!",
  "O autoexame deve ser feito todo mês, sempre no mesmo dia.",
  "Participe de eventos de conscientização sobre câncer de mama.",
  "O tratamento precoce é fundamental para o sucesso.",
  "A prevenção pode ser a diferença entre a vida e a morte.",
  "O câncer de mama não escolhe idade; todas as mulheres estão em risco.",
  "Ajude a espalhar a palavra sobre a importância das consultas médicas.",
  "A empatia e o apoio são fundamentais para as sobreviventes.",
  "O câncer é uma batalha, mas a informação é sua aliada!",
  "Cuide de sua saúde emocional; é tão importante quanto a física.",
  "Nunca é tarde demais para começar a cuidar da sua saúde.",
  "A mulher que se cuida, se ama!",
  "Participe de campanhas e ajude a aumentar a conscientização."
];

// Inicializando o carro, obstáculos e itens
function initGame() {
  car = {
    x: 200,
    y: 350,
    width: 40,
    height: 80,
    dx: 0,
  };
  
  obstacles = [];
  items = [];
  score = 0;
  
  infoMessage.textContent = "";
  scoreDisplay.textContent = "Pontuação: 0";
  gameSpeed = 2;
  gameRunning = true;
  
  requestAnimationFrame(updateGame);
}

// Desenhando o carro
function drawCar() {
  ctx.fillStyle = "#ff69b4";
  ctx.fillRect(car.x, car.y, car.width, car.height);
}

// Desenhando obstáculos
function drawObstacle(obstacle) {
  ctx.fillStyle = "#070707FF";
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

// Desenhando itens educativos
function drawItem(item) {
  ctx.beginPath();
  ctx.arc(item.x, item.y, 15, 0, Math.PI * 2);
  ctx.fillStyle = "#D63DCFFF";
  ctx.fill();
  ctx.closePath();
}

// Movendo e gerando obstáculos
function moveObstacles() {
  obstacles.forEach((obstacle, index) => {
    obstacle.y += gameSpeed;
    
    if (obstacle.y > canvas.height) {
      obstacles.splice(index, 1);
    }
    
    drawObstacle(obstacle);
    
    // Colisão com obstáculos
    if (
      car.x < obstacle.x + obstacle.width &&
      car.x + car.width > obstacle.x &&
      car.y < obstacle.y + obstacle.height &&
      car.y + car.height > obstacle.y
    ) {
      gameOver(getRandomMessage());
    }
  });

  // Gerar novos obstáculos
  if (Math.random() < 0.02) {
    obstacles.push({
      x: Math.random() * (canvas.width - 40),
      y: -100,
      width: 40,
      height: 40,
    });
  }
}

// Movendo e gerando itens educativos
function moveItems() {
  items.forEach((item, index) => {
    item.y += gameSpeed;
    
    if (item.y > canvas.height) {
      items.splice(index, 1);
    }
    
    drawItem(item);
    
    // Colisão com itens
    if (
      car.x < item.x + 15 &&
      car.x + car.width > item.x - 15 &&
      car.y < item.y + 15 &&
      car.y + car.height > item.y - 15
    ) {
      items.splice(index, 1);
      score += 20;
      scoreDisplay.textContent = "Pontuação: " + score;
      infoMessage.textContent = messages[Math.floor(Math.random() * messages.length)];

      // Aumenta a velocidade a cada 160 pontos
      if (score % 160 === 0) {
        gameSpeed += 0.5;
      }
    }
  });

  // Gerar novos itens educativos
  if (Math.random() < 0.02) {
    items.push({
      x: Math.random() * (canvas.width - 30) + 15,
      y: -100,
    });
  }
}

// Atualizando o jogo a cada frame
function updateGame() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCar();
  moveObstacles();
  moveItems();
  
  car.x += car.dx;
  
  // Limites da pista
  if (car.x < 0) car.x = 0;
  if (car.x + car.width > canvas.width) car.x = canvas.width - car.width;
  
  requestAnimationFrame(updateGame);
}

// Movimentação do carro
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    car.dx = -4;
  } else if (e.key === 'ArrowRight') {
    car.dx = 4;
  }
});

document.addEventListener('keyup', () => {
  car.dx = 0;
});

// Função para pegar uma mensagem aleatória
function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

// Função de Game Over
function gameOver(message) {
  gameRunning = false;
  alert(message);
  startBtn.style.display = 'block';
}

// Iniciando o jogo
startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  initGame();
});
