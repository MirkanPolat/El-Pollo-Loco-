/**
 * Creates a new Endboss.
 * @class
 */
class Endboss extends MovableObject {
    width = 300;    
    height = 400;
    y = 50;
    maxEnergy = 100;
    energy = 100;
    hadFirstContact = false;
    speed = 10;
    isAttacking = false;
    lastAction = new Date().getTime();
    detectionRange = 500;
    
    offset = {
        top: 80,
        bottom: 60, 
        left: 30,
        right: 50
    };

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

    IMAGES_WALKING = [
        "./img/4_enemie_boss_chicken/1_walk/G1.png",
        "./img/4_enemie_boss_chicken/1_walk/G2.png",
        "./img/4_enemie_boss_chicken/1_walk/G3.png",
        "./img/4_enemie_boss_chicken/1_walk/G4.png"
    ];

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

    IMAGES_HURT = [
        "./img/4_enemie_boss_chicken/4_hurt/G21.png",
        "./img/4_enemie_boss_chicken/4_hurt/G22.png",
        "./img/4_enemie_boss_chicken/4_hurt/G23.png"
    ];

    IMAGES_DEAD = [
        "./img/4_enemie_boss_chicken/5_dead/G24.png",
        "./img/4_enemie_boss_chicken/5_dead/G25.png",
        "./img/4_enemie_boss_chicken/5_dead/G26.png"
    ];

    /**
     * Creates a new Endboss instance
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.attacks = ['normalAttack', 'jumpAttack', 'chargeAttack'];
        this.currentAttack = 'normalAttack';
        this.x = 7200;
        this.animate();
    }

    /**
     * determinePhase
     */
    determinePhase() {
        if (this.energy > 70) {
            return 'phase1';
        } else if (this.energy > 30) {
            return 'phase2';
        } else {
            return 'phase3';
        }
    }

    /**
     * Updates the state
     */
    updateBossActions() {
        try {
            const timePassed = new Date().getTime() - this.lastAction;
            this.setPhaseProperties();
            this.faceCharacter();
            this.handleBossState(timePassed);
        } catch (error) {
        }
    }

    /**
     * Sets the value
     */
    setPhaseProperties() {
        const phases = {
            'phase1': { cooldown: 3000, duration: 2500, speed: 15 },
            'phase2': { cooldown: 2000, duration: 3000, speed: 20 },
            'phase3': { cooldown: 1500, duration: 3500, speed: 25 }
        };
        const phase = phases[this.determinePhase()];
        this.attackCooldown = phase.cooldown;
        this.attackDuration = phase.duration;
        this.speed = phase.speed;
    }

    /**
     * faceCharacter
     */
    faceCharacter() {
        if (world && world.character) {
            if (this.x > world.character.x + 150) {
                this.otherDirection = false;
                this.moveLeft();
            } else if (this.x < world.character.x - 150) {
                this.otherDirection = true;
                this.moveRight();
            }
        }
    }

    /**
     * Handles the event
     * @param {number} timePassed - timePassed
     */
    handleBossState(timePassed) {
        if (this.isHurt()) {
            this.retreatFromCharacter();
        } else if (this.isAttacking) {
            this.attackCharacter(timePassed);
        } else if (timePassed > this.attackCooldown) {
            this.startNewAttack();
        }
    }

    /**
     * retreatFromCharacter
     */
    retreatFromCharacter() {
        if (world && world.character) {
            if (this.x > world.character.x) {
                this.otherDirection = false;
                this.moveRight();
            } else {
                this.otherDirection = true;
                this.moveLeft();
            }
        }
        setTimeout(() => {
            this.lastAction = new Date().getTime() - this.attackCooldown + 500;
        }, 800);
    }

    /**
     * attackCharacter
     * @param {number} timePassed - timePassed
     */
    attackCharacter(timePassed) {
        if (world && world.character) {
            if (this.x > world.character.x) {
                this.otherDirection = false;
                this.moveLeft();
            } else {
                this.otherDirection = true;
                this.moveRight();
            }
        }
        this.speed += 5;
        if (timePassed > this.attackDuration) {
            this.isAttacking = false;
            this.lastAction = new Date().getTime();
        }
    }

    /**
     * Starts the process
     */
    startNewAttack() {
        this.isAttacking = true;
        this.lastAction = new Date().getTime();
        this.selectAttackType();
        this.performAttack();
    }

    /**
     * selectAttackType
     */
    selectAttackType() {
        const phase = this.determinePhase();
        
        if (phase === 'phase3') {
            const randomIndex = Math.floor(Math.random() * this.attacks.length);
            this.currentAttack = this.attacks[randomIndex];
        } else if (phase === 'phase2') {
            const randomIndex = Math.floor(Math.random() * 2);
            this.currentAttack = this.attacks[randomIndex];
        } else {
            this.currentAttack = 'normalAttack';
        }
    }

    /**
     * performAttack
     */
    performAttack() {
        if (this.currentAttack === 'jumpAttack') {
            this.executeJumpAttack();
        } else if (this.currentAttack === 'chargeAttack') {
            this.executeChargeAttack();
        } else {
            this.executeNormalAttack();
        }
    }

    /**
     * executeJumpAttack
     */
    executeJumpAttack() {
        this.speedY = 40;
        this.groundPosition = this.y;
        let jumpInterval = setInterval(() => {
            this.updateJumpPosition();
            if (this.y > this.groundPosition) {
                this.landFromJump(jumpInterval);
            }
        }, 1000 / 60);
    }

    /**
     * Updates the state
     */
    updateJumpPosition() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration * 1.2;
        if (world && world.character) {
            if (this.x > world.character.x) {
                this.otherDirection = false;
                this.x -= this.speed * 1.2;
            } else {
                this.otherDirection = true;
                this.x += this.speed * 1.2;
            }
        }
    }

    /**
     * landFromJump
     * @param {*} jumpInterval - jumpInterval
     */
    landFromJump(jumpInterval) {
        this.y = this.groundPosition;
        this.speedY = 0;
        clearInterval(jumpInterval);
        this.isAttacking = true;
        this.lastAction = new Date().getTime();
    }

    /**
     * executeChargeAttack
     */
    executeChargeAttack() {
        this.speed = 30;
        if (this.bossSound) {
            this.bossSound.play();
        }
        setTimeout(() => {
            this.speed = 15;
            if (Math.random() < 0.4) {
                this.startNewAttack();
            }
        }, 1200);
    }

    /**
     * executeNormalAttack
     */
    executeNormalAttack() {
        this.speed += 8;
        setTimeout(() => {
            this.speed = Math.max(10, this.speed - 8);
        }, 1000);
    }

    /**
     * Handles hit/damage
     */
    hit() {
        this.energy -= 20;
        
        if (this.energy <= 0) {
            this.energy = 0;
            if (!this.deathSoundPlayed) {
                AudioHub.playOne(AudioHub.BOSS_DEAD);
                this.deathSoundPlayed = true;
            }
        } else {
            this.lastHit = new Date().getTime();
            AudioHub.playOne(AudioHub.BOSS_HURT);
        }
    }

    /**
     * Checks if condition is true
     * @returns {boolean}
     */
    isPlayerNearby() {
        return world && 
               world.character && 
               this.x - world.character.x < this.detectionRange;
    }

    /**
     * activateBoss
     */
    activateBoss() {
        if (!this.hadFirstContact) {
            this.hadFirstContact = true;
            this.lastAction = new Date().getTime();
        }
    }

    /**
     * Animates the object
     */
    animate() {
        this.behaviorInterval = setInterval(() => {
            this.handleBehavior();
        }, 50);
        
        this.animationInterval = setInterval(() => {
            this.handleAnimation();
        }, 200);
    }

    /**
     * Handles the event
     */
    handleBehavior() {
        if (this.isPlayerNearby()) {
            this.activateBoss();
        }
        if (this.hadFirstContact && !this.isDead()) {
            this.updateBossActions();
        }
    }

    /**
     * Handles the event
     */
    handleAnimation() {
        if (this.isDead()) {
            this.handleDead();
        } else if (this.isHurt()) {
            this.PlayAnimation(this.IMAGES_HURT);
        } else if (this.isAttacking) {
            this.handleAttacking();
        } else if (this.hadFirstContact) {
            this.PlayAnimation(this.IMAGES_WALKING);
        } else {
            this.PlayAnimation(this.IMAGES_ALERT);
        }
    }

    /**
     * Handles the event
     */
    handleDead() {
        this.PlayAnimation(this.IMAGES_DEAD);
        this.cleanup();
    }

    /**
     * Handles the event
     */
    handleAttacking() {
        this.PlayAnimation(this.IMAGES_ATTACK);
    }

    /**
     * cleanup
     */
    cleanup() {
        clearInterval(this.behaviorInterval);
        clearInterval(this.animationInterval);
    }
}

