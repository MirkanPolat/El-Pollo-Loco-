class AudioHub {
    static isMuted = false;

    static VOLUME = {
        BACKGROUND: 0.1,   
        EFFECTS: 0.3,      
        CHARACTER: 0.6,   
        BOSS: 0.7      
        
    };
    static BACKGROUND_MUSIC = AudioHub.createSound('./audio/latin-mexican-salsa-background-music.mp3', AudioHub.VOLUME.BACKGROUND);
    
    static BOSS_ATTACK = AudioHub.createSound('./audio/endboss-attack.mp3', AudioHub.VOLUME.BOSS);
    static BOSS_HURT = AudioHub.createSound('./audio/endboss-hurt.mp3', AudioHub.VOLUME.BOSS);
    static BOSS_DEAD = AudioHub.createSound('./audio/endboss-dead.mp3', AudioHub.VOLUME.BOSS);
    
    static CHARACTER_JUMP = AudioHub.createSound('./audio/jump.mp3', AudioHub.VOLUME.CHARACTER);
    static CHARACTER_HURT = AudioHub.createSound('./audio/character-hurt.mp3', AudioHub.VOLUME.CHARACTER);
    static CHARACTER_WALKING = AudioHub.createSound('./audio/walking.mp3', AudioHub.VOLUME.CHARACTER * 0.7);
    static CHARACTER_SLEEPING = AudioHub.createSound('./audio/character-sleeping.mp3', AudioHub.VOLUME.CHARACTER * 0.5);

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
        if (AudioHub.isMuted) {
            return;
        }

        this.stopOne(sound);
        
        if (sound === AudioHub.THROW_BOTTLE) {
            sound.currentTime = 0.3;
        }
        if (sound === AudioHub.BOTTLE_SHATTER) {
            sound.currentTime = 0.35;
        }
        if (sound === AudioHub.HIT_ENEMY) {
            sound.currentTime = 14.5;
        }
        if (sound === AudioHub.BACKGROUND_MUSIC) {
            sound.currentTime = 0.4;
            
            sound.removeEventListener('timeupdate', sound._timeUpdateHandler);
            
            sound._timeUpdateHandler = () => {
                if (sound.currentTime >= sound.duration - 3) {
                    sound.currentTime = 0.4;
                }
            };
        
            sound.addEventListener('timeupdate', sound._timeUpdateHandler);
        }
        
        let checkInterval = setInterval(() => {
            if (sound.readyState == 4) {
                console.log("Sound ready");
                sound.play().catch(error => {
                    if (error.name === 'AbortError') {
                        console.log('Play wurde abgebrochen:', error.message);
                    } else {
                        console.error('Sound-Fehler:', error);
                    }
                });
                clearInterval(checkInterval);
            } else {
                console.log("Sound not ready");
            }
        }, 200);
        
        setTimeout(() => {
            clearInterval(checkInterval);
        }, 1000);
    }
    
    /**
     * Stops a single audio file
     * @param {Audio} sound - The audio object to stop
     */
    static stopOne(sound) {
        sound.pause();
        sound.currentTime = 0;
    }
    
    /**
     * Stops playback of all audio files
     */
    static stopAll() {
        AudioHub.allSounds.forEach(sound => {
            if (sound) {
                sound.pause();
                sound.currentTime = 0;
            }
        });
    }

    /**
     * Plays a walking sound in a loop when the character is walking
     * @param {Audio} sound - The sound to play
     * @param {boolean} isWalking - Is the character moving?
     */
    static playWalkingSound(sound, isWalking) {
        if (isWalking) {
            if (sound.paused || sound.currentTime > sound.duration - 0.1) {
                sound.currentTime = 0;
                sound.play();
            }
        } else {
            this.stopOne(sound);
        }
    }

    static currentMusic;

    /**
     * Starts the background music
     */
    static playBackgroundMusic() {
        if (AudioHub.currentMusic) {
            AudioHub.stopOne(AudioHub.currentMusic);
        }
        
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