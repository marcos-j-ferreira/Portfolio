// Jogo de pouso de avião
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const speedElement = document.getElementById('speed');
    const altitudeElement = document.getElementById('altitude');
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restart');
    
    // Configurações do jogo
    let gameRunning = true;
    let score = 0;
    let speed = 300;
    let altitude = 2000;
    let position = canvas.width / 2 - 25;
    let gravity = 0.2;
    let lift = -0.5;
    let velocity = 0;
    let runwayY = canvas.height - 50;
    let runwayWidth = 150;
    let runwayX = (canvas.width - runwayWidth) / 2;
    
    // Imagens (usaremos formas geométricas por simplicidade)
    function drawAirplane() {
        // Corpo do avião
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(position, altitude, 50, 15);
        
        // Asas
        ctx.fillStyle = '#CC0000';
        ctx.fillRect(position - 10, altitude + 5, 70, 5);
        
        // Cauda
        ctx.fillStyle = '#CC0000';
        ctx.fillRect(position + 40, altitude - 10, 5, 20);
    }
    
    function drawBackground() {
        // Céu
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#E0F7FA');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Montanhas ao fundo
        ctx.fillStyle = '#7E8D85';
        ctx.beginPath();
        ctx.moveTo(0, runwayY);
        ctx.lineTo(100, runwayY - 120);
        ctx.lineTo(250, runwayY);
        ctx.lineTo(400, runwayY - 80);
        ctx.lineTo(550, runwayY);
        ctx.lineTo(700, runwayY - 100);
        ctx.lineTo(canvas.width, runwayY);
        ctx.fill();
        
        // Pista
        ctx.fillStyle = '#3A3A3A';
        ctx.fillRect(runwayX, runwayY, runwayWidth, 50);
        
        // Marcas da pista
        ctx.fillStyle = '#FFFFFF';
        for (let i = 0; i < 10; i++) {
            ctx.fillRect(runwayX + runwayWidth/2 - 5, runwayY + 10 + i * 5, 10, 2);
        }
    }
    
    function update() {
        // Aplicar gravidade
        velocity += gravity;
        altitude += velocity;
        
        // Limitar movimento
        if (altitude <= 0) altitude = 0;
        if (altitude >= runwayY - 15) {
            altitude = runwayY - 15;
            checkLanding();
        }
        
        // Atualizar velocidade (deceleração natural)
        if (speed > 0) speed -= 0.5;
        
        // Atualizar elementos de UI
        speedElement.textContent = Math.round(speed);
        altitudeElement.textContent = Math.round(altitude);
    }
    
    function checkLanding() {
        // Verificar se o pouso foi bem-sucedido
        const onRunway = position >= runwayX - 25 && position <= runwayX + runwayWidth - 25;
        const goodSpeed = speed < 200;
        
        if (onRunway && goodSpeed) {
            // Pouso bem-sucedido
            score = Math.round(10000 - speed * 10 + (canvas.width - Math.abs(position - canvas.width/2)));
            scoreElement.textContent = score;
            gameRunning = false;
            alert(`Pouso perfeito! Sua pontuação: ${score}`);
        } else if (altitude >= runwayY - 15) {
            // Colisão com o solo
            gameRunning = false;
            if (!onRunway) {
                alert('Você caiu fora da pista! Tente novamente.');
            } else {
                alert(`Muito rápido! Sua velocidade: ${Math.round(speed)} km/h. Reduza para menos de 200 km/h.`);
            }
        }
    }
    
    function draw() {
        // Limpar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Desenhar elementos
        drawBackground();
        drawAirplane();
    }
    
    function gameLoop() {
        if (gameRunning) {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }
    }
    
    // Controles
    document.addEventListener('keydown', function(e) {
        if (!gameRunning) return;
        
        if (e.key === 'ArrowLeft') {
            position -= 10;
            if (position < 0) position = 0;
        }
        
        if (e.key === 'ArrowRight') {
            position += 10;
            if (position > canvas.width - 50) position = canvas.width - 50;
        }
        
        if (e.key === ' ') {
            // Barra de espaço reduz velocidade
            if (speed > 0) speed -= 5;
            velocity += lift; // Gera um pouco de sustentação
        }
    });
    
    // Botão de reiniciar
    restartButton.addEventListener('click', function() {
        gameRunning = true;
        speed = 300;
        altitude = 2000;
        position = canvas.width / 2 - 25;
        velocity = 0;
        score = 0;
        scoreElement.textContent = score;
        gameLoop();
    });
    
    // Iniciar o jogo
    gameLoop();
});