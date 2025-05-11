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
            
            // Phase-spezifische Werte - AGGRESSIVER!
            if (currentPhase === 'phase1') {
                this.attackCooldown = 3000;    // War 4000 - schnellere Angriffe
                this.attackDuration = 2500;    // War 2000 - längere Angriffszeit
                this.speed = 15;               // War 10 - schnellere Bewegung
            } else if (currentPhase === 'phase2') {
                this.attackCooldown = 2000;    // War 3000 - noch schnellere Angriffe
                this.attackDuration = 3000;    // War 2500 - längere Angriffszeit
                this.speed = 20;               // War 12 - deutlich schnellere Bewegung
            } else { // phase3
                this.attackCooldown = 1500;    // War 2000 - sehr schnelle Angriffe
                this.attackDuration = 3500;    // War 3000 - längere Angriffszeit
                this.speed = 25;               // War 15 - extrem schnelle Bewegung
            }
            
            // Spieler verfolgen (füge diese Referenz in der world.js hinzu: this.endboss.character = this.character)
            if (world && world.character && this.x > world.character.x + 150) {
                this.moveLeft();  // Folge dem Spieler aggressiver
            }
            
            if (this.isHurt()) {
                // Auch wenn verletzt, nur kurz zurückziehen, dann wieder angreifen
                this.moveRight();
                setTimeout(() => {
                    this.lastAction = new Date().getTime() - this.attackCooldown + 500; // Sofort wieder angreifen
                }, 800);  
            } else if (this.isAttacking) {
                // Aggressiver angreifen - schneller zum Spieler
                this.moveLeft();
                this.speed += 5; // Noch schneller während des Angriffs
                
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
                this.speedY = 40;  // War 30 - höherer Sprung
                // Speichere die ursprüngliche Y-Position vor dem Sprung
                this.groundPosition = this.y;
                
                // Schnellerer und aggressiverer Sprung
                let jumpInterval = setInterval(() => {
                    // Aggressivere Gravitation
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration * 1.2;  // Schnelleres Fallen
                    
                    // Beim Sprung auch horizontal bewegen - folge dem Spieler
                    if (world && world.character) {
                        if (this.x > world.character.x) {
                            this.x -= this.speed * 1.2; // Aggressiver in Richtung Spieler
                        }
                    }
                    
                    // Überprüfung, ob der Boss zurück am Boden ist
                    if (this.y > this.groundPosition) {
                        this.y = this.groundPosition;
                        this.speedY = 0;
                        clearInterval(jumpInterval);
                        
                        // Nach der Landung sofort einen Folgeangriff starten
                        this.isAttacking = true;
                        this.lastAction = new Date().getTime();
                    }
                }, 1000/60);
                break;
            case 'chargeAttack':
                this.speed = 30;  // War 20 - viel schnellerer Ansturm
                
                // Wütender Sound abspielen
                if (this.bossSound) {
                    this.bossSound.play();
                }
                
                // Nach dem Ansturm nicht sofort verlangsamen
                setTimeout(() => {
                    this.speed = 15;  // War 10
                    
                    // Chance für einen sofortigen zweiten Angriff
                    if (Math.random() < 0.4) { // 40% Chance für Folgeangriff
                        this.isAttacking = true;
                        this.lastAction = new Date().getTime();
                        this.selectAttackType();
                        this.performAttack();
                    }
                }, 1200);  // War 1000 - längerer Ansturm
                break;
            case 'normalAttack':
            default:
                // Auch normaler Angriff aggressiver
                this.speed += 8;  // Geschwindigkeitsschub
                setTimeout(() => {
                    this.speed = Math.max(10, this.speed - 8);
                }, 1000);
                break;
        }
    }

    hit() {
        // Immer nur 20 Energiepunkte abziehen (wie beim Character)
        this.energy -= 20;
        
        if (this.energy <= 0) {
            this.energy = 0;
            
            // Boss-Death-Sound beim Tod abspielen (nur einmal)
            if (!this.deathSoundPlayed) {
                AudioHub.playOne(AudioHub.BOSS_DEAD);
                this.deathSoundPlayed = true;
            }
        } else {
            this.lastHit = new Date().getTime();
            
            // Beim ersten Treffer Status setzen
            if (!this.hadFirstContact) {
                this.hadFirstContact = true;
                this.lastAction = new Date().getTime();
            }
            
            // Boss-Hurt-Sound beim Treffer abspielen
            AudioHub.playOne(AudioHub.BOSS_HURT);
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
