class BouncingScreensaver {
    constructor() {
        // DOM elements
        this.container = document.getElementById('screensaver-container');
        this.ball = document.getElementById('bouncing-image');
        
        // Animation state
        this.isAnimating = true;
        this.speed = 4;
        this.bounceCount = 0;
        this.showTrail = true;
        
        // Ball properties
        this.ballSize = 120;
        this.x = Math.random() * (window.innerWidth - this.ballSize);
        this.y = Math.random() * (window.innerHeight - this.ballSize);
        
        // Velocity - calculate initial direction
        const actualSpeed = this.speed * 5;
        this.dx = actualSpeed * (Math.random() > 0.5 ? 1 : -1);
        this.dy = actualSpeed * (Math.random() > 0.5 ? 1 : -1);
        
        // Color palette for gradients
        this.colors = [
            'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            'linear-gradient(45deg, #a8e6cf, #ff8b94)',
            'linear-gradient(45deg, #ffd93d, #6bcf7f)',
            'linear-gradient(45deg, #74b9ff, #0984e3)',
            'linear-gradient(45deg, #fd79a8, #fdcb6e)',
            'linear-gradient(45deg, #6c5ce7, #a29bfe)',
            'linear-gradient(45deg, #fd79a8, #e84393)',
            'linear-gradient(45deg, #00b894, #00cec9)',
            'linear-gradient(45deg, #e17055, #81ecec)',
            'linear-gradient(45deg, #fab1a0, #00b894)',
            'linear-gradient(45deg, #55a3ff, #ff6b9d)',
            'linear-gradient(45deg, #ff9ff3, #f368e0)',
            'linear-gradient(45deg, #3742fa, #7bed9f)',
            'linear-gradient(45deg, #ff6348, #70a1ff)',
            'linear-gradient(45deg, #5f27cd, #00d2d3)',
            'linear-gradient(45deg, #ff9f43, #10ac84)',
            'linear-gradient(45deg, #ee5a52, #0abde3)',
            'linear-gradient(45deg, #c44569, #f8b500)',
            'linear-gradient(45deg, #40407a, #706fd3)',
            'linear-gradient(45deg, #33d9b2, #ff5252)',
            'linear-gradient(45deg, #218c74, #ff9f43)',
            'linear-gradient(45deg, #b33771, #3d5afe)',
            'linear-gradient(45deg, #ff3838, #00e676)',
            'linear-gradient(45deg, #8c7ae6, #00d4aa)'
        ];
        
        // Performance tracking
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fps = 60;
        
        this.init();
    }
    
    init() {
        this.setRandomBallColor();
        this.updatePosition();
        this.animate();
        this.setupEventListeners();
        this.updateInfo();
        setInterval(() => this.calculateFPS(), 1000);
    }
    
    animate() {
        if (!this.isAnimating) {
            requestAnimationFrame(() => this.animate());
            return;
        }
        
        this.updateBallPosition();
        this.checkBoundariesAndBounce();
        this.updatePosition();
        this.frameCount++;
        
        if (this.showTrail) {
            this.createTrail();
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    updateBallPosition() {
        this.x += this.dx;
        this.y += this.dy;
    }
    
    checkBoundariesAndBounce() {
        const containerRect = this.container.getBoundingClientRect();
        
        // Check horizontal boundaries
        if (this.x <= 0 || this.x >= containerRect.width - this.ballSize) {
            this.dx = -this.dx;
            this.bounce();
            this.x = Math.max(0, Math.min(this.x, containerRect.width - this.ballSize));
        }
        
        // Check vertical boundaries
        if (this.y <= 0 || this.y >= containerRect.height - this.ballSize) {
            this.dy = -this.dy;
            this.bounce();
            this.y = Math.max(0, Math.min(this.y, containerRect.height - this.ballSize));
        }
    }
    
    bounce() {
        this.bounceCount++;
        this.updateInfo();
        this.addImpactEffect();
        this.setRandomBallColor();
    }
    
    addImpactEffect() {
        this.ball.classList.add('impact');
        setTimeout(() => {
            this.ball.classList.remove('impact');
        }, 100);
    }
    
    setRandomBallColor() {
        const randomIndex = Math.floor(Math.random() * this.colors.length);
        this.ball.style.background = this.colors[randomIndex];
    }
    
    updatePosition() {
        this.ball.style.left = this.x + 'px';
        this.ball.style.top = this.y + 'px';
    }
    
    createTrail() {
        const trail = document.createElement('div');
        trail.className = 'color-trail';
        
        // Position trail at center of ball
        const trailSize = 40;
        const ballCenter = this.ballSize / 2;
        trail.style.left = (this.x + ballCenter - trailSize / 2) + 'px';
        trail.style.top = (this.y + ballCenter - trailSize / 2) + 'px';
        trail.style.background = this.ball.style.background || this.colors[0];
        
        this.container.appendChild(trail);
        
        // Remove trail after animation
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 1000);
    }
    
    toggleAnimation() {
        this.isAnimating = !this.isAnimating;
        this.updatePlayPauseButton();
    }
    
    updatePlayPauseButton() {
        const btn = document.getElementById('playPauseBtn');
        const icon = btn.querySelector('.material-icons');
        const text = document.getElementById('playPauseText');
        
        if (this.isAnimating) {
            icon.textContent = 'pause';
            text.textContent = 'Pause';
        } else {
            icon.textContent = 'play_arrow';
            text.textContent = 'Play';
        }
    }
    
    increaseSpeed() {
        this.speed = Math.min(this.speed + 1, 30);
        this.updateSpeed();
    }
    
    decreaseSpeed() {
        this.speed = Math.max(this.speed - 1, 1);
        this.updateSpeed();
    }
    
    updateSpeed() {
        const actualSpeed = this.speed * 3;
        this.dx = this.dx > 0 ? actualSpeed : -actualSpeed;
        this.dy = this.dy > 0 ? actualSpeed : -actualSpeed;
        this.updateInfo();
    }
    
    toggleTrail() {
        this.showTrail = !this.showTrail;
    }
    
    resetBounceCount() {
        this.bounceCount = 0;
        this.updateInfo();
    }
    
    updateInfo() {
        const speedDisplay = document.getElementById('speedDisplay');
        if (speedDisplay) {
            speedDisplay.textContent = this.speed;
        }
    }
    
    calculateFPS() {
        const currentTime = performance.now();
        this.fps = Math.round(this.frameCount * 1000 / (currentTime - this.lastTime));
        this.frameCount = 0;
        this.lastTime = currentTime;
    }
    
    handleWindowResize() {
        const containerRect = this.container.getBoundingClientRect();
        this.x = Math.min(this.x, containerRect.width - this.ballSize);
        this.y = Math.min(this.y, containerRect.height - this.ballSize);
        this.updatePosition();
    }
    
    handleKeyPress(key) {
        switch(key.toLowerCase()) {
            case ' ':
            case 'p':
                this.toggleAnimation();
                break;
            case 'arrowup':
            case '+':
                this.increaseSpeed();
                break;
            case 'arrowdown':
            case '-':
                this.decreaseSpeed();
                break;
            case 't':
                this.toggleTrail();
                break;
            case 'r':
                this.resetBounceCount();
                break;
        }
    }
    
    setupEventListeners() {
        // Window resize handler
        window.addEventListener('resize', () => this.handleWindowResize());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyPress(e.key));
    }
}


// Global functions for buttons
let screensaver;

function toggleAnimation() {
    screensaver.toggleAnimation();
}

function increaseSpeed() {
    screensaver.increaseSpeed();
}

function decreaseSpeed() {
    screensaver.decreaseSpeed();
}

function toggleTrail() {
    screensaver.toggleTrail();
}

// Initialize when page loads
window.addEventListener('load', () => {
    screensaver = new BouncingScreensaver();
});
