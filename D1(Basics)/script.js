console.log('hello');
let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.backgroundColor = "black";

var innerHeight = window.innerHeight;
var innerWidth = window.innerWidth;
var c = canvas.getContext("2d");

// quadrilaterals
// c.fillStyle = "green";
// c.fillRect(100,100,100,100);
// c.fillStyle = "red";
// c.fillRect(500,100,100,100);


//lines
// c.beginPath();
// c.moveTo(345, 101);
// c.lineTo(567, 456);
// c.lineTo(100, 100);
// c.strokeStyle = "white";
// c.stroke();

// circles
let arr = ['red','blue','green','yellow','chocolate','pink','cyan','purple'];

function Circle(x,y,dx,dy,rad,color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.color = color;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.rad,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
    }
    this.update = function(){
        if(this.x + this.rad > innerWidth || this.x - this.rad < 0){
            this.dx = -this.dx;
            this.color = arr[Math.floor(Math.random() * arr.length-1)];
            // c.fill();
        }
        if(this.y + this.rad > innerHeight || this.y - this.rad < 0){
            this.dy = -this.dy;
            this.color = arr[Math.floor(Math.random() * arr.length-1)];
            // c.fill();
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

var circleArr = [];

function init(){
    circleArr = [];

    for(var i = 0; i < 100; i++){

        var x = Math.random() * (innerWidth - rad * 2) + rad;
        var y = Math.random() * (innerHeight - rad * 2) + rad;
        var dx = (Math.random() - .5) * 8;
        var dy = (Math.random() - .5) * 8;
        var rad = 30;
        var color = arr[Math.floor(Math.random() * arr.length-1)];
        circleArr.push(new Circle(x,y,dx,dy,rad,color));

    }
}

console.log(circleArr)

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for(let j = 0 ; j < circleArr.length; j++){
        circleArr[j].update();
    }

}

window.addEventListener('click', function(){
    init();
})

init();
animate();