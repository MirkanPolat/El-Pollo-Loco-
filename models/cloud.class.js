class Cloud extends MovableObject {
    height = 250;
    width = 500;
    y = 20;


    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 1500;
        this.speed = 0.2 + Math.random() * 0.5;
        this.animate();
    }
animate() {
    setInterval(() => {
        this.moveLeft();

        // Wenn Wolke komplett aus dem Bild verschwunden ist:
        if (this.x < -this.width) {
            this.x = 1500 + Math.random() * 500; // neu erscheinen rechts
        }
    }, 40); // 25 FPS (kannst auch 1000 / 60 nehmen)
}
}