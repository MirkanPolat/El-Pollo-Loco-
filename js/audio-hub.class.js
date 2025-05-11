class AudioHub {
    // Lautstärke-Voreinstellungen
    static VOLUME = {
        BACKGROUND: 0.3,   // Hintergrundmusik leiser
        EFFECTS: 0.7,      // Effekte lauter
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
    static BOSS_DEAD = AudioHub.createSound('./assets/sounds/boss_dead.mp3', AudioHub.VOLUME.BOSS);
    
    // Charakter-Sounds
    static CHARACTER_JUMP = AudioHub.createSound('./assets/sounds/character_jump.mp3', AudioHub.VOLUME.CHARACTER);
    static CHARACTER_HURT = AudioHub.createSound('./assets/sounds/character_hurt.mp3', AudioHub.VOLUME.CHARACTER);
    
    // Effekt-Sounds
    static COLLECT_COIN = AudioHub.createSound('./assets/sounds/coin.mp3', AudioHub.VOLUME.EFFECTS);
    static COLLECT_BOTTLE = AudioHub.createSound('./assets/sounds/bottle_collect.mp3', AudioHub.VOLUME.EFFECTS);
    static THROW_BOTTLE = AudioHub.createSound('./assets/sounds/bottle_throw.mp3', AudioHub.VOLUME.EFFECTS);
    static BOTTLE_SHATTER = AudioHub.createSound('./assets/sounds/bottle_break.mp3', AudioHub.VOLUME.EFFECTS);
    
    // Sammlung aller Sounds (ohne Unterhaltungssounds)
    static allSounds = [
        AudioHub.BACKGROUND_MUSIC,
        AudioHub.BOSS_ALERT, AudioHub.BOSS_ATTACK, AudioHub.BOSS_JUMP,
        AudioHub.BOSS_CHARGE, AudioHub.BOSS_HURT, AudioHub.BOSS_DEAD,
        AudioHub.CHARACTER_JUMP, AudioHub.CHARACTER_HURT,
        AudioHub.COLLECT_COIN, AudioHub.COLLECT_BOTTLE, 
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
}