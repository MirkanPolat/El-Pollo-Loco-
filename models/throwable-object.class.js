class ThrowableObject extends MovableObject {
  constructor(x, y) {
    super().loadImage(
      "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 100;
    this.hasSplashed = false;
    
    // Präzisere Kollisionsbox für die geworfene Flasche
    this.offset = {
      top: 30,    // Verkleinert den Kollisionsbereich oben
      bottom: 30, // Verkleinert den Kollisionsbereich unten
      left: 30,   // Verkleinert den Kollisionsbereich links
      right: 30   // Verkleinert den Kollisionsbereich rechts
    };
    
    this.bottleRotationImages = [
      "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
      "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
      "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
      "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    this.bottleSplashImages = [
      "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
      "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
      "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
      "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
      "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
      "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    this.loadImages(this.bottleRotationImages);
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    this.throwInterval = setInterval(() => {
        this.x += 10;

        if (this.y >= 340) {  // Wenn Flasche Boden berührt
            clearInterval(this.throwInterval);
            this.animateSplash();
        }
    }, 26);
    this.animateRotation();
}
  animateSplash() {
    if (this.hasSplashed) return;
    this.hasSplashed = true;
    this.speed = 0;
    this.speedY = 0;
    clearInterval(this.rotationInterval);
    this.loadImages(this.bottleSplashImages);

    let splashIndex = 0;
    const splashAnim = setInterval(() => {
      if (splashIndex < this.bottleSplashImages.length) {
        this.img = this.imageCache[this.bottleSplashImages[splashIndex]];
        splashIndex++;
      } else {
        clearInterval(splashAnim);
        this.y = 9999; // Objekt verschwindet nach Splash
      }
    }, 100);
  }
}
