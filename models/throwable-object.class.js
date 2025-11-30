/**
 * Creates a new ThrowableObject.
 * @class
 */
class ThrowableObject extends MovableObject {
  /**
   * Function description
   */
  /**
   * Creates a new ThrowableObject instance
   * @param {number} x - x
   * @param {number} y - y
   * @param {*} throwLeft - throwLeft
   * @param {boolean} isMoving - isMoving
   */
  constructor(x, y, throwLeft = false, isMoving = false) {
    super().loadImage(
      "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.initializeProperties(x, y, throwLeft, isMoving);
    this.initializeImages();
    this.throw();
  }

  /**
   * Function description
   */
  /**
   * Initializes the component
   * @param {number} x - x
   * @param {number} y - y
   * @param {*} throwLeft - throwLeft
   * @param {boolean} isMoving - isMoving
   */
  initializeProperties(x, y, throwLeft, isMoving) {
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 100;
    this.hasSplashed = false;
    this.hasCollided = false;
    this.throwLeft = throwLeft;
    let baseSpeed = isMoving ? 15 : 10;
    this.speedX = throwLeft ? -baseSpeed : baseSpeed;
    this.offset = {
      top: 30,
      bottom: 30,
      left: 30,
      right: 30
    };
  }

  /**
   * Function description
   */
  /**
   * Initializes the component
   */
  initializeImages() {
    this.bottleRotationImages = this.getRotationImages();
    this.bottleSplashImages = this.getSplashImages();
    this.loadImages(this.bottleRotationImages);
  }

  /**
   * Function description
   */
  /**
   * Gets the value
   * @returns {*}
   */
  getRotationImages() {
    return [
      "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
      "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
      "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
      "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
    ];
  }

  /**
   * Function description
   */
  /**
   * Gets the value
   * @returns {*}
   */
  getSplashImages() {
    return [
      "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
      "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
      "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
      "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
      "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
      "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"
    ];
  }

  /**
   * Function description
   */
  /**
   * Throws an object
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();
    this.throwInterval = setInterval(() => {
        this.x += this.speedX;

        /**
         * Function description
         */
        /**
         * if
         * @param {*} this.y > - this.y >
         */
        if (this.y >= 340) {  
            clearInterval(this.throwInterval);
            AudioHub.playOne(AudioHub.BOTTLE_SHATTER);
            this.animateSplash();
        }
    }, 26);
    this.animateRotation();
}
  /**
   * Function description
   */
  /**
   * Animates the object
   */
  animateSplash() {
    if (this.hasSplashed) return;
    this.hasSplashed = true;
    this.speed = 0;
    this.speedY = 0;
    clearInterval(this.rotationInterval);
    this.loadImages(this.bottleSplashImages);

    let splashIndex = 0;
    const splashAnim = setInterval(() => {
      /**
       * Function description
       */
      /**
       * if
       * @param {*} splashIndex < this.bottleSplashImages.length - splashIndex < this.bottleSplashImages.length
       */
      if (splashIndex < this.bottleSplashImages.length) {
        this.img = this.imageCache[this.bottleSplashImages[splashIndex]];
        splashIndex++;
      } else {
        clearInterval(splashAnim);
        this.y = 9999;
      }
    }, 100);
  }
}

