/**
 * Creates a new StatusBar.
 * @class
 */
class StatusBar extends DrawableObject {
  IMAGES = [
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  percentage = 100;

 /**
  * Function description
  */
 /**
  * Creates a new StatusBar instance
  */
 constructor() {
  super();
  this.loadImages(this.IMAGES);        
  this.setPercentage(100);             
  this.x = 20;
  this.y = 0;
  this.width = 200;
  this.height = 60;
}


  /**
   * Function description
   */
  /**
   * Sets the value
   * @param {number} percentage - percentage
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Function description
   */
  /**
   * resolveImageIndex
   */
  resolveImageIndex() {
    /**
     * Function description
     */
    /**
     * if
     * @param {*} this.percentage - this.percentage
     */
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}

