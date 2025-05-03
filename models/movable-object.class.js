class MovableObject {
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  curretImage = 0;
  speed = 0.17;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.0;
  energy = 100;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 60);
  }

  isAboveGround() {
    return this.y < 150;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Chicken || this instanceof Character) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(MovableObject) {
    return (
      this.x + this.width > MovableObject.x &&
      this.y + this.height > MovableObject.y &&
      this.x < MovableObject.x &&
      this.y < MovableObject.y + MovableObject.height
    );
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image(); // create a empty image
      img.src = path; // set one image path
      this.imageCache[path] = img;
    });
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
    let i = this.curretImage % this.IMAGES_WALKING.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.curretImage++;
  }
}
