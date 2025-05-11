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
  isColliding(obj) {
    return (
      this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
      this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
      this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom &&
      this.y + this.height - this.offset.bottom > obj.y + obj.offset.top
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
      
      // Sound nur abspielen, wenn es der Character ist, der getroffen wird
      if (this instanceof Character) {
        AudioHub.playOne(AudioHub.CHARACTER_HURT);
      }
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
    AudioHub.playOne(AudioHub.CHARACTER_JUMP);
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
    this.PlayAnimation(this.bottleSplashImages);
    setTimeout(() => {
      // Optional: Objekt entfernen oder Splash abschließen
    }, 500);
  }
}
