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
  loadSoundSettings();
}

/**
 * Loads sound settings from localStorage
 */
function loadSoundSettings() {
  const savedMuteState = localStorage.getItem('isMuted');
  if (savedMuteState === 'true') {
    isMuted = true;
    AudioHub.isMuted = true;
    document.getElementById("sound-icon").src = "./img/sound_imgs/mute.png";
  } else {
    isMuted = false;
    AudioHub.isMuted = false;
    document.getElementById("sound-icon").src = "./img/sound_imgs/unmute.png";
  }
  
  // Load mobile controls visibility
  const mobileControls = document.getElementById('mobile-controls');
  const toggleButton = document.getElementById('mobile-toggle-button');
  const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  const mobileControlsVisible = localStorage.getItem('mobileControlsVisible');
  
  // On touch devices, show controls by default unless explicitly hidden
  if (isTouchDevice) {
    if (mobileControlsVisible === 'false') {
      mobileControls.style.display = 'none';
      toggleButton.classList.remove('active');
    } else {
      mobileControls.style.display = 'block';
      toggleButton.classList.add('active');
    }
  } else {
    // On desktop, respect saved preference
    if (mobileControlsVisible === 'true') {
      mobileControls.style.display = 'block';
      toggleButton.classList.add('active');
    } else {
      mobileControls.style.display = 'none';
      toggleButton.classList.remove('active');
    }
  }
}

/**
 * Toggles mobile controls visibility
 */
function toggleMobileControls() {
  const mobileControls = document.getElementById('mobile-controls');
  const toggleButton = document.getElementById('mobile-toggle-button');
  
  if (mobileControls.style.display === 'none' || mobileControls.style.display === '') {
    mobileControls.style.display = 'block';
    toggleButton.classList.add('active');
    localStorage.setItem('mobileControlsVisible', 'true');
  } else {
    mobileControls.style.display = 'none';
    toggleButton.classList.remove('active');
    localStorage.setItem('mobileControlsVisible', 'false');
  }
}

/**
 * Toggles the state
 */
function toggleSound() {
  isMuted = !isMuted;
  AudioHub.isMuted = isMuted;
  localStorage.setItem('isMuted', isMuted);

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

/**
 * Toggles mobile controls visibility
 */
function toggleMobileControls() {
  const mobileControls = document.getElementById('mobile-controls');
  const toggleButton = document.getElementById('mobile-toggle-button');
  
  if (mobileControls.style.display === 'none' || mobileControls.style.display === '') {
    mobileControls.style.display = 'block';
    toggleButton.classList.add('active');
    localStorage.setItem('mobileControlsVisible', 'true');
  } else {
    mobileControls.style.display = 'none';
    toggleButton.classList.remove('active');
    localStorage.setItem('mobileControlsVisible', 'false');
  }
}