class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    constructor() {
        this.bindBtsPressEvents();
    }

    bindBtsPressEvents() {
        document.addEventListener("DOMContentLoaded", () => {
            this.bindButton('btnLeft', 'LEFT');
            this.bindButton('btnRight', 'RIGHT');
            this.bindButton('btnJump', 'SPACE');
            this.bindButton('btnThrow', 'D');
        });
    }

    bindButton(btnId, keyProperty) {
        document.getElementById(btnId)?.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this[keyProperty] = true;
        });

        document.getElementById(btnId)?.addEventListener('touchend', (e) => {
            e.preventDefault();
            this[keyProperty] = false;
        });
    }
}