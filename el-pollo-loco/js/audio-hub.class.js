<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <link rel="shortcut icon" href="./img/favicon/favicon.png" type="image/x-icon">
    <title>El Pollo Loco</title>
    <script src="models/drawable-object.class.js"></script>
    <script src="models/movable-object.class.js"></script>
    <script src="js/audio-hub.class.js"></script>
    <script src="models/character.class.js"></script>
    <script src="models/chicken.class.js"></script>
    <script src="models/cloud.class.js"></script>
    <script src="models/status-bar.class.js"></script>
    <script src="models/world.class.js"></script>
    <script src="models/background.object.class.js"></script>
    <script src="models/keyboard.class.js"></script>
    <script src="models/level.class.js"></script>
    <script src="models/throwable-object.class.js"></script>
    <script src="models/endboss.class.js"></script>
    <script src="models/bottle-object.class.js"></script>
    <script src="models/bottle-status-bar.class.js"></script>
    <script src="models/coin.class.js"></script>
    <script src="models/coin-status-bar.class.js"></script>
    <script src="models/boss-status-bar.class.js"></script>
    <script src="levels/level1.js"></script>
    <script src="js/game.js"></script>
</head>
<body>
    <h1>El Pollo Loco</h1>
    
    <canvas id="canvas" width="720px" height="480px"></canvas>

    <!-- Start Screen Overlay -->
    <div id="start-screen" class="overlay">
        <img src="./img/start-screen-image.png" alt="Start Screen" class="start-image" />
        <button id="start-button">Start Game</button>
    </div>

    <script>
        // Hide the canvas initially
        document.getElementById('canvas').style.display = 'none';

        // Start game function
        function startGame() {
            document.getElementById('start-screen').style.display = 'none'; // Hide start screen
            document.getElementById('canvas').style.display = 'block'; // Show canvas
            init(); // Call the init function to start the game
        }

        // Add event listener to the start button
        document.getElementById('start-button').addEventListener('click', startGame);
    </script>
</body>
</html>