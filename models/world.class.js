/**
 * Creates a new World.
 * @class
 */
class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  throwableObjects = [];
  bottleStatusbar = new BottleStatusBar();
  coinStatusbar = new CoinStatusBar();
  bossStatusbar = new BossStatusBar(); 
  gameInterval;
  isGameActive = true;

  /**
   * Function description
   */
  /**
   * Creates a new World instance
   * @param {HTMLCanvasElement} canvas - canvas
   * @param {Keyboard} keyboard - keyboard
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Function description
   */
  /**
   * Sets the value
   */
  setWorld() {
    this.character.world = this;
  }
  
  /**
   * Function description
   */
  /**
   * run
   */
  run() {
    this.gameInterval = setInterval(() => {
      if (!this.isGameActive) return;
      
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkBottleCollisions();
      this.checkCoinCollisions();
      this.checkForDeadChickens();
      this.checkGameState();
    }, 16);
  }
  
  /**
   * Function description
   */
  /**
   * Checks the condition
   */
  checkThrowObjects() {
    /**
     * Function description
     */
    /**
     * if
     * @param {*} this.keyboard.D && this.character.bottles > 0 - this.keyboard.D && this.character.bottles > 0
     */
    if (this.keyboard.D && this.character.bottles > 0) {
      let startX = this.character.otherDirection ? this.character.x - 50 : this.character.x + 100;
      let isMoving = this.keyboard.RIGHT || this.keyboard.LEFT;
      let bottle = new ThrowableObject(startX, this.character.y + 100, this.character.otherDirection, isMoving);
      this.throwableObjects.push(bottle);
      this.character.bottles--;
      this.bottleStatusbar.setPercentage(this.character.bottles * 20);
      AudioHub.playOne(AudioHub.THROW_BOTTLE);
      this.keyboard.D = false;
    }
  }

  /**
   * Function description
   */
  /**
   * Checks the condition
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead()) {
        if (this.isJumpKill(enemy)) {
          this.handleJumpKill(enemy);
        } else if (this.canTakeDamage()) {
          this.handleCharacterDamage(enemy);
        }
      }
    });
  }

  /**
   * Function description
   */
  /**
   * Checks if condition is true
   * @param {MovableObject} enemy - enemy
   * @returns {boolean}
   */
  isJumpKill(enemy) {
    const characterBottom = this.character.y + this.character.height;
    const enemyTop = enemy.y + enemy.offset.top;
    const jumpingDown = this.character.speedY <= 0;
    return characterBottom < enemyTop + 30 && jumpingDown;
  }

  /**
   * Function description
   */
  /**
   * Handles the event
   * @param {MovableObject} enemy - enemy
   */
  handleJumpKill(enemy) {
    enemy.die();
    AudioHub.playOne(AudioHub.HIT_ENEMY);
    this.character.speedY = 25;
    this.character.lastEnemyCollision = new Date().getTime();
  }

  /**
   * Function description
   */
  /**
   * canTakeDamage
   */
  canTakeDamage() {
    return !this.character.isHurt() && 
           (new Date().getTime() - this.character.lastEnemyCollision > 500);
  }

  /**
   * Function description
   */
  /**
   * Handles the event
   * @param {MovableObject} enemy - enemy
   */
  handleCharacterDamage(enemy) {
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
    /**
     * Function description
     */
    /**
     * if
     * @param {*} enemy instanceof Endboss - enemy instanceof Endboss
     */
    if (enemy instanceof Endboss) {
      AudioHub.playOne(AudioHub.BOSS_ATTACK);
    }
  }

  /**
   * Function description
   */
  /**
   * Draws the object on canvas
   */
  draw() {
    if (!this.isGameActive) return;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.drawStatusBars();
    this.drawGameObjects();
    this.scheduleNextFrame();
  }

  /**
   * Function description
   */
  /**
   * Draws the object on canvas
   */
  drawBackground() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Function description
   */
  /**
   * Draws the object on canvas
   */
  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleStatusbar);
    this.addToMap(this.coinStatusbar);
    this.drawBossStatusBar();
  }

  /**
   * Function description
   */
  /**
   * Draws the object on canvas
   */
  drawBossStatusBar() {
    if (this.bossStatusVisible()) {
      const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
      /**
       * Function description
       */
      /**
       * if
       * @param {*} endboss - endboss
       */
      if (endboss) {
        const percentage = endboss.energy / endboss.maxEnergy * 100;
        this.bossStatusbar.setPercentage(percentage);
      }
      this.addToMap(this.bossStatusbar);
    }
  }

  /**
   * Function description
   */
  /**
   * Draws the object on canvas
   */
  drawGameObjects() {
    this.ctx.translate(this.camera_x, 0); 
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Function description
   */
  /**
   * scheduleNextFrame
   */
  scheduleNextFrame() {
    let self = this;
    /**
     * Function description
     */
    /**
     * requestAnimationFrame
     * @param {*} function ( - function (
     */
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Function description
   */
  /**
   * bossStatusVisible
   */
  bossStatusVisible() {
    try {
        const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        /**
         * Function description
         */
        /**
         * if
         * @param {*} endboss - endboss
         */
        if (endboss) {
            return endboss.hadFirstContact === true;
        }
        return false;
    } catch (error) {
        return false;
    }
  }

  /**
   * Function description
   */
  /**
   * Adds an element
   * @param {*} objects - objects
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Function description
   */
  /**
   * Adds an element
   * @param {*} movableObject - movableObject
   */
  addToMap(movableObject) {
    /**
     * Function description
     */
    /**
     * if
     * @param {*} movableObject.otherDirection - movableObject.otherDirection
     */
    if (movableObject.otherDirection) {
      this.flipImage(movableObject);
    }
    movableObject.draw(this.ctx);
    movableObject.drawFrame(this.ctx);

    /**
     * Function description
     */
    /**
     * if
     * @param {*} movableObject.otherDirection - movableObject.otherDirection
     */
    if (movableObject.otherDirection) {
      this.flipImageBack(movableObject);
    }
  }

  /**
   * Function description
   */
  /**
   * Checks the condition
   */
  checkBottleCollisions() {
    this.checkThrownBottleCollisions();
    this.checkBottleCollection();
  }

  /**
   * Function description
   */
  /**
   * Checks the condition
   */
  checkThrownBottleCollisions() {
    this.throwableObjects.forEach((bottle) => {
      if (bottle.hasCollided) return;
      this.level.enemies.forEach((enemy) => {
        this.handleBottleEnemyCollision(bottle, enemy);
      });
    });
  }

  /**
   * Function description
   */
  /**
   * Handles the event
   * @param {ThrowableObject} bottle - bottle
   * @param {MovableObject} enemy - enemy
   */
  handleBottleEnemyCollision(bottle, enemy) {
    try {
      if (bottle && enemy && bottle.isColliding(enemy) && !enemy.isDead() && !bottle.hasCollided) {
        bottle.hasCollided = true;
        this.processBottleHit(bottle, enemy);
      }
    } catch (error) {}
  }

  /**
   * Function description
   */
  /**
   * processBottleHit
   * @param {ThrowableObject} bottle - bottle
   * @param {MovableObject} enemy - enemy
   */
  processBottleHit(bottle, enemy) {
    if (!(enemy instanceof Endboss)) {
      AudioHub.playOne(AudioHub.HIT_ENEMY);
    }
    this.damageEnemy(enemy);
    this.animateBottleSplash(bottle);
  }

  /**
   * Function description
   */
  /**
   * damageEnemy
   * @param {MovableObject} enemy - enemy
   */
  damageEnemy(enemy) {
    /**
     * Function description
     */
    /**
     * if
     * @param {*} enemy instanceof Endboss && typeof enemy.hit - enemy instanceof Endboss && typeof enemy.hit
     */
    if (enemy instanceof Endboss && typeof enemy.hit === 'function') {
      enemy.hit();
      this.updateBossStatusBar(enemy);
    } else if (enemy.die && typeof enemy.die === 'function') {
      enemy.die();
    }
  }

  /**
   * Function description
   */
  /**
   * Updates the state
   * @param {MovableObject} enemy - enemy
   */
  updateBossStatusBar(enemy) {
    /**
     * Function description
     */
    /**
     * if
     * @param {*} this.bossStatusbar - this.bossStatusbar
     */
    if (this.bossStatusbar) {
      const percentage = enemy.energy / enemy.maxEnergy * 100;
      this.bossStatusbar.setPercentage(percentage);
    }
  }

  /**
   * Function description
   */
  /**
   * Animates the object
   * @param {ThrowableObject} bottle - bottle
   */
  animateBottleSplash(bottle) {
    bottle.speed = 0;
    setTimeout(() => {
      /**
       * Function description
       */
      /**
       * if
       * @param {*} bottle.animateSplash && typeof bottle.animateSplash - bottle.animateSplash && typeof bottle.animateSplash
       */
      if (bottle.animateSplash && typeof bottle.animateSplash === 'function') {
        bottle.animateSplash();
      }
      this.removeBottleAfterSplash(bottle);
    }, 100);
  }

  /**
   * Function description
   */
  /**
   * Removes an element
   * @param {ThrowableObject} bottle - bottle
   */
  removeBottleAfterSplash(bottle) {
    setTimeout(() => {
      const index = this.throwableObjects.indexOf(bottle);
      /**
       * Function description
       */
      /**
       * if
       * @param {*} index > -1 - index > -1
       */
      if (index > -1) {
        this.throwableObjects.splice(index, 1);
      }
    }, 300);
  }

  /**
   * Function description
   */
  /**
   * Checks the condition
   */
  checkBottleCollection() {
    /**
     * Function description
     */
    /**
     * for
     * @param {*} let i - let i
     */
    for (let i = this.level.bottles.length - 1; i >= 0; i--) {
      let bottle = this.level.bottles[i];
      if (this.character.isColliding(bottle) && this.character.bottles < 5) {
        this.character.bottles++;
        this.bottleStatusbar.setPercentage(this.character.bottles * 20);
        this.level.bottles.splice(i, 1);
        AudioHub.playOne(AudioHub.COLLECT_BOTTLE);
        break;
      }
    }
  }

  /**
   * Function description
   */
  /**
   * Checks the condition
   */
  checkForDeadChickens() {
    /**
     * Function description
     */
    /**
     * for
     * @param {*} let i - let i
     */
    for (let i = 0; i < this.level.enemies.length; i++) {
      let enemy = this.level.enemies[i];
      
      /**
       * Function description
       */
      /**
       * if
       * @param {*} enemy.deleteNow - enemy.deleteNow
       */
      if (enemy.deleteNow) {
        this.level.enemies.splice(i, 1);
        i--;
      }
    }
  }

  /**
   * Function description
   */
  /**
   * flipImage
   * @param {*} movableObject - movableObject
   */
  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.x = movableObject.x * -1;
  }

  /**
   * Function description
   */
  /**
   * flipImageBack
   * @param {*} movableObject - movableObject
   */
  flipImageBack(movableObject) {
    this.ctx.restore();
    movableObject.x = movableObject.x * -1;
  }

  /**
   * Function description
   */
  /**
   * Checks the condition
   */
  checkCoinCollisions() {
    /**
     * Function description
     */
    /**
     * for
     * @param {*} let i - let i
     */
    for (let i = this.level.coins.length - 1; i >= 0; i--) {
      let coin = this.level.coins[i];
      if (this.character.isColliding(coin)) {
        /**
         * Function description
         */
        /**
         * if
         * @param {*} this.character.coins < this.character.maxCoins - this.character.coins < this.character.maxCoins
         */
        if (this.character.coins < this.character.maxCoins) {
          this.character.coins++;
          this.coinStatusbar.setPercentage(this.character.coins * 20);
          this.level.coins.splice(i, 1);
          AudioHub.playOne(AudioHub.COLLECT_COIN);
        }
        break;
      }
    }
  }

  /**
   * Function description
   */
  /**
   * Checks the condition
   */
  checkGameState() {
    /**
     * Function description
     */
    /**
     * if
     * @param {*} this.character.energy < - this.character.energy <
     */
    if (this.character.energy <= 0 && !gameEnded) {
      this.endGame('game-over');
    }
    
    const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
    /**
     * Function description
     */
    /**
     * if
     * @param {*} endboss && endboss.energy < - endboss && endboss.energy <
     */
    if (endboss && endboss.energy <= 0 && !gameEnded) {
      this.endGame('win');
    }
  }

/**
 * endGame
 * @param {string} result - result
 */
endGame(result) {
  gameEnded = true;
  setTimeout(() => {
    this.stopGame();
    this.playEndGameSequence(result);
  }, 2000);
}

/**
 * Stops the process
 */
stopGame() {
  this.isGameActive = false;
  this.cleanupCharacter();
  this.cleanupEnemies();
  AudioHub.stopAll();
  clearInterval(this.gameInterval);
}

/**
 * cleanupCharacter
 */
cleanupCharacter() {
  /**
   * Function description
   */
  /**
   * if
   * @param {*} this.character - this.character
   */
  if (this.character) {
    this.character.speedY = 0;
    this.character.cleanup();
  }
}

/**
 * cleanupEnemies
 */
cleanupEnemies() {
  /**
   * Function description
   */
  /**
   * if
   * @param {*} this.level && this.level.enemies - this.level && this.level.enemies
   */
  if (this.level && this.level.enemies) {
    this.level.enemies.forEach(enemy => {
      if (enemy.speed) enemy.speed = 0;
      /**
       * Function description
       */
      /**
       * if
       * @param {*} enemy.cleanup && typeof enemy.cleanup - enemy.cleanup && typeof enemy.cleanup
       */
      if (enemy.cleanup && typeof enemy.cleanup === 'function') {
        enemy.cleanup();
      }
    });
  }
}

/**
 * Plays the sound/animation
 * @param {string} result - result
 */
playEndGameSequence(result) {
  setTimeout(() => {
    this.playEndGameSound(result);
    this.showEndGameScreen(result);
  }, 500);
}

/**
 * Plays the sound/animation
 * @param {string} result - result
 */
playEndGameSound(result) {
  /**
   * Function description
   */
  /**
   * if
   * @param {*} !AudioHub.isMuted - !AudioHub.isMuted
   */
  if (!AudioHub.isMuted) {
    /**
     * Function description
     */
    /**
     * if
     * @param {string} result - result
     */
    if (result === 'game-over') {
      AudioHub.playOne(AudioHub.GAME_LOSE_EFFECT);
      setTimeout(() => AudioHub.playOne(AudioHub.GAME_LOSE), 800);
    } else if (result === 'win') {
      AudioHub.playOne(AudioHub.GAME_WIN);
    }
  }
}

/**
 * showEndGameScreen
 * @param {string} result - result
 */
showEndGameScreen(result) {
  setTimeout(() => {
    /**
     * Function description
     */
    /**
     * if
     * @param {string} result - result
     */
    if (result === 'game-over') {
      document.getElementById('game-over-screen').style.display = 'flex';
    } else if (result === 'win') {
      document.getElementById('win-screen').style.display = 'flex';
    }
  }, 1300);
}
}

