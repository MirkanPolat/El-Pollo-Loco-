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
    
    static GAME_WIN = AudioHub.createSound('./audio/win.mp3', AudioHub.VOLUME.EFFECTS);
    static GAME_LOSE = AudioHub.createSound('./audio/lose.mp3', AudioHub.VOLUME.EFFECTS);
    static GAME_LOSE_EFFECT = AudioHub.createSound('./audio/lose-effect.mp3', AudioHub.VOLUME.EFFECTS);

    static allSounds = [
        AudioHub.BACKGROUND_MUSIC,
        AudioHub.BOSS_ATTACK, AudioHub.BOSS_HURT, AudioHub.BOSS_DEAD,
        AudioHub.CHARACTER_JUMP, AudioHub.CHARACTER_HURT, AudioHub.CHARACTER_WALKING,AudioHub.CHARACTER_SLEEPING,
        AudioHub.COLLECT_COIN, AudioHub.COLLECT_BOTTLE, AudioHub.HIT_ENEMY,
        AudioHub.THROW_BOTTLE, AudioHub.BOTTLE_SHATTER,
        AudioHub.GAME_WIN, AudioHub.GAME_LOSE, AudioHub.GAME_LOSE_EFFECT
    ];
    
    /**
     * Creates a new audio object with specified volume
     * @param {string} path - Path to the audio file
     * @param {number} volume - Volume level (0.0 to 1.0)
     * @returns {Audio} The created audio object
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
        /**
         * if
         * @param {*} AudioHub.isMuted - AudioHub.isMuted
         */
        if (AudioHub.isMuted) {
            return;
        }

        this.stopOne(sound);
        this.setSoundStartTime(sound);
        this.setupBackgroundLoop(sound);
        this.playWhenReady(sound);
    }

    /**
     * Sets the start time for specific sounds
     * @param {Audio} sound - The audio object to configure
     */
    static setSoundStartTime(sound) {
        /**
         * if
         * @param {Audio} sound - sound
         */
        if (sound === AudioHub.THROW_BOTTLE) {
            sound.currentTime = 0.3;
        }
        /**
         * if
         * @param {Audio} sound - sound
         */
        if (sound === AudioHub.BOTTLE_SHATTER) {
            sound.currentTime = 0.35;
        }
        /**
         * if
         * @param {Audio} sound - sound
         */
        if (sound === AudioHub.HIT_ENEMY) {
            sound.currentTime = 14.5;
        }
        /**
         * if
         * @param {Audio} sound - sound
         */
        if (sound === AudioHub.BACKGROUND_MUSIC) {
            sound.currentTime = 0.4;
        }
    }

    /**
     * Sets up seamless looping for background music
     * @param {Audio} sound - The audio object to configure
     */
    static setupBackgroundLoop(sound) {
        /**
         * if
         * @param {Audio} sound - sound
         */
        if (sound === AudioHub.BACKGROUND_MUSIC) {
            sound.removeEventListener('timeupdate', sound._timeUpdateHandler);
            
            sound._timeUpdateHandler = () => {
                /**
                 * if
                 * @param {*} sound.currentTime > - sound.currentTime >
                 */
                if (sound.currentTime >= sound.duration - 3) {
                    sound.currentTime = 0.4;
                }
            };
        
            sound.addEventListener('timeupdate', sound._timeUpdateHandler);
        }
    }

    /**
     * Waits for sound to be ready and then plays it
     * @param {Audio} sound - The audio object to play
     */
    static playWhenReady(sound) {
        let checkInterval = setInterval(() => {
            /**
             * if
             * @param {*} sound.readyState - sound.readyState
             */
            if (sound.readyState == 4) {
                sound.play().catch(error => {
                });
                clearInterval(checkInterval);
            }
        }, 200);
        
        setTimeout(() => {
            clearInterval(checkInterval);
        }, 1000);
    }
    
    /**
     * Stops a single audio file and resets it
     * @param {Audio} sound - The audio object to stop
     */
    static stopOne(sound) {
        sound.pause();
        sound.currentTime = 0;
    }
    
    /**
     * Stops all audio files in the game
     */
    static stopAll() {
        AudioHub.allSounds.forEach(sound => {
            /**
             * if
             * @param {Audio} sound - sound
             */
            if (sound) {
                sound.pause();
                sound.currentTime = 0;
            }
        });
    }

    /**
     * Plays walking sound in a loop while character is moving
     * @param {Audio} sound - The walking sound to play
     * @param {boolean} isWalking - Whether the character is currently walking
     */
    static playWalkingSound(sound, isWalking) {
        /**
         * if
         * @param {*} AudioHub.isMuted - AudioHub.isMuted
         */
        if (AudioHub.isMuted) {
            this.stopOne(sound);
            return;
        }
        
        /**
         * if
         * @param {boolean} isWalking - isWalking
         */
        if (isWalking) {
            /**
             * if
             * @param {*} sound.paused || sound.currentTime > sound.duration - 0.1 - sound.paused || sound.currentTime > sound.duration - 0.1
             */
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
     * Starts playing the background music
     */
    static playBackgroundMusic() {
        /**
         * if
         * @param {*} AudioHub.currentMusic - AudioHub.currentMusic
         */
        if (AudioHub.currentMusic) {
            AudioHub.stopOne(AudioHub.currentMusic);
        }
        
        AudioHub.currentMusic = AudioHub.BACKGROUND_MUSIC;
        AudioHub.currentMusic.loop = true;
        AudioHub.playOne(AudioHub.currentMusic);
    }

    /**
     * Changes to a different background music
     * @param {Audio} newSound - The new background music to play
     * @param {boolean} loop - Whether the music should loop (default: true)
     */
    static changeGameMusic(newSound, loop = true) {
        /**
         * if
         * @param {*} AudioHub.currentMusic - AudioHub.currentMusic
         */
        if (AudioHub.currentMusic) {
            AudioHub.stopOne(AudioHub.currentMusic);
        }
        
        AudioHub.currentMusic = newSound;
        AudioHub.currentMusic.loop = loop;
        AudioHub.playOne(AudioHub.currentMusic);
    }
}
