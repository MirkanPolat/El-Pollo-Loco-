/**
 * Creates a new BackgroundObject.
 * @class
 */
class BackgroundObject extends MovableObject{

    width = 720;
    height = 480;
    /**
     * Function description
     */
    /**
     * Creates a new BackgroundObject instance
     * @param {*} imagePath - imagePath
     * @param {number} x - x
     * @param {number} y - y
     */
    constructor (imagePath, x, y){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
