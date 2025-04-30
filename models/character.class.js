class Character extends MovableObject {
  width = 130;
  height = 280;
  y = 80; // 155 ground
  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];
  world;

  speed = 10;

  constructor() {
    super().loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.applyGravity();

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x + 100; // Adjust the camera position based on character's x position
    }, 1000 / 60); // Adjust the interval time as needed

    setInterval(() => {
      if (
        (this.world && this.world.keyboard.RIGHT) || this.world.keyboard.LEFT) {


        this.PlayAnimation(this.IMAGES_WALKING);
      }
    }, 50);
  }

  jump() {}
}
