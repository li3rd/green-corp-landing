const app = {
    canvas: document.getElementById('orb-canvas'),
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    dpr: window.devicePixelRatio,
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        Bubble.contains.forEach((elem) => {elem.draw()});
        window.requestAnimationFrame(this.draw.bind(this));
    },
    init() {
        this.ctx = this.canvas.getContext('2d');
        [this.canvas.width, this.canvas.height] = [this.canvas.offsetWidth * this.dpr, this.canvas.offsetHeight * this.dpr];
        this.ctx.scale(this.dpr, this.dpr);
        this.draw();
    }
};
const getRandom = function (max, min = 0) {
    let n = Math.random() * (max - min) + min;
    n = n.toFixed(2);
    return n;
}
const getColor = function () {
    const n = () => Math.ceil(Math.random() * 255);
    return `rgba(${n()}, ${n()}, ${n()}, ${getRandom(1, 1/2)})`;
}
class Bubble {
    constructor(x, y, dx, dy, r, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.r = r;
        this.color = color;
        this.constructor.contains.push(this);
    }
    static create() {
        const r = +getRandom(3, 2);
        const x = +getRandom(app.width);
        const y = +getRandom(app.height);
        const dx = getRandom(3, -3) / getRandom(45, 30);
        const dy = getRandom(20, 1) / getRandom(45, 30);
        const color = getColor();
        new this (x, y, dx, dy, r, color);
    }
    move() {
        this.x -= this.dx;
        this.y -= this.dy;
        if (this.y < 0 || this.x < 0 || this.x > app.width) {
            // Bubble.create();
            this.y = app.height;
        }
    }
    draw() {
        this.move();
        // app.ctx.translate(this.x, this.y);
        app.ctx.beginPath();
        app.ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
        app.ctx.fillStyle = this.color;
        app.ctx.fill();
        // app.ctx.setTransform(app.dpr, 0, 0, app.dpr, 0, 0);
    }
    static contains = [];
}
for (let i = 0; i < 150; i++) {
    Bubble.create();
}
app.init();

