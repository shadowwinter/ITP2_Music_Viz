//constructor function to draw fireworks
function Fireworks(selectedCol){
	
    var fireworks = [];
	var p_col;

    //to draw each individual firework
    this.addFirework = function(){

        //random x and y pos for new fireworks
        var f_x = random(width * 0.2, width * 0.8)
        var f_y = random(height * 0.2, height * 0.8)
        
        //colour of each firework as per user's choice
        for(var i=0; i<selectedCol.length;i++){
            p_col=selectedCol[i];
            selectedCol.splice(i,1);

            fireworks.push(new Firework(p_col, f_x, f_y));
        }
    };
 
    //delete old fireworks that has aged
    this.update = function(){
        for(var i=0; i<fireworks.length; i++){
            fireworks[i].draw();
            if(fireworks[i].depleted){
                fireworks.splice(i, 1);
            }
        }
    }


}