class Endboss extends MovableObject {
    width = 300;    
    height = 400;
    y = 50;
    maxEnergy = 100;
    energy = 100;
    hadFirstContact = false;
    speed = 10;
    isAttacking = false;
    lastAction = new Date().getTime(); // Wichtig: Initialisierung von lastAction
    
    offset = {
        top: 80,
        bottom: 60, 
        left: 30,
        right: 50
    };

    // Alert-Animation (wenn der Boss den Spieler bemerkt)
    IMAGES_ALERT = [
        "./img/4_enemie_boss_chicken/2_alert/G5.png",
        "./img/4_enemie_boss_chicken/2_alert/G6.png",
        "./img/4_enemie_boss_chicken/2_alert/G7.png",
        "./img/4_enemie_boss_chicken/2_alert/G8.png",
        "./img/4_enemie_boss_chicken/2_alert/G9.png",
        "./img/4_enemie_boss_chicken/2_alert/G10.png",
        "./img/4_enemie_boss_chicken/2_alert/G11.png",
        "./img/4_enemie_boss_chicken/2_alert/G12.png"
    ];

    // Lauf-Animation
    IMAGES_WALKING = [
        "./img/4_enemie_boss_chicken/1_walk/G1.png",
        "./img/4_enemie_boss_chicken/1_walk/G2.png",
        "./img/4_enemie_boss_chicken/1_walk/G3.png",
        "./img/4_enemie_boss_chicken/1_walk/G4.png"
    ];

    // Angriff-Animation
    IMAGES_ATTACK = [
        "./img/4_enemie_boss_chicken/3_attack/G13.png",
        "./img/4_enemie_boss_chicken/3_attack/G14.png",
        "./img/4_enemie_boss_chicken/3_attack/G15.png",
        "./img/4_enemie_boss_chicken/3_attack/G16.png",
        "./img/4_enemie_boss_chicken/3_attack/G17.png",
        "./img/4_enemie_boss_chicken/3_attack/G18.png",
        "./img/4_enemie_boss_chicken/3_attack/G19.png",
        "./img/4_enemie_boss_chicken/3_attack/G20.png"
    ];

    // Verletzt-Animation
    IMAGES_HURT = [
        "./img/4_enemie_boss_chicken/4_hurt/G21.png",
        "./img/4_enemie_boss_chicken/4_hurt/G22.png",
        "./img/4_enemie_boss_chicken/4_hurt/G23.png"
    ];

    // Tod-Animation
    IMAGES_DEAD = [
        "./img/4_enemie_boss_chicken/5_dead/G24.png",
        "./img/4_enemie_boss_chicken/5_dead/G25.png",
        "./img/4_enemie_boss_chicken/5_dead/G26.png"
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.animate();
    }

    // Neues Bewegungsmuster für den Endboss
    updateBossActions() {
        try {
            // Boss-Kampflogik implementieren
            const timePassed = new Date().getTime() - this.lastAction;
            
            // Wenn der Boss verletzt ist, bewegt er sich zurück
            if (this.isHurt()) {
                this.moveLeft();
            }
            // Wenn der Boss im Angriffsmodus ist
            else if (this.isAttacking) {
                this.moveLeft();
                
                // Angriff beenden nach gewisser Zeit
                if (timePassed > 2000) {
                    this.isAttacking = false;
                    this.lastAction = new Date().getTime();
                }
            }
            // Normales Verhalten
            else if (timePassed > 4000) {
                this.isAttacking = true;
                this.lastAction = new Date().getTime();
            }
        } catch (error) {
            console.error('Fehler in updateBossActions:', error);
        }
    }

    hit() {
        // Immer nur 20 Energiepunkte abziehen (wie beim Character)
        this.energy -= 20;
        
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            
            // Beim ersten Treffer Status setzen
            if (!this.hadFirstContact) {
                this.hadFirstContact = true;
                this.lastAction = new Date().getTime();
            }
        }
    }

    animate() {
        setInterval(() => {
            if (this.hadFirstContact && !this.isDead()) {
                this.updateBossActions();
            }
        }, 50);
        
        // Animation-Intervall
        setInterval(() => {
            if (this.isDead()) {
                this.PlayAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.PlayAnimation(this.IMAGES_HURT);
            } else if (this.isAttacking) {
                this.PlayAnimation(this.IMAGES_ATTACK);
            } else if (this.hadFirstContact) {
                this.PlayAnimation(this.IMAGES_WALKING);
            } else {
                this.PlayAnimation(this.IMAGES_ALERT);
            }
        }, 200);
    }
}
