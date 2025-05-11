class Character extends MovableObject {
  width = 130;
  height = 280;
  y = 80; // 155 ground
  coins = 0;
  maxCoins = 5;
  lastEnemyCollision = 0; // Neue Eigenschaft hinzufügen
  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];

  // Idle-Animation Bilder
  IMAGES_IDLE = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  // Schlaf-Animation Bilder
  IMAGES_SLEEPING = [
    "./img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  // Inaktivitäts-Timer
  lastActivity = new Date().getTime();
  SLEEP_TIMEOUT = 10000; // 15 Sekunden bis zur Schlaf-Animation

  IMAGES_JUMPING = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
    "./img/2_character_pepe/4_hurt/H-43.png",
  ];

  world;
  speed = 10;
  offset = {
    top: 120,
    bottom: 10,
    left: 20,
    right: 30,
  };

  constructor() {
    super().loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEPING);
    this.applyGravity();
    this.bottles = 0;
    this.maxBottles = 5;
    this.coins = 0;

    this.animate();
  }

  // Methode zum Zurücksetzen des Inaktivitätstimers
  resetIdleTimer() {
    this.lastActivity = new Date().getTime();
  }

  animate() {
    setInterval(() => {
      // Walking sound direkt hier einfügen
      const isWalking = (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround();
      AudioHub.playWalkingSound(AudioHub.CHARACTER_WALKING, isWalking);

      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        this.resetIdleTimer();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        this.resetIdleTimer();
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.resetIdleTimer();
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    // Animations-Steuerung
    setInterval(() => {
      if (this.isDead()) {
        this.PlayAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.PlayAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.PlayAnimation(this.IMAGES_JUMPING);
      } else {
        // Prüfe Bewegung und Inaktivität
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          // Lauf-Animation
          this.PlayAnimation(this.IMAGES_WALKING);
        } else {
          // Character steht still
          let timeSinceLastActivity = new Date().getTime() - this.lastActivity;

          if (timeSinceLastActivity > this.SLEEP_TIMEOUT) {
            // Nach 10 Sekunden Inaktivität: Schlaf-Animation
            this.PlayAnimation(this.IMAGES_SLEEPING);

            // Schlaf-Sound abspielen, wenn er nicht bereits läuft
            if (AudioHub.CHARACTER_SLEEPING.paused) {
              AudioHub.playOne(AudioHub.CHARACTER_SLEEPING);
            }
          } else {
            // Sofortige Idle-Animation, wenn keine Tasten gedrückt sind
            this.PlayAnimation(this.IMAGES_IDLE);

            // Schlaf-Sound stoppen, wenn der Character aufwacht
            AudioHub.stopOne(AudioHub.CHARACTER_SLEEPING);
          }
        }
      }
    }, 50);
  }

  collectBottle() {
    if (this.bottles < this.maxBottles) {
      this.bottles++;
      this.world.bottleStatusBar.setPercentage(this.bottles * 20);
    }
  }

  collectCoin() {
    if (this.coins < this.maxCoins) {
      this.coins++;
      this.world.coinStatusbar.setPercentage(this.coins * 20);
    }
  }
}
