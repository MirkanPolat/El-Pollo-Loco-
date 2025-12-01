let level1;

const bottleMinX = 500;
const bottleMaxX = 6500;

/**
 * Initializes the component
 */
function initLevel(){
    level1 = new Level(
        createEnemies(),
        createClouds(),
        createBackgrounds(),
        createBottles(),
        createCoins()
    );
}

/**
 * Creates a new instance
 * @returns {Object}
 */
function createEnemies() {
    const chickens = [];
    /**
     * Function description
     */
    /**
     * for
     * @param {*} let i - let i
     */
    for (let i = 0; i < 25; i++) {
        chickens.push(new Chicken());
    }
    chickens.push(new Endboss());
    return chickens;
}

/**
 * Creates a new instance
 * @returns {Object}
 */
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

/**
 * Creates a new instance
 * @returns {Object}
 */
function createBackgrounds() {
    const backgrounds = [];
    /**
     * Function description
     */
    /**
     * for
     * @param {*} let i - let i
     */
    for (let i = -1; i <= 10; i++) {
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

/**
 * Creates a new instance
 * @returns {Object}
 */
function createBottles() {
    const bottles = [];
    /**
     * Function description
     */
    /**
     * for
     * @param {*} let i - let i
     */
    for (let i = 0; i < 13; i++) {
        bottles.push(new BottleObject(Math.random() * (bottleMaxX - bottleMinX) + bottleMinX, 360));
    }
    return bottles;
}

/**
 * Creates a new instance
 * @returns {Object}
 */
function createCoins() {
    const coins = [];
    /**
     * Function description
     */
    /**
     * for
     * @param {*} let i - let i
     */
    for (let i = 0; i < 9; i++) {
        coins.push(new Coin());
    }
    return coins;
}

