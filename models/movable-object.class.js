class MovableObject {
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  curretImage = 0;

  loadImage(path) {
    // Load a single image
    this.img = new Image();
    this.img.src = path;
  }
  loadImages(arr) {
    // Load multiple images
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight() {
    console.log("Moving right");
  }
  moveLeft() {}
}
