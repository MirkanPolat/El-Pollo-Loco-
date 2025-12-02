/**
 * Toggles the impressum overlay visibility
 */
function toggleImpressum() {
  const overlay = document.getElementById("impressum-overlay");
  const currentDisplay = window.getComputedStyle(overlay).display;
  if (currentDisplay === "none") {
    overlay.style.display = "flex";
    if (world && gameStarted && !gameEnded) {
      world.isGameActive = false;
    }
  } else {
    overlay.style.display = "none";
    if (world && gameStarted && !gameEnded) {
      world.isGameActive = true;
      requestAnimationFrame(() => world.draw());
    }
  }
}

document.addEventListener("click", function (event) {
  const overlay = document.getElementById("impressum-overlay");
  if (event.target === overlay && overlay.style.display === "flex") {
    toggleImpressum();
  }
});

/**
 * Toggles the credits overlay visibility
 */
function toggleCredits() {
  const overlay = document.getElementById("credits-overlay");
  const currentDisplay = window.getComputedStyle(overlay).display;
  if (currentDisplay === "none") {
    overlay.style.display = "flex";
    if (world && gameStarted && !gameEnded) {
      world.isGameActive = false;
    }
  } else {
    overlay.style.display = "none";
    if (world && gameStarted && !gameEnded) {
      world.isGameActive = true;
      requestAnimationFrame(() => world.draw());
    }
  }
}

document.addEventListener("click", function (event) {
  const overlay = document.getElementById("credits-overlay");
  if (event.target === overlay && overlay.style.display === "flex") {
    toggleCredits();
  }
});

/**
 * Toggles the controls overlay visibility
 */
function toggleControls() {
  const overlay = document.getElementById("controls-overlay");
  const currentDisplay = window.getComputedStyle(overlay).display;
  if (currentDisplay === "none") {
    overlay.style.display = "flex";
    if (world && gameStarted && !gameEnded) {
      world.isGameActive = false;
    }
  } else {
    overlay.style.display = "none";
    if (world && gameStarted && !gameEnded) {
      world.isGameActive = true;
      world.draw();
    }
  }
}

document.addEventListener("click", function (event) {
  const overlay = document.getElementById("controls-overlay");
  if (event.target === overlay && overlay.style.display === "flex") {
    toggleControls();
  }
});

/**
 * Toggles fullscreen mode
 */
function toggleFullscreen() {
  const gameContainer = document.getElementById("game-container");
  const canvas = document.getElementById("canvas");
  const fullscreenIcon = document.getElementById("fullscreen-icon");
  if (!document.fullscreenElement) {
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
 * Handles fullscreen state changes
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
 * Exits fullscreen mode and resets UI
 */
function exitFullscreenMode() {
  const canvas = document.getElementById("canvas");
  const gameContainer = document.getElementById("game-container");
  const body = document.body;
  canvas.classList.remove("fullscreen");
  gameContainer.classList.remove("fullscreen-container");
  body.classList.remove("fullscreen");
  const fullscreenIcon = document.getElementById("fullscreen-icon");
  if (fullscreenIcon) {
    fullscreenIcon.src = "./img/fullscreen/fullscreen.png";
  }
}

/**
 * Checks device orientation and shows warning if needed
 */
function checkOrientation() {
  const orientationOverlay = document.getElementById('orientation-overlay');
  if (window.innerHeight > window.innerWidth && window.innerWidth <= 768) {
    orientationOverlay.style.display = 'flex';
    if (world && gameStarted) {
      world.isGameActive = false;
    }
  } else {
    orientationOverlay.style.display = 'none';
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

window.addEventListener("keyup", (event) => {
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
