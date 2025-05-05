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
    }, 50);
  }
  
  checkThrowObjects() {
    if (this.keyboard.D && this.character.bottles > 0) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.character.bottles--;
      this.bottleStatusbar.setPercentage(this.character.bottles * 20);
      this.keyboard.D = false; // verhindert mehrfaches Auslösen pro Tastendruck
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
       this.character.hit();
       this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0); // Move the canvas to the left by camera_x
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0); // Reset the canvas position
    this.addToMap(this.statusBar)
    this.addToMap(this.bottleStatusbar);
    this.ctx.translate(this.camera_x, 0); // Move the canvas to the left by camera_x
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0); // Reset the canvas position

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
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
}
