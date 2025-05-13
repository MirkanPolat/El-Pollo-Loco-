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