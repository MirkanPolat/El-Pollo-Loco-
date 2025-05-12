let canvas;
let world;
let keyboard = new Keyboard();
let startScreenVisible = true;

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    AudioHub.playBackgroundMusic();
    
    console.log('MyCharacter', world.character);
    drawStartScreen(); // Draw the start screen
}

function drawStartScreen() {
    const ctx = canvas.getContext("2d");
    const startScreenImage = new Image();
    startScreenImage.src = './img/start-screen.png'; // Path to your start screen image

    startScreenImage.onload = () => {
        ctx.drawImage(startScreenImage, 0, 0, canvas.width, canvas.height);
        drawStartButton(ctx);
    };
}

function drawStartButton(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width / 2 - 75, canvas.height / 2 + 100, 150, 50); // Button rectangle
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Start Game", canvas.width / 2 - 50, canvas.height / 2 + 130); // Button text

    // Add event listener for click
    canvas.addEventListener('click', startGame);
}

function startGame(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if the click is within the button area
    if (x >= canvas.width / 2 - 75 && x <= canvas.width / 2 + 75 &&
        y >= canvas.height / 2 + 100 && y <= canvas.height / 2 + 150) {
        startScreenVisible = false;
        canvas.removeEventListener('click', startGame); // Remove the event listener
        world.run(); // Start the game loop
        draw(); // Start drawing the game
    }
}

function draw() {
    if (startScreenVisible) {
        drawStartScreen();
    } else {
        world.draw(); // Call the draw method of the world to render the game
    }
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