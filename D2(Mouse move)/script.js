let canvas = document.querySelector("canvas");
canvas.style.backgroundColor = "black";

var innerHeight = window.innerHeight;
var innerWidth = window.innerWidth;
canvas.height = innerHeight;
canvas.width = innerWidth;
var c = canvas.getContext("2d");


let colorArr = ['#04e762','#89fc00','#008bf8','#dc0073','#f5b700'];

var mouse = {
    x : undefined,
    y : undefined
}
var maxRadius = 50;
var minRadius = 2;


window.addEventListener("mousemove",
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
})

window.addEventListener("resize", function(){
    canvas.height = innerHeight;
    canvas.width = innerWidth;

    init();
})

function Circle(x,y,dx,dy,rad){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.minRadius = rad;
    this.color = colorArr[Math.floor(Math.random() * colorArr.length)];

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.rad,0,Math.PI*2,false);
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
    }
    this.update = function(){
        if(this.x + this.rad > innerWidth || this.x - this.rad < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.rad > innerHeight || this.y - this.rad < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // interaction

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if(this.rad  < maxRadius)
                this.rad += 1;
        }else if(this.rad > this.minRadius){
            this.rad -= 1;
        }

        this.draw();
    }
}

var circleArr = [];

function init(){

    circleArr = [];

    for(var i = 0; i < 500; i++){

        var x = Math.random() * (innerWidth - rad * 2) + rad;
        var y = Math.random() * (innerHeight - rad * 2) + rad;
        var dx = (Math.random() - .5) * 2;
        var dy = (Math.random() - .5) * 2;
        var rad = Math.random() * 3 + 1;
        circleArr.push(new Circle(x,y,dx,dy,rad));
    }
}

for(var i = 0; i < 1000; i++){

    var x = Math.random() * (innerWidth - rad * 2) + rad;
    var y = Math.random() * (innerHeight - rad * 2) + rad;
    var dx = (Math.random() - .5) * 2;
    var dy = (Math.random() - .5) * 2;
    var rad = Math.random() * 3 + 1;
    circleArr.push(new Circle(x,y,dx,dy,rad));
}


console.log(circleArr)

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for(let j = 0 ; j < circleArr.length; j++){
        circleArr[j].update();
    }

}

animate();