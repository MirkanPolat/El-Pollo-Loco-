class AudioHub {
    // Lautstärke-Voreinstellungen
    static VOLUME = {
        BACKGROUND: 0.3,   // Hintergrundmusik leiser
        EFFECTS: 0.4,      // Effekte lauter
        CHARACTER: 0.6,    // Charakter-Sounds mittel
        BOSS: 0.8          // Boss-Sounds etwas lauter
    };
    
    // Hintergrundmusik
    static BACKGROUND_MUSIC = AudioHub.createSound('./assets/sounds/background_music.mp3', AudioHub.VOLUME.BACKGROUND);
    
    // Endboss-Sounds
    static BOSS_ALERT = AudioHub.createSound('./assets/sounds/boss_alert.mp3', AudioHub.VOLUME.BOSS);
    static BOSS_ATTACK = AudioHub.createSound('./assets/sounds/boss_attack.mp3', AudioHub.VOLUME.BOSS);
    static BOSS_JUMP = AudioHub.createSound('./assets/sounds/boss_jump.mp3', AudioHub.VOLUME.BOSS);
    static BOSS_CHARGE = AudioHub.createSound('./assets/sounds/boss_charge.mp3', AudioHub.VOLUME.BOSS);
    static BOSS_HURT = AudioHub.createSound('./assets/sounds/boss_hurt.mp3', AudioHub.VOLUME.BOSS);
    static BOSS_DEAD = AudioHub.createSound('./audio/endboss-dead.mp3', AudioHub.VOLUME.BOSS);
    
    // Charakter-Sounds
    static CHARACTER_JUMP = AudioHub.createSound('./audio/jump.mp3', AudioHub.VOLUME.CHARACTER);
    static CHARACTER_HURT = AudioHub.createSound('./audio/character-hurt.mp3', AudioHub.VOLUME.CHARACTER);
    static CHARACTER_WALKING = AudioHub.createSound('./audio/walking.mp3', AudioHub.VOLUME.CHARACTER * 0.7);
    static CHARACTER_SLEEPING = AudioHub.createSound('./audio/character-sleeping.mp3', AudioHub.VOLUME.CHARACTER * 0.5);

    // Effekt-Sounds
    static COLLECT_COIN = AudioHub.createSound('./audio/coin.mp3', AudioHub.VOLUME.EFFECTS);
    static COLLECT_BOTTLE = AudioHub.createSound('./audio/collect-bottle.mp3', AudioHub.VOLUME.EFFECTS);
    static THROW_BOTTLE = AudioHub.createSound('./audio/throw-bottle.mp3', AudioHub.VOLUME.EFFECTS);
    static BOTTLE_SHATTER = AudioHub.createSound('./audio/bottle-shatter.mp3', AudioHub.VOLUME.EFFECTS);
    static HIT_ENEMY = AudioHub.createSound('./audio/hit-enemy.mp3', AudioHub.VOLUME.EFFECTS);
    
    // Sammlung aller Sounds (ohne Unterhaltungssounds)
    static allSounds = [
        AudioHub.BACKGROUND_MUSIC,
        AudioHub.BOSS_ALERT, AudioHub.BOSS_ATTACK, AudioHub.BOSS_JUMP,
        AudioHub.BOSS_CHARGE, AudioHub.BOSS_HURT, AudioHub.BOSS_DEAD,
        AudioHub.CHARACTER_JUMP, AudioHub.CHARACTER_HURT, AudioHub.CHARACTER_WALKING,AudioHub.CHARACTER_SLEEPING,
        AudioHub.COLLECT_COIN, AudioHub.COLLECT_BOTTLE, AudioHub.HIT_ENEMY,
        AudioHub.THROW_BOTTLE, AudioHub.BOTTLE_SHATTER
    ];
    
    /**
     * Hilfsmethode zum Erstellen eines Audio-Objekts mit festgelegter Lautstärke
     * @param {string} path - Pfad zur Audio-Datei
     * @param {number} volume - Lautstärke (0.0 bis 1.0)
     * @returns {Audio} - Audio-Objekt
     */
    static createSound(path, volume) {
        const sound = new Audio(path);
        sound.volume = volume;
        return sound;
    }

    /**
     * Spielt eine Audiodatei ab mit Überprüfung des Ladezustands
     * @param {Audio} sound - Das abzuspielende Audio-Objekt
     */
    static playOne(sound) {
        // Zuerst den Sound stoppen, falls er bereits läuft
        this.stopOne(sound);
        
        // Spezielle Anpassung nur für THROW_BOTTLE-Sound
        if (sound === AudioHub.THROW_BOTTLE) {
            sound.currentTime = 0.3; // Überspringe die ersten 0.3 Sekunden
        }
        if (sound === AudioHub.BOTTLE_SHATTER) {
            sound.currentTime = 0.35;
        }
        if (sound === AudioHub.HIT_ENEMY) {
            sound.currentTime = 14.5;
        }
        
        let checkInterval = setInterval(() => {
            // Überprüft, ob die Audiodatei vollständig geladen ist
            if (sound.readyState == 4) {
                console.log("Sound ready");
                sound.play(); // Spielt das übergebene Sound-Objekt ab
                clearInterval(checkInterval);
            } else {
                console.log("Sound not ready");
            }
        }, 200);
        
        // Sicherheits-Timeout nach 1 Sekunde
        setTimeout(() => {
            clearInterval(checkInterval);
        }, 1000);
    }
    
    /**
     * Stoppt eine einzelne Audiodatei
     * @param {Audio} sound - Das zu stoppende Audio-Objekt
     */
    static stopOne(sound) {
        sound.pause(); // Pausiert das übergebene Audio
        sound.currentTime = 0; // Setzt Wiedergabeposition zurück
    }
    
    /**
     * Stoppt das Abspielen aller Audiodateien
     */
    static stopAll() {
        AudioHub.allSounds.forEach(sound => {
            sound.pause(); // Pausiert jedes Audio in der Liste
            sound.currentTime = 0; // Setzt Wiedergabeposition zurück
        });
    }

/**
 * Spielt einen Walking-Sound in einer Schleife, wenn der Charakter läuft
 * @param {Audio} sound - Der abzuspielende Sound
 * @param {boolean} isWalking - Ist der Charakter in Bewegung?
 */
static playWalkingSound(sound, isWalking) {
    if (isWalking) {
        // Wenn Sound nicht läuft oder fast zu Ende ist, neu starten
        if (sound.paused || sound.currentTime > sound.duration - 0.1) {
            sound.currentTime = 0;
            sound.play();
        }
    } else {
        // Wenn nicht läuft, Sound stoppen
        this.stopOne(sound);
    }
}
}