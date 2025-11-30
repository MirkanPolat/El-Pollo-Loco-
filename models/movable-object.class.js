/**
 * Creates a new MovableObject.
 * @class
 */
class MovableObject extends DrawableObject {
  speed = 0.17;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.0;
  energy = 100;
  lastHit = 0;

  /**
   * Function description
   */
  /**
   * Applies the changes
   */
  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.updateGravity();
        this.handleCharacterLanding();
        this.handleBottleLanding();
      }
    }, 1000 / 60);
  }

  /**
   * Function description
   */
  /**
   * Updates the state
   */
  updateGravity() {
    this.y -= this.speedY;
    this.speedY -= this.acceleration;
  }

  /**
   * Function description
   */
  /**
   * Handles the event
   */
  handleCharacterLanding() {
    if (this instanceof Character && !this.isAboveGround() && this.y > 150) {
      this.y = 150; 
      this.speedY = 0;
    }
  }

  /**
   * Function description
   */
  /**
   * Handles the event
   */
  handleBottleLanding() {
    /**
     * Function description
     */
    /**
     * if
     * @param {*} this instanceof ThrowableObject && this.y > - this instanceof ThrowableObject && this.y >
     */
    if (this instanceof ThrowableObject && this.y >= 340) {
      this.speed = 0;
      this.animateSplash();
      clearInterval(this.gravityInterval);
    }
  }

  /**
   * Function description
   */
  /**
   * Checks if condition is true
   * @returns {boolean}
   */
  isAboveGround() {
    /**
     * Function description
     */
    /**
     * if
     * @param {*} this instanceof ThrowableObject - this instanceof ThrowableObject
     */
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 150;
    }
  }
  /**
   * Function description
   */
  /**
   * Checks if condition is true
   * @param {*} obj - obj
   * @returns {boolean}
   */
  isColliding(obj) {
    return (
      this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
      this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
      this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom &&
      this.y + this.height - this.offset.bottom > obj.y + obj.offset.top
    );
  }
  

  /**
   * Function description
   */
  /**
   * Gets the value
   * @returns {*}
   */
  getCollisionFrame() {
    this.rX = this.x + this.offset.left;
    this.rY = this.y + this.offset.top;
    this.rW = this.width - this.offset.left - this.offset.right;
    this.rH = this.height - this.offset.top - this.offset.bottom;
  }
  
  /**
   * Function description
   */
  /**
   * Handles hit/damage
   */
  hit() {
    this.energy -= 20;
    /**
     * Function description
     */
    /**
     * if
     * @param {*} this.energy < 0 - this.energy < 0
     */
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    
      /**
       * Function description
       */
      /**
       * if
       * @param {*} this instanceof Character - this instanceof Character
       */
      if (this instanceof Character) {
        AudioHub.playOne(AudioHub.CHARACTER_HURT);
      }
    }
  }

  /**
   * Function description
   */
  /**
   * Checks if condition is true
   * @returns {boolean}
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  /**
   * Function description
   */
  /**
   * Checks if condition is true
   * @returns {boolean}
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Function description
   */
  /**
   * Moves the object
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Function description
   */
  /**
   * Moves the object
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Function description
   */
  /**
   * Makes the character jump
   */
  jump() {
    this.speedY = 25;
    AudioHub.playOne(AudioHub.CHARACTER_JUMP);
  }

  /**
   * Function description
   */
  /**
   * Plays the sound/animation
   * @param {Array<string>} images - images
   */
  PlayAnimation(images) {
    let i = this.curretImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.curretImage++;
  }

  /**
   * Function description
   */
  /**
   * Animates the object
   */
  animateRotation() {
    this.rotationInterval = setInterval(() => {
      this.PlayAnimation(this.bottleRotationImages);
    }, 100);
  }

  /**
   * Function description
   */
  /**
   * Animates the object
   */
  animateSplash() {
    this.speedY = 0;
    this.speed = 0;
    clearInterval(this.rotationInterval);
    this.PlayAnimation(this.bottleSplashImages);
    setTimeout(() => {
    }, 500);
  }
}

