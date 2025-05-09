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
        this.attacks = ['normalAttack', 'jumpAttack', 'chargeAttack'];
        this.currentAttack = 'normalAttack';
        this.x = 2500;
        this.animate();
    }

    // Neue Methode für die Endboss-Klasse
    determinePhase() {
        if (this.energy > 70) {
            return 'phase1'; // 100%-70% Gesundheit - leichte Angriffe
        } else if (this.energy > 30) {
            return 'phase2'; // 70%-30% Gesundheit - schnellere Angriffe
        } else {
            return 'phase3'; // Unter 30% - wütender Boss, stärkere Angriffe
        }
    }

    // Neues Bewegungsmuster für den Endboss
    updateBossActions() {
        try {
            const timePassed = new Date().getTime() - this.lastAction;
            const currentPhase = this.determinePhase();
            
            // Phase-spezifische Werte einstellen
            if (currentPhase === 'phase1') {
                this.attackCooldown = 4000;
                this.attackDuration = 2000;
                this.speed = 10;
            } else if (currentPhase === 'phase2') {
                this.attackCooldown = 3000;
                this.attackDuration = 2500;
                this.speed = 12;
            } else { // phase3
                this.attackCooldown = 2000;
                this.attackDuration = 3000;
                this.speed = 15;
            }
            
            if (this.isHurt()) {
                this.moveRight();
            } else if (this.isAttacking) {
                this.moveLeft();
                
                if (timePassed > this.attackDuration) {
                    this.isAttacking = false;
                    this.lastAction = new Date().getTime();
                }
            } else if (timePassed > this.attackCooldown) {
                this.isAttacking = true;
                this.lastAction = new Date().getTime();
                this.selectAttackType();
                this.performAttack();
            }
        } catch (error) {
            console.error('Fehler in updateBossActions:', error);
        }
    }

    // Zufälligen Angriffstyp wählen
    selectAttackType() {
        const phase = this.determinePhase();
        
        if (phase === 'phase3') {
            // In Phase 3 alle Angriffe möglich
            const randomIndex = Math.floor(Math.random() * this.attacks.length);
            this.currentAttack = this.attacks[randomIndex];
        } else if (phase === 'phase2') {
            // In Phase 2 nur normal und charge
            const randomIndex = Math.floor(Math.random() * 2);
            this.currentAttack = this.attacks[randomIndex];
        } else {
            // In Phase 1 nur normale Angriffe
            this.currentAttack = 'normalAttack';
        }
        
        console.log('Boss führt aus: ' + this.currentAttack);
    }

    performAttack() {
        switch(this.currentAttack) {
            case 'jumpAttack':
                this.speedY = 30;
                // Speichere die ursprüngliche Y-Position vor dem Sprung
                this.groundPosition = this.y;
                
                // Modifizierte Gravitationslogik mit Ground-Check
                let jumpInterval = setInterval(() => {
                    // Anwendung der Gravitation
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                    
                    // Überprüfung, ob der Boss zurück am Boden ist
                    if (this.y > this.groundPosition) {
                        // Boss ist unter die Startposition gefallen, korrigiere Position
                        this.y = this.groundPosition;
                        this.speedY = 0;
                        clearInterval(jumpInterval);
                    }
                }, 1000/60);
                break;
            case 'chargeAttack':
                this.speed = 20;
                setTimeout(() => this.speed = 10, 1000);
                break;
            case 'normalAttack':
            default:
                // Standard-Angriff
                break;
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
