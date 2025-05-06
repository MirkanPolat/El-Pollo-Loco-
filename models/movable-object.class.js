class MovableObject extends DrawableObject {
  speed = 0.17;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.0;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;

        if (this instanceof ThrowableObject && this.y >= 340) {
          this.speed = 0;
          this.animateSplash();
          clearInterval(this.gravityInterval);
        }
      }
    }, 1000 / 60);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 150;
    }
  }
  isColliding(mo) {
    this.getCollisionFrame();
    mo.getCollisionFrame();
  
    return (
      this.rX + this.rW > mo.rX &&
      this.rY + this.rH > mo.rY &&
      this.rX < mo.rX + mo.rW &&
      this.rY < mo.rY + mo.rH
    );
  }
  

  getCollisionFrame() {
    this.rX = this.x + this.offset.left;
    this.rY = this.y + this.offset.top;
    this.rW = this.width - this.offset.left - this.offset.right;
    this.rH = this.height - this.offset.top - this.offset.bottom;
  }
  
  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  isDead() {
    return this.energy == 0;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 25;
  }

  PlayAnimation(images) {
    let i = this.curretImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.curretImage++;
  }

  animateRotation() {
    this.rotationInterval = setInterval(() => {
      this.PlayAnimation(this.bottleRotationImages);
    }, 100);
  }

  animateSplash() {
    this.speedY = 0;
    this.speed = 0;
    clearInterval(this.rotationInterval);
    this.playAnimation(this.bottleSplashImages);
    setTimeout(() => {
      // Optional: Objekt entfernen oder Splash abschließen
    }, 500);
  }
}
