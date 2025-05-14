class Chicken extends MovableObject {
  width = 80;
  height = 100;
  y = 330;
  damageTaken= 100;
  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = [
    "./img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];

  constructor() {
    super().loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 800 + Math.random() * 2000;
    this.speed = 0.15 + Math.random() * 0.3;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60);
    
    setInterval(() => {
      if (this.isDead()) {
      } else {
        this.PlayAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }

  die() {
    this.loadImage(this.IMAGES_DEAD[0]); 
    this.toDelete = true;
    setTimeout(() => {
      this.deleteNow = true;
    }, 500);
  }

  isDead() {
    return this.toDelete === true;
  }
}
