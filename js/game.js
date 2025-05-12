let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let isMuted = false;

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
    
    // Level initialisieren
    initLevel();
    
    // Welt mit dem initialisierten Level erstellen
    world = new World(canvas, keyboard);
    
    if (!isMuted) {
        AudioHub.playBackgroundMusic();
    }
    
    console.log('Game started!', world.character);
    gameStarted = true;
}

window.addEventListener('keydown', (event) => {
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