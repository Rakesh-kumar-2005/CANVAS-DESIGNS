let canvas = document.querySelector("canvas");
canvas.style.fontFamily = "serif";
// canvas.style.backgroundColor = 'black';

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

function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = "#1a1a23";
    c.fillRect(0,0,canvas.width,canvas.height);

    if(mouse.x + 100 > canvas.width / 2 - 50 &&
       mouse.x <= canvas.width / 2 - 50 + 100 &&
       mouse.y + 100 >= canvas.height / 2 - 50 &&
       mouse.y <= canvas.height / 2 - 50 + 100)
       {
            console.log("colliding")
       }

    c.fillStyle = "#e86262"
    c.fillRect(mouse.x,mouse.y,100,100);

    c.fillStyle = "#92abea";
    c.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 50,100,100);

}

animate();