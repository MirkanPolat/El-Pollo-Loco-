let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let isMuted = false;
let gameEnded = false;

function initStartScreen() {
    canvas = document.getElementById("canvas");
}

function toggleSound() {
    isMuted = !isMuted;
    AudioHub.isMuted = isMuted;
    
    if (isMuted) {
        AudioHub.stopAll();
        document.getElementById('sound-icon').src = './img/sound_imgs/mute.png';
    } else {
        if (gameStarted) {
            AudioHub.playBackgroundMusic();
        }
        document.getElementById('sound-icon').src = './img/sound_imgs/unmute.png';
    }
}

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('win-screen').style.display = 'none';
    
    gameEnded = false;
    initLevel();
    world = new World(canvas, keyboard);
    
    if (!isMuted) {
        AudioHub.playBackgroundMusic();
    }
    
    console.log('Game started!', world.character);
    gameStarted = true;
}

function restartGame() {
    keyboard.RIGHT = false;
    keyboard.LEFT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.SPACE = false;
    keyboard.D = false;
    
    startGame();
}

function backToStartScreen() {
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('win-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'flex';
    
    keyboard.RIGHT = false;
    keyboard.LEFT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.SPACE = false;
    keyboard.D = false;
    
    gameStarted = false;
    gameEnded = false;
    
    AudioHub.stopAll();
}

// Impressum Toggle Function
function toggleImpressum() {
    const overlay = document.getElementById('impressum-overlay');
    const currentDisplay = window.getComputedStyle(overlay).display;
    
    if (currentDisplay === 'none') {
        // Öffne das Impressum
        overlay.style.display = 'flex';
        
        // Optional: Pausiere das Spiel
        if (world && gameStarted && !gameEnded) {
            world.isGameActive = false;
        }
    } else {
        // Schließe das Impressum
        overlay.style.display = 'none';
        
        // Optional: Setze das Spiel fort
        if (world && gameStarted && !gameEnded) {
            world.isGameActive = true;
        }
    }
}

// Schließe das Impressum auch beim Klick außerhalb
document.addEventListener('click', function(event) {
    const overlay = document.getElementById('impressum-overlay');
    const content = document.querySelector('.impressum-content');
    if (event.target === overlay && overlay.style.display === 'flex') {
        toggleImpressum();
    }
});

function toggleFullscreen() {
    const gameContainer = document.getElementById('game-container');
    const fullscreenIcon = document.getElementById('fullscreen-icon');
    
    if (!document.fullscreenEnabled && 
        !document.webkitFullscreenEnabled && 
        !document.mozFullScreenEnabled && 
        !document.msFullscreenEnabled) {
        console.log('Fullscreen nicht unterstützt');
        return;
    }
    
    const isFullScreen = document.fullscreenElement || 
                         document.webkitFullscreenElement || 
                         document.mozFullScreenElement || 
                         document.msFullscreenElement;
    
    if (!isFullScreen) {
        if (gameContainer.requestFullscreen) {
            gameContainer.requestFullscreen();
        } else if (gameContainer.webkitRequestFullscreen) {
            gameContainer.webkitRequestFullscreen();
        } else if (gameContainer.msRequestFullscreen) {
            gameContainer.msRequestFullscreen();
        } else if (gameContainer.mozRequestFullScreen) {
            gameContainer.mozRequestFullScreen();
        }
        
        gameContainer.classList.add('fullscreen-container');
        fullscreenIcon.src = './img/fullscreen/exit_fullscreen_icon_transparent.png';
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        
        gameContainer.classList.remove('fullscreen-container');
        fullscreenIcon.src = './img/fullscreen/fullscreen_icon_transparent.png';
    }
}

document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

function handleFullscreenChange() {
    const gameContainer = document.getElementById('game-container');
    const fullscreenIcon = document.getElementById('fullscreen-icon');
    const isFullScreen = document.fullscreenElement || 
                         document.webkitFullscreenElement || 
                         document.mozFullScreenElement || 
                         document.msFullscreenElement;
    
    if (!isFullScreen) {
        gameContainer.classList.remove('fullscreen-container');
        fullscreenIcon.src = './img/fullscreen/fullscreen_icon_transparent.png';
    }
}

window.addEventListener('keydown', (event) => {
    if (gameEnded) return; 

    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (gameEnded) {
        keyboard.RIGHT = false;
        keyboard.LEFT = false;
        keyboard.UP = false;
        keyboard.DOWN = false;
        keyboard.SPACE = false;
        keyboard.D = false;
        return;
    }
    
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});