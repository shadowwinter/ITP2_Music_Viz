//to draw each indiv particle on a firework
function Particle(x, y, angle, speed){
    var x = x;
    var y = y;
    var angle = angle;
    this.speed = speed;

    this.draw = function(){
        update();

        ellipse(x, y, 10, 10);
    }

    //to determine the movement of each particle, to spread out in a circular shape
    function update(){
        this.speed -= 0.1;
        x += cos(angle) * speed+noise(frameCount)*10;
        y += sin(angle) * speed;
    }

}
