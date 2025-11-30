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
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ];
}

function createBackgrounds() {
    const backgrounds = [];
    for (let i = -1; i <= 18; i++) {
        const imageType = i % 2 === 0 ? '1' : '2';
        backgrounds.push(
            new BackgroundObject("./img/5_background/layers/air.png", 719 * i),
            new BackgroundObject(`./img/5_background/layers/3_third_layer/${imageType}.png`, 719 * i),
            new BackgroundObject(`./img/5_background/layers/2_second_layer/${imageType}.png`, 719 * i),
            new BackgroundObject(`./img/5_background/layers/1_first_layer/${imageType}.png`, 719 * i)
        );
    }
    return backgrounds;
}

function createBottles() {
    const bottles = [];
    for (let i = 0; i < 13; i++) {
        bottles.push(new BottleObject(Math.random() * (bottleMaxX - bottleMinX) + bottleMinX, 360));
    }
    return bottles;
}

function createCoins() {
    const coins = [];
    for (let i = 0; i < 9; i++) {
        coins.push(new Coin());
    }
    return coins;
}
