class Endboss extends MovableObject {

    width = 300;    
    height = 400;
    y = 50;
    
    // Präzisere Kollisionsbox für den Endboss
    offset = {
        top: 80,     // Verkleinert Kollisionsbereich oben (Kamm/Kopfbereich)
        bottom: 60,  // Verkleinert Kollisionsbereich unten (Füße/Schatten)
        left: 30,    // Verkleinert Kollisionsbereich links
        right: 50    // Verkleinert Kollisionsbereich rechts
    };

    IMAGES_WALKING = [
        "./img/4_enemie_boss_chicken/2_alert/G5.png",
        "./img/4_enemie_boss_chicken/2_alert/G6.png",
        "./img/4_enemie_boss_chicken/2_alert/G7.png",
        "./img/4_enemie_boss_chicken/2_alert/G8.png",
        "./img/4_enemie_boss_chicken/2_alert/G9.png",
        "./img/4_enemie_boss_chicken/2_alert/G10.png",
        "./img/4_enemie_boss_chicken/2_alert/G11.png",
        "./img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    constructor() {
        super().loadImage("./img/4_enemie_boss_chicken/2_alert/G5.png");
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.PlayAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}
