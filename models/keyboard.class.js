/**
 * Creates a new Keyboard.
 * @class
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    /**
     * Function description
     */
    /**
     * Creates a new Keyboard instance
     */
    constructor() {
        this.bindBtsPressEvents();
    }

    /**
     * Function description
     */
    /**
     * bindBtsPressEvents
     */
    bindBtsPressEvents() {
        document.addEventListener("DOMContentLoaded", () => {
            this.bindButton('btnLeft', 'LEFT');
            this.bindButton('btnRight', 'RIGHT');
            this.bindButton('btnJump', 'SPACE');
            this.bindButton('btnThrow', 'D');
        });
    }

    /**
     * Function description
     */
    /**
     * bindButton
     * @param {*} btnId - btnId
     * @param {*} keyProperty - keyProperty
     */
    bindButton(btnId, keyProperty) {
        document.getElementById(btnId)?.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (typeof gameStarted !== 'undefined' && gameStarted && !gameEnded) {
                this[keyProperty] = true;
            }
        });

        document.getElementById(btnId)?.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (typeof gameStarted !== 'undefined' && gameStarted && !gameEnded) {
                this[keyProperty] = false;
            }
        });
    }
}
