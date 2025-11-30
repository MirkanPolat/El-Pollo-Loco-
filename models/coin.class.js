/**
 * Creates a new Coin.
 * @class
 */
class Coin extends MovableObject {
  height = 120;
  width = 120;

  offset = {
    top: 40,
    left: 40,
    right: 40,
    bottom: 40
  };

  IMAGES_COIN = [
    "./img/8_coin/coin_1.png",
    "./img/8_coin/coin_2.png"
  ];

  /**
   * Function description
   */
  /**
   * Creates a new Coin instance
   */
  constructor() {
    super().loadImage("./img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COIN);

    this.x = 250 + Math.random() * 11500;
    this.y = 80 + Math.random() * 120; 

    this.animate();
  }

  /**
   * Function description
   */
  /**
   * Animates the object
   */
  animate() {
    setInterval(() => {
      this.PlayAnimation(this.IMAGES_COIN);
    }, 200);
  }
}

