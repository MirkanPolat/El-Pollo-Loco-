/**
 * Creates a new ChickenSmall.
 * @class
 */
class ChickenSmall extends MovableObject {
  width = 60;
  height = 60;
  y = 360;
  damageTaken= 100;
  offset = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5
  };
  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = [
    "./img/3_enemies_chicken/chicken_small/2_dead/dead.png",
  ];

  /**
   * Creates a new ChickenSmall instance
   */
  constructor() {
    super().loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 800 + Math.random() * 5700;
    this.speed = 0.5 + Math.random() * 0.6;
    this.movementInterval = null;
    this.animationInterval = null;
    this.animate();
  }

  /**
   * Animates the object
   */
  animate() {
    this.movementInterval = setInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60);
    
    this.animationInterval = setInterval(() => {
      if (this.isDead()) {
      } else {
        this.PlayAnimation(this.IMAGES_WALKING);
      }
    }, 150);
  }

  /**
   * die
   */
  die() {
    this.loadImage(this.IMAGES_DEAD[0]); 
    this.toDelete = true;
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
    setTimeout(() => {
      this.deleteNow = true;
    }, 500);
  }

  /**
   * Checks if condition is true
   * @returns {boolean}
   */
  isDead() {
    return this.toDelete === true;
  }
}
