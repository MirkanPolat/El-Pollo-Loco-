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

    determinePhase() {
        if (this.energy > 70) {
            return 'phase1'; // 100%-70% Health small Attacks
        } else if (this.energy > 30) {
            return 'phase2'; // 70%-30% Health fast Attack
        } else {
            return 'phase3'; // Under 30% angry boss harder attacks
        }
    }

    updateBossActions() {
        try {
            const timePassed = new Date().getTime() - this.lastAction;
            const currentPhase = this.determinePhase();
            
            // more agrresive attack and movement
            if (currentPhase === 'phase1') {
                this.attackCooldown = 3000;    
                this.attackDuration = 2500;    
                this.speed = 15;              
            } else if (currentPhase === 'phase2') {
                this.attackCooldown = 2000;    
                this.attackDuration = 3000;    
                this.speed = 20;              
            } else {
                this.attackCooldown = 1500;    
                this.attackDuration = 3500;   
                this.speed = 25;              
            }
            
            if (world && world.character && this.x > world.character.x + 150) {
                this.moveLeft();
            }
            
            if (this.isHurt()) {
                this.moveRight();
                setTimeout(() => {
                    this.lastAction = new Date().getTime() - this.attackCooldown + 500;
                }, 800);  
            } else if (this.isAttacking) {
                this.moveLeft();
                this.speed += 5;
                
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

    selectAttackType() {
        const phase = this.determinePhase();
        
        if (phase === 'phase3') {
            // In Phase 3 all attacks available
            const randomIndex = Math.floor(Math.random() * this.attacks.length);
            this.currentAttack = this.attacks[randomIndex];
        } else if (phase === 'phase2') {
            // In Phase 2 only jump and charge attacks
            const randomIndex = Math.floor(Math.random() * 2);
            this.currentAttack = this.attacks[randomIndex];
        } else {
            // In Phase 1 only normal attack
            this.currentAttack = 'normalAttack';
        }
        
        console.log('Boss executes: ' + this.currentAttack);
    }

    performAttack() {
        switch(this.currentAttack) {
            case 'jumpAttack':
                this.speedY = 40; 
                this.groundPosition = this.y;
                let jumpInterval = setInterval(() => {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration * 1.2;  
                    if (world && world.character) {
                        if (this.x > world.character.x) {
                            this.x -= this.speed * 1.2;
                        }
                    }
                    if (this.y > this.groundPosition) {
                        this.y = this.groundPosition;
                        this.speedY = 0;
                        clearInterval(jumpInterval);
                        this.isAttacking = true;
                        this.lastAction = new Date().getTime();
                    }
                }, 1000/60);
                break;
            case 'chargeAttack':
                this.speed = 30;
                if (this.bossSound) {
                    this.bossSound.play();
                }
                setTimeout(() => {
                    this.speed = 15;  
                    if (Math.random() < 0.4) { // 40% Chance for a charge attack
                        this.isAttacking = true;
                        this.lastAction = new Date().getTime();
                        this.selectAttackType();
                        this.performAttack();
                    }
                }, 1200);
                break;
            case 'normalAttack':
            default:
                this.speed += 8; 
                setTimeout(() => {
                    this.speed = Math.max(10, this.speed - 8);
                }, 1000);
                break;
        }
    }

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

    isPlayerNearby() {
        return world && 
               world.character && 
               this.x - world.character.x < this.detectionRange;
    }

    activateBoss() {
        if (!this.hadFirstContact) {
            this.hadFirstContact = true;
            this.lastAction = new Date().getTime();
            console.log('Boss activated: Player detected!');
        }
    }

    animate() {
        setInterval(() => {
            if (this.isPlayerNearby()) {
                this.activateBoss();
            }
            
            if (this.hadFirstContact && !this.isDead()) {
                this.updateBossActions();
            }
        }, 50);
        
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
