class DrawableObject {
  img;
  imageCache = {};
  curretImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;

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

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image(); // create a empty image
      img.src = path; // set one image path
      this.imageCache[path] = img;
    });
  }

}
