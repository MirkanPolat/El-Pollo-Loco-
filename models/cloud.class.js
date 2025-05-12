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
        if (this.x < -this.width) {
            this.x = 1500 + Math.random() * 500; 
        }
    }, 40);
}
}