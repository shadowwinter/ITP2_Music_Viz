//constructor function to draw ridge plots
function RidgePlots() {
	//vis name
	this.name = "Ridge Plots";

    var gui;
    var output = []; 
    var speed = 1;
    
    //resizes along with the window
    this.resize = function(){
        this.startX = width/5;
        this.endY = height/5;
        this.startY = height - this.endY;
        this.spectrumWidth = (width/5)*3;
    }

    //passing in parameters for gui function
	this.params={
		colour:[197,196,140],
        
        left_Scale:0.25,
        left_ScaleMin:0,
        left_ScaleMax:0.5,
        left_ScaleStep:0.01,

        left_Scale_Height:5,
        left_Scale_HeightMin:1,
        left_Scale_HeightMax:100,

        right_Scale:0.75,
        right_ScaleMin:0.5,
        right_ScaleMax:1,
        right_ScaleStep:0.01,

        right_Scale_Height:5,
        right_Scale_HeightMin:1,
        right_Scale_HeightMax:100,

        middle_Scale_Height:250,
        middle_Scale_HeightMin:100,
        middle_Scale_HeightMax:700,

        line_Frequency:20,
        line_FrequencyMin:10,
        line_FrequencyMax:40
	}
    
    //creates gui
	this.guisetup = function(){
		gui = createGui("Ridge Plots");
		gui.addObject(this.params);
		gui.hide();
		controls.settingDisplayed = false;
	}
	
    //loads the gui, sets whether to show current gui or not depending on if the vis is selected or not
	this.guisetup();

    this.onload = function(){
    	gui.show();
    }
    this.unload = function(){
    	gui.hide();
    }

	//draw the ridge plots to the screen
	this.draw = function() {
           
        push();
		translate(-width/2, -height/2);
        
        this.resize();

        //configuring the lines to be drawn
        this.ridgeLines(this.startX, this.endY, this.startY, this.spectrumWidth);
       
        noFill();
        strokeWeight(2);
        
        //for drawing the actual lines
        for (var i=0; i<output.length; i++){
            
            var o = output[i];
            stroke(this.params.colour);

            beginShape();
            for (var j=0; j<o.length; j++){
                //to move upwards automatically
                o[j].y-=speed;
                vertex(o[j].x, o[j].y,-50,100,100);
            }
            endShape();

            //remove very first line after it has reached certain height
            if(o[0].y<this.endY){
                output.splice(i,1);
            }
            
        }
        
		pop();
    
};

    this.ridgeLines = function(startX, endY, startY, spectrumWidth){

        var w = fourier.waveform();
        var output_wave=[];
        
        //how spread out the different points are on the y axis, the smaller the value, the closer the points
        var leftScale = this.params.left_Scale_Height;
        var rightScale = this.params.right_Scale_Height;
        var bigScale = this.params.middle_Scale_Height;

        //at how many frame counts to add another line
        if(frameCount%this.params.line_Frequency == 0){   
            for(var i=0; i<w.length; i++){
                //how spread out the different points are on the x axis, the smaller the value, the closer the points
                if(i%12 == 0){
                    var x = map(i, 0, 1024, startX, startX+spectrumWidth);
                    //scale the changes on the left to be smaller
                    if(i < 1024*this.params.left_Scale ){
                        var y = map(w[i], -1, 1, -leftScale, leftScale);
                        output_wave.push({x: x, y: startY+y});
                    } 
                    //scale the changes on the right to be smaller
                    else if( i > 1024*this.params.right_Scale){
                        var y = map(w[i], -1, 1, -rightScale, rightScale);
                        output_wave.push({x: x, y: startY+y});
                    } 
                    //scale the changes in the middle portion to be more extreme, noticeable
                    else{
                        var y = map(w[i], -1, 1, -bigScale, bigScale);
                        output_wave.push({x: x, y: startY+y});
                    }
                }
            }
            output.push(output_wave);
        }
        return output;
    }

    
}