//function to draw each individual firework
function Firework(colour,x,y){
   
    var x = x;
    var y = y;

    var particles = [];
    this.depleted = false;

    //to draw each individual particle on the firework
    for(var i=0; i<360; i+=18){
        particles.push(new Particle(x, y, i, 10));
    }

    this.draw = function(){

        fill(colour);
        //only draw number of particles that are pushed into the function when beat is detected
        for(var i=0; i<particles.length; i++){
            particles[i].draw();
        }
        //delete old particles that has aged
        if(particles[0].speed <= 0){
            this.depleted = true;
        }

    }

}