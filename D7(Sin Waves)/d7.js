import * as dat from 'dat.gui';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const gui = new dat.GUI();

const wave = {
    y : 304,
    length : 0.01,
    amplitude : 100,
    frequency : 0.01
}

gui.add('y',0,304);

const strokeColor = {
    h : 200, s : 50, l : 50
}

let backgroundColor = {
    r : 0, g : 0, b : 12, a : 0.01
}

let increment = wave.frequency;
function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`;
    c.fillRect(0,0,canvas.width,canvas.height);

    c.beginPath();
    c.moveTo(0,canvas.height / 2);

    for(let i = 0; i < canvas.width; i++){
        c.lineTo(i,wave.y + ((Math.sin(i * wave.length + increment) * wave.amplitude) / i) * 100);

    }
    c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))},${strokeColor.s}%,${strokeColor.l}%)`;
    c.stroke();

    increment += wave.frequency

}

animate();