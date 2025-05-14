class DrawableObject {
  img;
  imageCache = {};
  curretImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;

  static debugMode = false; // Globale Einstellung für Debug-Anzeige

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch(e) {
    }
  }

  drawFrame(ctx) {
    if (!DrawableObject.debugMode) return; 
    
    if (this instanceof Chicken || this instanceof Character || this instanceof Coin || this instanceof BottleObject || this instanceof ThrowableObject || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
  
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
      let img = new Image(); 
      img.src = path;
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
