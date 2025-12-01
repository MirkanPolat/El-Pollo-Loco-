/**
 * Creates a new Level.
 * @class
 */
class Level{
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 7000;

    /**
     * Function description
     */
    /**
     * Creates a new Level instance
     * @param {*} enemies - enemies
     * @param {*} clouds - clouds
     * @param {*} backgroundObjects - backgroundObjects
     * @param {*} bottles - bottles
     * @param {*} coins - coins
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}
