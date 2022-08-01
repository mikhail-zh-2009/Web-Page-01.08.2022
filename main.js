const cv = document.getElementById('cv');
const ctx = cv.getContext('2d');
cv.width  = window.innerWidth;
cv.height = window.innerHeight;

var bubbles = [];

class bubble {
    constructor(x, y, max_radius) {
        this.x          = x;
        this.y          = y;
        this.radius     = 0;
        this.max_radius = max_radius;
        this.color = '#' + generate_random_letter(3);
    }
    bubble_draw() {
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }
    bubble_main() {
        ctx.beginPath();
        ctx.fillStyle = this.color + Math.round(((this.max_radius - this.radius) / this.max_radius * 15)).toString(16);
        this.bubble_draw();
        this.radius += 1;
    }
}

function generate_random_letter(num) {
    var str = '';
    for(var i = 0; i < num; i++) {
        str += Math.round(Math.random() * 15).toString(16);
    }
    return str;
}

function generate_bubble() {
    bubbles.push(new bubble(Math.random() * cv.width, Math.random() * cv.height, Math.random() * 50 + 50));
}

function start() {
    for(var i = 0; i < Math.round(Math.random() * 10 + 5); i++) {
        generate_bubble();
    }
}

start();

function main() {
    cv.width  = window.innerWidth;
    cv.height = window.innerHeight;
    for(var i in bubbles) {
        bubbles[i].bubble_main();
        if(bubbles[i].radius >= bubbles[i].max_radius) {
            bubbles.splice(i, 1);
            generate_bubble();
        }
    }
}
setInterval(main, 10);
