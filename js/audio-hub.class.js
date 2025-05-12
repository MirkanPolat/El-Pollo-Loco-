class AudioHub {
    static VOLUME = {
        BACKGROUND: 0.3,   
        EFFECTS: 0.4,      
        CHARACTER: 0.6,   
        BOSS: 0.7      
    };
    static BACKGROUND_MUSIC = AudioHub.createSound('./audio/latin-mexican-salsa-background-music.mp3', AudioHub.VOLUME.BACKGROUND);
    
    // Boss sounds
    static BOSS_ATTACK = AudioHub.createSound('./audio/endboss-attack.mp3', AudioHub.VOLUME.BOSS);
    static BOSS_HURT = AudioHub.createSound('./audio/endboss-hurt.mp3', AudioHub.VOLUME.BOSS);
    static BOSS_DEAD = AudioHub.createSound('./audio/endboss-dead.mp3', AudioHub.VOLUME.BOSS);
    
    // Character sounds
    static CHARACTER_JUMP = AudioHub.createSound('./audio/jump.mp3', AudioHub.VOLUME.CHARACTER);
    static CHARACTER_HURT = AudioHub.createSound('./audio/character-hurt.mp3', AudioHub.VOLUME.CHARACTER);
    static CHARACTER_WALKING = AudioHub.createSound('./audio/walking.mp3', AudioHub.VOLUME.CHARACTER * 0.7);
    static CHARACTER_SLEEPING = AudioHub.createSound('./audio/character-sleeping.mp3', AudioHub.VOLUME.CHARACTER * 0.5);

    // Effect sounds
    static COLLECT_COIN = AudioHub.createSound('./audio/coin.mp3', AudioHub.VOLUME.EFFECTS);
    static COLLECT_BOTTLE = AudioHub.createSound('./audio/collect-bottle.mp3', AudioHub.VOLUME.EFFECTS);
    static THROW_BOTTLE = AudioHub.createSound('./audio/throw-bottle.mp3', AudioHub.VOLUME.EFFECTS);
    static BOTTLE_SHATTER = AudioHub.createSound('./audio/bottle-shatter.mp3', AudioHub.VOLUME.EFFECTS);
    static HIT_ENEMY = AudioHub.createSound('./audio/hit-enemy.mp3', AudioHub.VOLUME.EFFECTS);

    static allSounds = [
        AudioHub.BACKGROUND_MUSIC,
        AudioHub.BOSS_ATTACK, AudioHub.BOSS_HURT, AudioHub.BOSS_DEAD,
        AudioHub.CHARACTER_JUMP, AudioHub.CHARACTER_HURT, AudioHub.CHARACTER_WALKING,AudioHub.CHARACTER_SLEEPING,
        AudioHub.COLLECT_COIN, AudioHub.COLLECT_BOTTLE, AudioHub.HIT_ENEMY,
        AudioHub.THROW_BOTTLE, AudioHub.BOTTLE_SHATTER
    ];
    
    /**
     * Helper method to create an audio object with specified volume
     * @param {string} path - Path to the audio file
     * @param {number} volume - Volume level (0.0 to 1.0)
     * @returns {Audio} - Audio object
     */
    static createSound(path, volume) {
        const sound = new Audio(path);
        sound.volume = volume;
        return sound;
    }

    /**
     * Plays an audio file with load state verification
     * @param {Audio} sound - The audio object to play
     */
    static playOne(sound) {
        // First stop the sound if it's already playing
        this.stopOne(sound);
        
        // Special adjustment only for THROW_BOTTLE sound
        if (sound === AudioHub.THROW_BOTTLE) {
            sound.currentTime = 0.3; // Skip the first 0.3 seconds
        }
        if (sound === AudioHub.BOTTLE_SHATTER) {
            sound.currentTime = 0.35;
        }
        if (sound === AudioHub.HIT_ENEMY) {
            sound.currentTime = 14.5;
        }
        if (sound === AudioHub.BACKGROUND_MUSIC) {
            sound.currentTime = 0.4; // Set the playback position to the beginning
            
            // Remove event listener if already exists (prevents duplication)
            sound.removeEventListener('timeupdate', sound._timeUpdateHandler);
            
            // Event handler to cut off the last 3 seconds
            sound._timeUpdateHandler = () => {
                // When we reach the last 3 seconds, jump back to the beginning
                if (sound.currentTime >= sound.duration - 3) {
                    sound.currentTime = 0.4; // Back to the beginning with the same offset
                }
            };
            
            // Add event listener
            sound.addEventListener('timeupdate', sound._timeUpdateHandler);
        }
        
        let checkInterval = setInterval(() => {
            // Check if the audio file is fully loaded
            if (sound.readyState == 4) {
                console.log("Sound ready");
                sound.play(); // Play the provided sound object
                clearInterval(checkInterval);
            } else {
                console.log("Sound not ready");
            }
        }, 200);
        
        // Safety timeout after 1 second
        setTimeout(() => {
            clearInterval(checkInterval);
        }, 1000);
    }
    
    /**
     * Stops a single audio file
     * @param {Audio} sound - The audio object to stop
     */
    static stopOne(sound) {
        sound.pause(); // Pause the provided audio
        sound.currentTime = 0; // Reset playback position
    }
    
    /**
     * Stops playback of all audio files
     */
    static stopAll() {
        AudioHub.allSounds.forEach(sound => {
            sound.pause(); // Pause each audio in the list
            sound.currentTime = 0; // Reset playback position
        });
    }

    /**
     * Plays a walking sound in a loop when the character is walking
     * @param {Audio} sound - The sound to play
     * @param {boolean} isWalking - Is the character moving?
     */
    static playWalkingSound(sound, isWalking) {
        if (isWalking) {
            // If sound is not playing or almost finished, restart
            if (sound.paused || sound.currentTime > sound.duration - 0.1) {
                sound.currentTime = 0;
                sound.play();
            }
        } else {
            // If not walking, stop the sound
            this.stopOne(sound);
        }
    }

    // Current background music
    static currentMusic;

    /**
     * Starts the background music
     */
    static playBackgroundMusic() {
        // Stop previous music (if exists)
        if (AudioHub.currentMusic) {
            AudioHub.stopOne(AudioHub.currentMusic);
        }
        
        // Start new music
        AudioHub.currentMusic = AudioHub.BACKGROUND_MUSIC;
        AudioHub.currentMusic.loop = true;
        AudioHub.playOne(AudioHub.currentMusic);
    }

    /**
     * Changes to a different background sound
     * @param {Audio} newSound - The new sound to play
     * @param {boolean} loop - Whether the sound should play in a loop
     */
    static changeGameMusic(newSound, loop = true) {
        if (AudioHub.currentMusic) {
            AudioHub.stopOne(AudioHub.currentMusic);
        }
        
        AudioHub.currentMusic = newSound;
        AudioHub.currentMusic.loop = loop;
        AudioHub.playOne(AudioHub.currentMusic);
    }
}