class BottleObject extends MovableObject {
    constructor(x, y) {
        super();
      
        // Zufälliges Bottle-Bild auswählen
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