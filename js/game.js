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

  /**
   * Function description
   */
  /**
   * if
   * @param {*} isMuted - isMuted
   */
  if (isMuted) {
    AudioHub.stopAll();
    document.getElementById("sound-icon").src = "./img/sound_imgs/mute.png";
  } else {
    /**
     * Function description
     */
    /**
     * if
     * @param {*} gameStarted - gameStarted
     */
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

  /**
   * Function description
   */
  /**
   * if
   * @param {*} !isMuted - !isMuted
   */
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
 * Toggles the state
 */
function toggleImpressum() {
  const overlay = document.getElementById("impressum-overlay");
  const currentDisplay = window.getComputedStyle(overlay).display;

  /**
   * Function description
   */
  /**
   * if
   * @param {*} currentDisplay - currentDisplay
   */
  if (currentDisplay === "none") {
    overlay.style.display = "flex";

    /**
     * Function description
     */
    /**
     * if
     * @param {*} world && gameStarted && !gameEnded - world && gameStarted && !gameEnded
     */
    if (world && gameStarted && !gameEnded) {
      world.isGameActive = false;
    }
  } else {
    overlay.style.display = "none";

    /**
     * Function description
     */
    /**
     * if
     * @param {*} world && gameStarted && !gameEnded - world && gameStarted && !gameEnded
     */
    if (world && gameStarted && !gameEnded) {
      world.isGameActive = true;
    }
  }
}

document.addEventListener("click", function (event) {
  const overlay = document.getElementById("impressum-overlay");
  const content = document.querySelector(".impressum-content");
  /**
   * Function description
   */
  /**
   * if
   * @param {*} event.target - event.target
   */
  if (event.target === overlay && overlay.style.display === "flex") {
    toggleImpressum();
  }
});

/**
 * Toggles the state
 */
function toggleCredits() {
  const overlay = document.getElementById("credits-overlay");
  const currentDisplay = window.getComputedStyle(overlay).display;

  /**
   * Function description
   */
  /**
   * if
   * @param {*} currentDisplay - currentDisplay
   */
  if (currentDisplay === "none") {
    overlay.style.display = "flex";

    /**
     * Function description
     */
    /**
     * if
     * @param {*} world && gameStarted && !gameEnded - world && gameStarted && !gameEnded
     */
    if (world && gameStarted && !gameEnded) {
      world.isGameActive = false;
    }
  } else {
    overlay.style.display = "none";

    /**
     * Function description
     */
    /**
     * if
     * @param {*} world && gameStarted && !gameEnded - world && gameStarted && !gameEnded
     */
    if (world && gameStarted && !gameEnded) {
      world.isGameActive = true;
    }
  }
}

document.addEventListener("click", function (event) {
  const overlay = document.getElementById("credits-overlay");
  /**
   * Function description
   */
  /**
   * if
   * @param {*} event.target - event.target
   */
  if (event.target === overlay && overlay.style.display === "flex") {
    toggleCredits();
  }
});

/**
 * Toggles the state
 */
function toggleControls() {
  const overlay = document.getElementById("controls-overlay");
  const currentDisplay = window.getComputedStyle(overlay).display;

  /**
   * Function description
   */
  /**
   * if
   * @param {*} currentDisplay - currentDisplay
   */
  if (currentDisplay === "none") {
    overlay.style.display = "flex";

    /**
     * Function description
     */
    /**
     * if
     * @param {*} world && gameStarted && !gameEnded - world && gameStarted && !gameEnded
     */
    if (world && gameStarted && !gameEnded) {
      world.isGameActive = false;
    }
  } else {
    overlay.style.display = "none";

    /**
     * Function description
     */
    /**
     * if
     * @param {*} world && gameStarted && !gameEnded - world && gameStarted && !gameEnded
     */
    if (world && gameStarted && !gameEnded) {
      world.isGameActive = true;
      world.draw();
    }
  }
}

document.addEventListener("click", function (event) {
  const overlay = document.getElementById("controls-overlay");
  /**
   * Function description
   */
  /**
   * if
   * @param {*} event.target - event.target
   */
  if (event.target === overlay && overlay.style.display === "flex") {
    toggleControls();
  }
});

/**
 * Toggles the state
 */
function toggleFullscreen() {
  const gameContainer = document.getElementById("game-container");
  const canvas = document.getElementById("canvas");
  const fullscreenIcon = document.getElementById("fullscreen-icon");

  /**
   * Function description
   */
  /**
   * if
   * @param {*} !document.fullscreenElement - !document.fullscreenElement
   */
  if (!document.fullscreenElement) {
    /**
     * Function description
     */
    /**
     * if
     * @param {*} gameContainer.requestFullscreen - gameContainer.requestFullscreen
     */
    if (gameContainer.requestFullscreen) {
      gameContainer.requestFullscreen();
    } else if (gameContainer.webkitRequestFullscreen) {
      gameContainer.webkitRequestFullscreen();
    } else if (gameContainer.msRequestFullscreen) {
      gameContainer.msRequestFullscreen();
    }

    gameContainer.classList.add("fullscreen-container");
    canvas.classList.add("fullscreen");
    document.body.classList.add("fullscreen");
    fullscreenIcon.src = "./img/fullscreen/exit_full.png";
  } else {
    /**
     * Function description
     */
    /**
     * if
     * @param {*} document.exitFullscreen - document.exitFullscreen
     */
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    gameContainer.classList.remove("fullscreen-container");
    canvas.classList.remove("fullscreen");
    document.body.classList.remove("fullscreen");
    fullscreenIcon.src = "./img/fullscreen/fullscreen.png";
  }
}

document.addEventListener("fullscreenchange", handleFullscreenChange);
document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
document.addEventListener("mozfullscreenchange", handleFullscreenChange);
document.addEventListener("MSFullscreenChange", handleFullscreenChange);

/**
 * Handles the event
 */
function handleFullscreenChange() {
  if (
    !document.fullscreenElement &&
    !document.webkitFullscreenElement &&
    !document.mozFullscreenElement &&
    !document.msFullscreenElement
  ) {
    exitFullscreenMode();
  }
}

/**
 * exitFullscreenMode
 */
function exitFullscreenMode() {
  const canvas = document.getElementById("canvas");
  const gameContainer = document.getElementById("game-container");
  const body = document.body;

  canvas.classList.remove("fullscreen");
  gameContainer.classList.remove("fullscreen-container");
  body.classList.remove("fullscreen");

  const fullscreenButton = document.getElementById("fullscreen-button");
  const fullscreenIcon = document.getElementById("fullscreen-icon");

  /**
   * Function description
   */
  /**
   * if
   * @param {*} fullscreenIcon - fullscreenIcon
   */
  if (fullscreenIcon) {
    fullscreenIcon.src = "./img/fullscreen/fullscreen.png";
  }
}

/**
 * Checks the condition
 */
function checkOrientation() {
  const orientationOverlay = document.getElementById('orientation-overlay');
  
  /**
   * Function description
   */
  /**
   * if
   * @param {*} window.innerHeight > window.innerWidth && window.innerWidth < - window.innerHeight > window.innerWidth && window.innerWidth <
   */
  if (window.innerHeight > window.innerWidth && window.innerWidth <= 768) {
    orientationOverlay.style.display = 'flex';
    /**
     * Function description
     */
    /**
     * if
     * @param {*} world && gameStarted - world && gameStarted
     */
    if (world && gameStarted) {
      world.isGameActive = false;
    }
  } else {
    orientationOverlay.style.display = 'none';
    /**
     * Function description
     */
    /**
     * if
     * @param {*} world && gameStarted && !gameEnded - world && gameStarted && !gameEnded
     */
    if (world && gameStarted && !gameEnded) {
      world.isGameActive = true;
    }
  }
}
window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

window.addEventListener("keydown", (event) => {
  if (gameEnded) return;

  /**
   * Function description
   */
  /**
   * if
   * @param {*} event.keyCode - event.keyCode
   */
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  /**
   * Function description
   */
  /**
   * if
   * @param {*} event.keyCode - event.keyCode
   */
  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }
  /**
   * Function description
   */
  /**
   * if
   * @param {*} event.keyCode - event.keyCode
   */
  if (event.keyCode == 38) {
    keyboard.UP = true;
  }
  /**
   * Function description
   */
  /**
   * if
   * @param {*} event.keyCode - event.keyCode
   */
  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }
  /**
   * Function description
   */
  /**
   * if
   * @param {*} event.keyCode - event.keyCode
   */
  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }
  /**
   * Function description
   */
  /**
   * if
   * @param {*} event.keyCode - event.keyCode
   */
  if (event.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (event) => {
  /**
   * Function description
   */
  /**
   * if
   * @param {*} gameEnded - gameEnded
   */
  if (gameEnded) {
    keyboard.RIGHT = false;
    keyboard.LEFT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.SPACE = false;
    keyboard.D = false;
    return;
  }

  /**
   * Function description
   */
  /**
   * if
   * @param {*} event.keyCode - event.keyCode
   */
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  /**
   * Function description
   */
  /**
   * if
   * @param {*} event.keyCode - event.keyCode
   */
  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }
  /**
   * Function description
   */
  /**
   * if
   * @param {*} event.keyCode - event.keyCode
   */
  if (event.keyCode == 38) {
    keyboard.UP = false;
  }
  /**
   * Function description
   */
  /**
   * if
   * @param {*} event.keyCode - event.keyCode
   */
  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }
  /**
   * Function description
   */
  /**
   * if
   * @param {*} event.keyCode - event.keyCode
   */
  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }
  /**
   * Function description
   */
  /**
   * if
   * @param {*} event.keyCode - event.keyCode
   */
  if (event.keyCode == 68) {
    keyboard.D = false;
  }
});

