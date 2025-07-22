let canvas = document.querySelector("canvas");
canvas.style.fontFamily = "serif";
canvas.style.backgroundColor = 'black';

var innerHeight = window.outerHeight;
var innerWidth = window.outerWidth;
canvas.height = innerHeight;
canvas.width = innerWidth;
var c = canvas.getContext("2d");

var mouse = {
    x : undefined / 2,
    y : undefined / 2
}

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

let colors = ['#04e762','#89fc00','#008bf8','#dc0073','#f5b700'];

function randomIntFromRange(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor(colors){
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1,y1,x2,y2){
    this.xDistance = x2 - x1;
    this.yDistance = y2 - y1;

    return Math.sqrt((this.xDistance ** 2) + (this.yDistance ** 2))
}

function resolveCollision(particle,otherParticle){
    const xVelocityDiff =  particle.velocity.x - otherParticle.velocity.x;
    const  yVelocityDiff =  particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    if(xVelocityDiff * xDist + yVelocityDiff * yDist >= 0){

        let angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        const u1 = rotate(particle.velocity,angle);
        const u2 = rotate(otherParticle.velocity,angle);

        const v1 = { x : (u1.x * (m1 - m2) + u2.x * 2 * m2) / (m1 + m2), y : u1.y };
        const v2 = { x : (u2.x * (m1 - m2) + u1.x * 2 * m2) / (m1 + m2), y : u2.y };

        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal2.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;

    }
}

function rotate(velocity,angle){
    const rotatedVelocities = {
        x : velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y : velocity.x * Math.sin(angle) - velocity.y * Math.cos(angle)
    };
    return rotatedVelocities;
}

function Particle(x, y, rad,color){
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.color = color;
    this.mass = 1;
    this.opacity = 0;
    this.velocity = {
        x: Math.random() * 2,
        y: Math.random() * 2
    }

    this.update = (particles) => {
        this.draw();

        for(let i = 0; i < particles.length; i++){
            if(this === particles[i]) continue;

            if(distance(this.x,this.y,particles[i].x,particles[i].y) - this.rad * 2 < 0){
                resolveCollision(this,particles[i]);
            }
        }

        if(this.x + this.rad >= canvas.width || this.x - this.rad <= 0){
            this.velocity.x = this.velocity.x * -1;
        }

        if(this.y + this.rad >= canvas.height || this.y - this.rad <= 0){
            this.velocity.y = this.velocity.y * -1;
        }

        if(distance(mouse.x,mouse.y,this.x,this.y) < 120 && this.opacity < .2){
            this.opacity += .02;
        }
        else if(this.opacity > 0){
            this.opacity -= .02;

            this.opacity = Math.max(0,this.opacity);
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }


    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI*2,false);
        c.save();
        c.globalAlpha = this.opacity;
        c.fillStyle = this.color;
        c.fill();
        c.restore();
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    }
}

let particles;

function init(){
    particles = [];

    for(let i=0; i<200; i++){
        const rad = 15;
        let x = randomIntFromRange(rad,canvas.width-rad);
        let y = randomIntFromRange(rad,canvas.height-rad);
        const color = randomColor(colors);

        if(i !== 0){
            for(let j=0; j<particles.length; j++){
                if(distance(x,y,particles[j].x,particles[j].y) - rad * 2 < 0){
                    x = randomIntFromRange(rad,canvas.width-rad);
                    y = randomIntFromRange(rad,canvas.height-rad);

                    j = -1;
                }
            }
        }
        particles.push(new Particle(x,y,rad,color));
    }
}

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < particles.length; i++){
        particles[i].update(particles);
    }


}
init();
animate();