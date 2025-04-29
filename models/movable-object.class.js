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

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) { 
    arr.forEach((path) => {
      let img = new Image(); // create a empty image 
      img.src = path; // set one image path
      this.imageCache[path] = img;
    });
  }

  moveRight() {
    console.log("Moving right");
  }
 
  moveLeft(){
    setInterval(() => {
        this.x -= this.speed;
    }, 1000 / 60);
}
}
