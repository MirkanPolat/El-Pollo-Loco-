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
      // 🔵 Blauer Rahmen (zeigt Bildgröße)
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
  
      // 🔴 Roter Rahmen (zeigt echten Collision-Bereich)
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
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

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };
  

}
