class Coin extends MovableObject {
  height = 80;
  width = 80;
  IMAGES_COIN = [
    "./img/8_coin/coin_1.png",
    "./img/8_coin/coin_2.png"
  ];

  constructor() {
    super().loadImage("./img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COIN);

    this.x = 250 + Math.random() * 2000;
    this.y = 300 + Math.random() * 200;

    this.animate();
  }

  animate() {
    setInterval(() => {
      // Einfache Animation zwischen den beiden Bildern
      this.PlayAnimation(this.IMAGES_COIN);
    }, 200);
  }
}
