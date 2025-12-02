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
  loadMuteSettings();
  loadMobileControlsSettings();
}

/**
 * Loads mute state from localStorage and updates UI
 */
function loadMuteSettings() {
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
}

/**
 * Loads mobile controls visibility from localStorage
 */
function loadMobileControlsSettings() {
  const mobileControls = document.getElementById('mobile-controls');
  const toggleButton = document.getElementById('mobile-toggle-button');
  const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  const mobileControlsVisible = localStorage.getItem('mobileControlsVisible');
  
  if (isTouchDevice) {
    setMobileControlsVisibility(mobileControls, toggleButton, mobileControlsVisible !== 'false');
  } else {
    setMobileControlsVisibility(mobileControls, toggleButton, mobileControlsVisible === 'true');
  }
}

/**
 * Sets mobile controls visibility
 * @param {HTMLElement} controls - Mobile controls element
 * @param {HTMLElement} button - Toggle button element
 * @param {boolean} visible - Whether controls should be visible
 */
function setMobileControlsVisibility(controls, button, visible) {
  if (visible) {
    controls.style.display = 'block';
    button.classList.add('active');
  } else {
    controls.style.display = 'none';
    button.classList.remove('active');
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
  hideAllScreens();
  initializeGame();
  startBackgroundMusic();
  hideLegalLinksOnMobile();
  autoFullscreenOnMobileLandscape();
}

/**
 * Hides all game screens
 */
function hideAllScreens() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("win-screen").style.display = "none";
}

/**
 * Initializes the game world and level
 */
function initializeGame() {
  gameEnded = false;
  initLevel();
  world = new World(canvas, keyboard);
  gameStarted = true;
}

/**
 * Starts background music if not muted
 */
function startBackgroundMusic() {
  if (!isMuted) {
    AudioHub.playBackgroundMusic();
  }
}

/**
 * Hides legal links on mobile devices during gameplay
 */
function hideLegalLinksOnMobile() {
  const isMobile = window.matchMedia("(max-width: 900px)").matches;
  if (isMobile) {
    document.getElementById("impressum-link").style.display = "none";
    document.getElementById("credits-link").style.display = "none";
  }
}

/**
 * Automatically triggers fullscreen on mobile landscape
 */
function autoFullscreenOnMobileLandscape() {
  const isMobileLandscape = window.matchMedia("(max-width: 900px) and (orientation: landscape)").matches;
  if (isMobileLandscape && !document.fullscreenElement) {
    setTimeout(() => {
      toggleFullscreen();
    }, 100);
  }
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
  resetScreens();
  resetKeyboard();
  resetGameState();
  clearGameWorld();
  showLegalLinksOnMobile();
  AudioHub.stopAll();
}

/**
 * Resets all game screens to start screen
 */
function resetScreens() {
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("win-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "flex";
}

/**
 * Resets all keyboard inputs to false
 */
function resetKeyboard() {
  keyboard.RIGHT = false;
  keyboard.LEFT = false;
  keyboard.UP = false;
  keyboard.DOWN = false;
  keyboard.SPACE = false;
  keyboard.D = false;
}

/**
 * Resets game state flags
 */
function resetGameState() {
  gameStarted = false;
  gameEnded = false;
}

/**
 * Clears the game world and canvas
 */
function clearGameWorld() {
  if (world) {
    world.isGameActive = false;
    world = null;
  }
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Shows legal links on mobile devices
 */
function showLegalLinksOnMobile() {
  const isMobile = window.matchMedia("(max-width: 900px)").matches;
  if (isMobile) {
    document.getElementById("impressum-link").style.display = "fixed";
    document.getElementById("credits-link").style.display = "fixed";
  }
}

/**
 * Plays the end game sequence
 * @param {string} result - 'game-over' or 'win'
 */
function playEndGameSequence(result) {
  setTimeout(() => {
    playEndGameSound(result);
    showEndGameScreen(result);
  }, 200);
}

/**
 * Plays the end game sound
 * @param {string} result - 'game-over' or 'win'
 */
function playEndGameSound(result) {
  if (!AudioHub.isMuted) {
    if (result === 'game-over') {
      AudioHub.playOne(AudioHub.GAME_LOSE_EFFECT);
      setTimeout(() => AudioHub.playOne(AudioHub.GAME_LOSE), 800);
    } else if (result === 'win') {
      AudioHub.playOne(AudioHub.GAME_WIN);
    }
  }
}

/**
 * Shows the end game screen
 * @param {string} result - 'game-over' or 'win'
 */
function showEndGameScreen(result) {
  setTimeout(() => {
    if (result === 'game-over') {
      document.getElementById('game-over-screen').style.display = 'flex';
    } else if (result === 'win') {
      document.getElementById('win-screen').style.display = 'flex';
    }
  }, 800);
}

/**
 * Cleans up character state
 * @param {Character} character - The character to clean up
 */
function cleanupCharacter(character) {
  if (character) {
    character.speedY = 0;
    character.cleanup();
  }
}

/**
 * Cleans up all enemies in the level
 * @param {Level} level - The level containing enemies
 */
function cleanupEnemies(level) {
  if (level && level.enemies) {
    level.enemies.forEach(enemy => {
      if (enemy.speed) enemy.speed = 0;
      if (enemy.cleanup && typeof enemy.cleanup === 'function') {
        enemy.cleanup();
      }
    });
  }
}

/**
 * Stops the game
 * @param {World} worldInstance - The world instance to stop
 */
function stopGame(worldInstance) {
  worldInstance.isGameActive = false;
  cleanupCharacter(worldInstance.character);
  cleanupEnemies(worldInstance.level);
  AudioHub.stopAll();
  clearInterval(worldInstance.gameInterval);
}

/**
 * Ends the game with the given result
 * @param {World} worldInstance - The world instance
 * @param {string} result - 'game-over' or 'win'
 */
function endGame(worldInstance, result) {
  gameEnded = true;
  setTimeout(() => {
    stopGame(worldInstance);
    playEndGameSequence(result);
  }, 800);
}

/**
 * Flips the image horizontally for rendering
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {MovableObject} movableObject - Object to flip
 */
function flipImage(ctx, movableObject) {
  ctx.save();
  ctx.translate(movableObject.width, 0);
  ctx.scale(-1, 1);
  movableObject.x = movableObject.x * -1;
}

/**
 * Flips the image back to original orientation
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {MovableObject} movableObject - Object to flip back
 */
function flipImageBack(ctx, movableObject) {
  ctx.restore();
  movableObject.x = movableObject.x * -1;
}

/**
 * Adds a movable object to the canvas map
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {MovableObject} movableObject - Object to add
 */
function addToMap(ctx, movableObject) {
  if (movableObject.otherDirection) {
    flipImage(ctx, movableObject);
  }
  movableObject.draw(ctx);
  movableObject.drawFrame(ctx);

  if (movableObject.otherDirection) {
    flipImageBack(ctx, movableObject);
  }
}

/**
 * Adds multiple objects to the canvas map
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Array} objects - Array of objects to add
 */
function addObjectsToMap(ctx, objects) {
  objects.forEach((object) => {
    addToMap(ctx, object);
  });
}