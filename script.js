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
"Respeitar as diferenças torna o mundo melhor!",  
"Bullying não é brincadeira, é violência!",  
"Seja gentil, todos merecem respeito!",  
"Palavras machucam, escolha bem as suas!",  
"Ninguém merece sofrer bullying, diga não!",  
"A empatia transforma vidas!",  
"Juntos podemos acabar com o bullying!",  
"Seja o amigo que você gostaria de ter!",  
"Apoie, não humilhe!",  
"O respeito começa com você!",  
"O silêncio também é cumplicidade, denuncie!",  
"Seja gentil, sua atitude pode mudar o dia de alguém!",  
"Não ria da dor dos outros!",  
"Valorize as diferenças, elas nos fazem únicos!",  
"Ser diferente não é motivo para discriminação!",  
"Cada um tem sua história, respeite!",  
"Pratique a empatia, o mundo agradece!",  
"Não alimente o bullying, combata-o!",  
"Ninguém precisa se sentir inferior para o outro se sentir superior!",  
"Pare, pense e respeite!",  
"O bullying deixa marcas, escolha ser gentil!",  
"Seja luz, não sombra na vida de alguém!",  
"Ajude quem sofre bullying, não ignore!",  
"Diga não ao bullying, espalhe o respeito!",  
"O respeito é a chave para um mundo melhor!",  
"Não humilhe para se sentir superior!",  
"Ser legal nunca sai de moda!",  
"A gentileza pode mudar uma vida!",  
"Não seja espectador, seja parte da mudança!",  
"O respeito constrói, o bullying destrói!",  
"Faça do mundo um lugar melhor, respeite!",  
"Bullying não fortalece, machuca!",  
"Seja um herói contra o bullying!",  
"A diversidade nos torna mais fortes!",  
"A diferença não é defeito, é riqueza!",  
"Sua atitude pode inspirar mudanças!",  
"Ser cruel não te faz mais forte!",  
"Vamos juntos acabar com o bullying!",  
"Todo mundo merece ser tratado com respeito!",  
"Diga sim ao respeito e não ao bullying!"
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
