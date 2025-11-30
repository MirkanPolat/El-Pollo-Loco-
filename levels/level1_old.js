let level1;

const bottleMinX = 500;
const bottleMaxX = 11000;

function initLevel(){
    level1 = new Level(
        createEnemies(),
        createClouds(),
        createBackgrounds(),
        createBottles(),
        createCoins()
    );
}

function createEnemies() {
    const chickens = [];
    for (let i = 0; i < 50; i++) {
        chickens.push(new Chicken());
    }
    chickens.push(new Endboss());
    return chickens;
}

function createClouds() {
    return [
[
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
],
[
    new BackgroundObject("./img/5_background/layers/air.png", -719),
    new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("./img/5_background/layers/air.png", 0),
    new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 0),

    new BackgroundObject("./img/5_background/layers/air.png", 719),
    new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("./img/5_background/layers/air.png", 719*2),
    new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 719*2),
    new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 719*2),
    new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 719*2),

    new BackgroundObject("./img/5_background/layers/air.png", 719*3),
    new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 719*3),
    new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", 719*3),
    new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 719*3),

    new BackgroundObject("./img/5_background/layers/air.png", 719*4),
    new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 719*4),
    new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 719*4),
    new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 719*4),

    new BackgroundObject("./img/5_background/layers/air.png", 719*5),
    new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 719*5),
    new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", 719*5),
    new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 719*5),

    new BackgroundObject("./img/5_background/layers/air.png", 719*6),
    new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 719*6),
    new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 719*6),
    new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 719*6),

    new BackgroundObject("./img/5_background/layers/air.png", 719*7),
    new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 719*7),
    new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", 719*7),
    new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 719*7),

    new BackgroundObject("./img/5_background/layers/air.png", 719*8),
    new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 719*8),
    new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 719*8),
    new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 719*8),

    new BackgroundObject("./img/5_background/layers/air.png", 719*9),
    new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 719*9),
    new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", 719*9),
    new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 719*9),

    new BackgroundObject("./img/5_background/layers/air.png", 719*10),
    new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 719*10),
    new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 719*10),
    new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 719*10),

    new BackgroundObject("./img/5_background/layers/air.png", 719*11),
    new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 719*11),
    new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", 719*11),
    new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 719*11),

    new BackgroundObject("./img/5_background/layers/air.png", 719*12),
    new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 719*12),
    new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 719*12),
    new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 719*12),

    new BackgroundObject("./img/5_background/layers/air.png", 719*13),
    new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 719*13),
    new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", 719*13),
    new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 719*13),

    new BackgroundObject("./img/5_background/layers/air.png", 719*14),
    new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 719*14),
    new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 719*14),
    new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 719*14),

    new BackgroundObject("./img/5_background/layers/air.png", 719*15),
    new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 719*15),
    new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", 719*15),
    new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 719*15),

    new BackgroundObject("./img/5_background/layers/air.png", 719*16),
    new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 719*16),
    new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 719*16),
    new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 719*16),

    new BackgroundObject("./img/5_background/layers/air.png", 719*17),
    new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 719*17),
    new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", 719*17),
    new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 719*17),

    new BackgroundObject("./img/5_background/layers/air.png", 719*18),
    new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 719*18),
    new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 719*18),
    new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 719*18),
  ],
[
    new BottleObject(Math.random() * (bottleMaxX - bottleMinX) + bottleMinX, 360),
    new BottleObject(Math.random() * (bottleMaxX - bottleMinX) + bottleMinX, 360),
    new BottleObject(Math.random() * (bottleMaxX - bottleMinX) + bottleMinX, 360),
    new BottleObject(Math.random() * (bottleMaxX - bottleMinX) + bottleMinX, 360),
    new BottleObject(Math.random() * (bottleMaxX - bottleMinX) + bottleMinX, 360),
    new BottleObject(Math.random() * (bottleMaxX - bottleMinX) + bottleMinX, 360),
    new BottleObject(Math.random() * (bottleMaxX - bottleMinX) + bottleMinX, 360),
    new BottleObject(Math.random() * (bottleMaxX - bottleMinX) + bottleMinX, 360),
    new BottleObject(Math.random() * (bottleMaxX - bottleMinX) + bottleMinX, 360),
    new BottleObject(Math.random() * (bottleMaxX - bottleMinX) + bottleMinX, 360),
    new BottleObject(Math.random() * (bottleMaxX - bottleMinX) + bottleMinX, 360),
    new BottleObject(Math.random() * (bottleMaxX - bottleMinX) + bottleMinX, 360),
    new BottleObject(Math.random() * (bottleMaxX - bottleMinX) + bottleMinX, 360),
],
[
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
]
];
}
