let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let isMuted = false;
let gameEnded = false;

/**
 * Initializes the component
 */
function initStartScreen() {
  canvas = document.getElementById("canvas");
}

/**
 * Toggles the state
 */
function toggleSound() {
  isMuted = !isMuted;
  AudioHub.isMuted = isMuted;

  if (isMuted) {
    AudioHub.stopAll();
    document.getElementById("sound-icon").src = "./img/sound_imgs/mute.png";
  } else {
    if (gameStarted) {
      AudioHub.playBackgroundMusic();
    }
    document.getElementById("sound-icon").src = "./img/sound_imgs/unmute.png";
  }
}
     
/**
 * Starts the process
 */
function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("win-screen").style.display = "none";

  gameEnded = false;
  initLevel();
  world = new World(canvas, keyboard);

  if (!isMuted) {
    AudioHub.playBackgroundMusic();
  }

  gameStarted = true;
}

/**
 * restartGame
 */
function restartGame() {
  keyboard.RIGHT = false;
  keyboard.LEFT = false;
  keyboard.UP = false;
  keyboard.DOWN = false;
  keyboard.SPACE = false;
  keyboard.D = false;

  startGame();
}

/**
 * backToStartScreen
 */
function backToStartScreen() {
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("win-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "flex";

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