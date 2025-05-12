class BottleObject extends MovableObject {

  offset = {
    top: 10,
    bottom: 5,
    left: 10,
    right: 8
  };

    constructor(x, y) {
        super();
        const bottleImages = [
          './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
          './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
        ];
        const randomIndex = Math.floor(Math.random() * bottleImages.length);
        this.loadImage(bottleImages[randomIndex]);
      
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 40;
      }
  }