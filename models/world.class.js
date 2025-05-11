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
  bossStatusbar = new BossStatusBar(); // Neue Zeile

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
    setInterval(() => {
     this.checkCollisions();
     this.checkThrowObjects();
     this.checkBottleCollisions();
     this.checkCoinCollisions();
     this.checkForDeadChickens();
    }, 16);
  }
  
  checkThrowObjects() {
    if (this.keyboard.D && this.character.bottles > 0 && !this.character.otherDirection) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.character.bottles--;
      this.bottleStatusbar.setPercentage(this.character.bottles * 20);
      this.keyboard.D = false; // verhindert mehrfaches Auslösen pro Tastendruck
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead()) {
        // Debug-Info
        console.log('Kollision erkannt!', 
                   'Character Y:', this.character.y, 
                   'Character Height:', this.character.height, 
                   'Enemy Y:', enemy.y, 
                   'Enemy Height:', enemy.height,
                   'SpeedY:', this.character.speedY);
                   
        // Verbesserte Bedingung für Aufsprung von oben
        const characterBottom = this.character.y + this.character.height;
        const enemyTop = enemy.y + enemy.offset.top;
        const jumpingDown = this.character.speedY <= 0;
        
        if (characterBottom < enemyTop + 30 && jumpingDown) {
          console.log('Chicken getötet durch Sprung!');
          // VON OBEN: Chicken stirbt
          enemy.die();
          
          // Character springt nach dem Treffen des Chickens wieder leicht hoch
          this.character.speedY = 25;
          
          // Verhindere weitere Kollisionserkennung für kurze Zeit
          this.character.lastEnemyCollision = new Date().getTime();
        } else if (!this.character.isHurt() && 
                  (new Date().getTime() - this.character.lastEnemyCollision > 500)) {
          // Spieler bekommt Schaden
          // Nur Schaden nehmen, wenn nicht bereits verletzt und keine kürzliche Kollision
          console.log('Character bekommt Schaden!');
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0); // Move the canvas to the left by camera_x
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0); // Reset the canvas position
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleStatusbar);
    this.addToMap(this.coinStatusbar);
    
    // Boss-Statusleiste aktualisieren und anzeigen
    if (this.bossStatusVisible()) {
      // HIER IST DIE ÄNDERUNG: Aktualisiere die Statusleiste in jedem Frame
      const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
      if (endboss) {
        const percentage = endboss.energy / endboss.maxEnergy * 100;
        this.bossStatusbar.setPercentage(percentage);
      }
      this.addToMap(this.bossStatusbar);
    }
    
    this.ctx.translate(this.camera_x, 0); // Move the canvas to the left by camera_x
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0); // Reset the canvas position

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  bossStatusVisible() {
    try {
        // Endboss finden
        const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss) {
            // Statusleiste anzeigen, wenn der Character nahe genug ist
            return this.character.x > 2000 || (endboss.hadFirstContact === true);
        }
        return false;
    } catch (error) {
        console.error("Fehler in bossStatusVisible:", error);
        return false; // Im Fehlerfall lieber keine Statusleiste anzeigen
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
    // Für jede geworfene Flasche prüfen
    this.throwableObjects.forEach((bottle, bottleIndex) => {
        // Wenn die Flasche bereits kollidiert ist, nichts tun
        if (bottle.hasCollided) return;
        
        // Für jedes Chicken/Enemy prüfen
        this.level.enemies.forEach((enemy) => {
            try {
                // Wenn die Flasche ein Chicken/Enemy trifft und es noch nicht tot ist
                if (bottle && enemy && bottle.isColliding(enemy) && !enemy.isDead() && !bottle.hasCollided) {
                    // Markiere die Flasche als kollidiert, damit sie nicht mehrmals Schaden verursacht
                    bottle.hasCollided = true;
                    console.log('Flasche trifft Gegner!');
                    
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
                    
                    // Stoppe die Flaschenbewegung und starte Splash-Animation
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
        break;
      }
    }
  }

  checkForDeadChickens() {
    for (let i = 0; i < this.level.enemies.length; i++) {
      let enemy = this.level.enemies[i];
      
      if (enemy.toDelete) {
        this.level.enemies.splice(i, 1);  // Chicken aus dem Array entfernen
        i--;  // Index anpassen, da ein Element entfernt wurde
      }
    }
  }

  flipImage(movableObject) {
    this.ctx.save(); // save the current state of the canvas
    this.ctx.translate(movableObject.width, 0); // move the origin to the right
    this.ctx.scale(-1, 1); // flip the canvas horizontally
    movableObject.x = movableObject.x * -1; // flip the x position
  }

  flipImageBack(movableObject) {
    this.ctx.restore();
    movableObject.x = movableObject.x * -1;
  }

  checkCoinCollisions() {
    for (let i = this.level.coins.length - 1; i >= 0; i--) {
      let coin = this.level.coins[i];
      if (this.character.isColliding(coin)) {
        // Hier eine Prüfung hinzufügen
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
}
