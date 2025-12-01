/**
 * Creates a new Chicken.
 * @class
 */
class Chicken extends MovableObject {
  width = 80;
  height = 100;
  y = 330;
  damageTaken= 100;
  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = [
    "./img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];

  /**
   * Function description
   */
  /**
   * Creates a new Chicken instance
   */
  constructor() {
    super().loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 800 + Math.random() * 5700;
    this.speed = 0.5 + Math.random() * 0.6;
    this.movementInterval = null;
    this.animationInterval = null;
    this.animate();
  }

  /**
   * Function description
   */
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
    }, 200);
  }

  /**
   * Function description
   */
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
   * Function description
   */
  /**
   * Checks if condition is true
   * @returns {boolean}
   */
  isDead() {
    return this.toDelete === true;
  }
}

