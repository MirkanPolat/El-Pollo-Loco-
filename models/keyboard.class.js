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
            document.getElementById('btnLeft')?.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.LEFT = true;
            });

            document.getElementById('btnLeft')?.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.LEFT = false;
            });

            document.getElementById('btnRight')?.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.RIGHT = true;
            });

            document.getElementById('btnRight')?.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.RIGHT = false;
            });

            document.getElementById('btnJump')?.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.SPACE = true;
            });

            document.getElementById('btnJump')?.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.SPACE = false;
            });

            document.getElementById('btnThrow')?.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.D = true;
            });

            document.getElementById('btnThrow')?.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.D = false;
            });
        });
    }
}