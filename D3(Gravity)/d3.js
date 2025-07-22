let canvas = document.querySelector("canvas");
canvas.style.fontFamily = "serif";
canvas.style.backgroundColor = 'black';

var innerHeight = window.innerHeight;
var innerWidth = window.innerWidth;
canvas.height = innerHeight;
canvas.width = innerWidth;
var c = canvas.getContext("2d");

var mouse = {
    x : undefined / 2,
    y : undefined / 2
}

let colors = ['#04e762','#89fc00','#008bf8','#dc0073','#f5b700'];

var gravity = 1;
var friction = .9;

window.addEventListener("mousemove",
    function(event){
        mouse.x = event.clientX;
        mouse.y = event.clientY;
})

window.addEventListener("resize", function(){
    canvas.height = innerHeight;
    canvas.width = innerWidth;

    init();
})

window.addEventListener('click', function(){
    init();
})

function randomIntFromRange(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor(colors){
    return colors[Math.floor(Math.random() * colors.length)];
}

function Ball(x, y, dx, dy, rad){
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.rad = rad;
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.update = function() {
    if(this.y + this.rad + this.dy > canvas.height || this.y - this.rad < 0){
        this.dy = -this.dy * friction;
    }else{
        this.dy += 1;
    }

    if(this.x + this.rad + this.dx > canvas.width || this.x - this.rad < 0){
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
};

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }
}

let ball;
var ballArr;
function init() {
    ballArr = [];
    for(let i = 0; i < 200; i++){
        var r = randomIntFromRange(15,30);
        var x = randomIntFromRange(r,canvas.width-r);
        var y = randomIntFromRange(r,canvas.height-r*4);
        var dx = randomIntFromRange(-2,2);
        var dy = randomIntFromRange(-2,2);
        ballArr.push(new Ball(x,y,dx,dy,r));
    }
}


function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < 100; i++){
        ballArr[i].update();
    }
}

init();
animate();