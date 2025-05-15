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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }
  
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
  
  checkThrowObjects() {
    if (this.keyboard.D && this.character.bottles > 0 && !this.character.otherDirection) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.character.bottles--;
      this.bottleStatusbar.setPercentage(this.character.bottles * 20);
      AudioHub.playOne(AudioHub.THROW_BOTTLE);
      this.keyboard.D = false;
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead()) {
        console.log('Collision erkannt!', 
                   'Character Y:', this.character.y, 
                   'Character Height:', this.character.height, 
                   'Enemy Y:', enemy.y, 
                   'Enemy Height:', enemy.height,
                   'SpeedY:', this.character.speedY);

        const characterBottom = this.character.y + this.character.height;
        const enemyTop = enemy.y + enemy.offset.top;
        const jumpingDown = this.character.speedY <= 0;
        
        if (characterBottom < enemyTop + 30 && jumpingDown) {
          console.log('Chicken getötet durch Sprung!');
          enemy.die();
          AudioHub.playOne(AudioHub.HIT_ENEMY);
          this.character.speedY = 25;
          this.character.lastEnemyCollision = new Date().getTime();
        } else if (!this.character.isHurt() && 
                  (new Date().getTime() - this.character.lastEnemyCollision > 500)) {
          console.log('Character bekommt Schaden!');
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
          if (enemy instanceof Endboss) {
            AudioHub.playOne(AudioHub.BOSS_ATTACK);
          }
        }
      }
    });
  }

  draw() {
    if (!this.isGameActive) return;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleStatusbar);
    this.addToMap(this.coinStatusbar);

    if (this.bossStatusVisible()) {
      const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
      if (endboss) {
        const percentage = endboss.energy / endboss.maxEnergy * 100;
        this.bossStatusbar.setPercentage(percentage);
      }
      this.addToMap(this.bossStatusbar);
    }
    
    this.ctx.translate(this.camera_x, 0); 
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0); 

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  bossStatusVisible() {
    try {
        const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss) {
            return this.character.x > 2000 || (endboss.hadFirstContact === true);
        }
        return false;
    } catch (error) {
        console.error("Fehler in bossStatusVisible:", error);
        return false;
    }
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(movableObject) {
    if (movableObject.otherDirection) {
      this.flipImage(movableObject);
    }
    movableObject.draw(this.ctx);
    movableObject.drawFrame(this.ctx);

    if (movableObject.otherDirection) {
      this.flipImageBack(movableObject);
    }
  }

  checkBottleCollisions() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
        if (bottle.hasCollided) return;
        this.level.enemies.forEach((enemy) => {
            try {
                if (bottle && enemy && bottle.isColliding(enemy) && !enemy.isDead() && !bottle.hasCollided) {
                    bottle.hasCollided = true;
                    console.log('Flasche trifft Gegner!');
                    
                    if (!(enemy instanceof Endboss)) {
                        AudioHub.playOne(AudioHub.HIT_ENEMY);
                    }
                    
                    if (enemy instanceof Endboss && typeof enemy.hit === 'function') {
                        console.log('→ ENDBOSS HIT BEFORE:', enemy.energy);
                        enemy.hit();
                        console.log('→ ENDBOSS HIT AFTER:', enemy.energy);

                        if (this.bossStatusbar) {
                            const percentage = enemy.energy / enemy.maxEnergy * 100;
                            console.log('→ STATUSBAR SET TO:', percentage);
                            this.bossStatusbar.setPercentage(percentage);
                        }
                    } else if (enemy.die && typeof enemy.die === 'function') {
                        enemy.die();
                    }
                    
                    bottle.speed = 0;
                    setTimeout(() => {
                        if (bottle.animateSplash && typeof bottle.animateSplash === 'function') {
                            bottle.animateSplash();
                        }
                        
                        setTimeout(() => {
                            const index = this.throwableObjects.indexOf(bottle);
                            if (index > -1) {
                                this.throwableObjects.splice(index, 1);
                            }
                        }, 300);
                    }, 100);
                }
            } catch (error) {
                console.error("Fehler bei Flaschen-Kollision:", error);
            }
        });
    });
    
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

  checkForDeadChickens() {
    for (let i = 0; i < this.level.enemies.length; i++) {
      let enemy = this.level.enemies[i];
      
      if (enemy.deleteNow) {
        this.level.enemies.splice(i, 1);
        i--;
      }
    }
  }

  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.x = movableObject.x * -1;
  }

  flipImageBack(movableObject) {
    this.ctx.restore();
    movableObject.x = movableObject.x * -1;
  }

  checkCoinCollisions() {
    for (let i = this.level.coins.length - 1; i >= 0; i--) {
      let coin = this.level.coins[i];
      if (this.character.isColliding(coin)) {
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

  checkGameState() {
    if (this.character.energy <= 0 && !gameEnded) {
      this.endGame('game-over');
    }
    
    const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
    if (endboss && endboss.energy <= 0 && !gameEnded) {
      this.endGame('win');
    }
  }

endGame(result) {
  gameEnded = true;

  if (!AudioHub.isMuted) {
    if (result === 'game-over') {
      AudioHub.playOne(AudioHub.CHARACTER_HURT);
    } else if (result === 'win') {
      AudioHub.playOne(AudioHub.BOSS_DEAD);
    }
  }
  
  setTimeout(() => {
    this.isGameActive = false;
    
    if (this.character) {
      this.character.speedY = 0;
    }
    
    if (this.level && this.level.enemies) {
      this.level.enemies.forEach(enemy => {
        if (enemy.speed) enemy.speed = 0;
      });
    }
    
    AudioHub.stopAll();
    
    setTimeout(() => {
      if (result === 'game-over') {
        document.getElementById('game-over-screen').style.display = 'flex';
      } else if (result === 'win') {
        document.getElementById('win-screen').style.display = 'flex';
      }
    }, 1000);
    
    clearInterval(this.gameInterval);
  }, 2000);
}
}
