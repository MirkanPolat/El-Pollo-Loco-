/**
 * Creates a new BottleObject.
 * @class
 */
class BottleObject extends MovableObject {

  offset = {
    top: 10,
    bottom: 5,
    left: 10,
    right: 8
  };

    /**
     * Function description
     */
    /**
     * Creates a new BottleObject instance
     * @param {number} x - x
     * @param {number} y - y
     */
    constructor(x, y) {
        super();
        const bottleImages = [
          './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
          './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
        ];
        const randomIndex = Math.floor(Math.random() * bottleImages.length);
        this.loadImage(bottleImages[randomIndex]);
      
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 40;
      }
  }
