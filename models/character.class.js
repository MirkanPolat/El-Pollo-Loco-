class Character extends MovableObject {

    width = 130;
    height = 280;
    y = 155;

    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png',
    ];

    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    animate(){

        setInterval(() => {
        let i = this.curretImage % this.IMAGES_WALKING.length; // get the current image index
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path]; // set the current image
        this.curretImage++;
    }, 100);
    }
    jump(){
    }
    
}