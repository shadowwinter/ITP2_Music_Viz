//inspiration for beat detection comes from
//https://archive.gamedev.net/archive/reference/programming/features/beatdetection/index.html

//main file to call other firework constructors
function FireworksMain(){

	//vis name
	this.name = "Fireworks";

    frameRate(60);
	
	var gui;
	var randomCol=[];
	var selectedCol=[];

	//call the function to check when to draw firework
	var beatDetect = new BeatDetect();
	//draw fireworks with user's selected colour
	var fireworks = new Fireworks(selectedCol);

	//colours for the gui parameters
    var colours={
		pinkCol : [[255,102,205], [234,82,178], [213,62,150], [192,41,123], [171,21,95], [150,1,68]],
		yellowCol : [[255,223,1], [237,203,1], [219,183,1], [201,164,1], [184,144,1]], 
		greenCol : [[209,240,189], [189,217,147], [118,184,120], [87,150,107], [119,176,118]], 
		blueCol : [[179,228,232], [169,209,232], [155,179,235], [100,132,213], [128,159,232]], 
		purpleCol : [[128,18,128], [86,20,117], [82,41,146], [106,53,157], [123,83,174]], 
		sunsetCol : [[253,202,83], [245,103,37], [192,62,71], [143,49,99], [80,44,94]],
		pastelCol : [[243,172,202], [251,231,205], [246,189,196], [169,143,211], [126,199,185], [246,235,170]], 
		chillCol : [[198,135,69], [233,187,96], [250,222,177], [66,139,151], [26,109,128], [26,59,96]],
		oceanCol : [[7,44,99], [4,123,190], [19,194,235], [111,232,226], [177,240,217], [115,221,187]]
	}

	//passing in parameters for gui function
	this.params={
		colour_Scheme:['Random', 'Pink','Yellow','Green','Blue','Purple', 'Sunset', 'Pastel','Chill', 'Ocean'],
		sensitivity:9,
		sensitivityMin:0,
		sensitivityMax:21,
		sensitivityStep:3
 	}

	//creates gui
	this.guisetup = function(){
		gui = createGui("Fireworks");
		gui.addObject(this.params);
		gui.hide();
	}
	
	//loads the gui, sets whether to show current gui or not depending on if the vis is selected or not
	this.guisetup();

    this.onload = function(){
    	gui.show();
    }
    this.unload = function(){
    	gui.hide();
    }

	this.draw = function(){
		push();
        translate(-width/2, -height/2);
		
        angleMode(DEGREES);
        var spectrum = fourier.analyze();
        fireworks.update();

		//lets user choose colour of new firework
		this.chooseColour();
		
		//add new firework only when beat is detected
        if(beatDetect.detectBeat(spectrum, this.params.sensitivity)){
            fireworks.addFirework();
        }

		pop();
    }

	this.chooseColour = function(){
		
		//array of random colours for the randomCol palette
		for(var i=0; i<40;i++){
			randomCol.push([random(0,255),random(0,255),random(0,255)]);
		}
		//pushes selected colour into the array to be used to draw new fireworks
		switch(this.params.colour_Scheme){	
			case 'Pink':
				selectedCol.push(random(colours.pinkCol));
				break;
			
			case 'Yellow':
				selectedCol.push(random(colours.yellowCol));
				break;
				
			case 'Green':
				selectedCol.push(random(colours.greenCol));
				break;

			case 'Blue':
				selectedCol.push(random(colours.blueCol));
				break;

			case 'Purple':
				selectedCol.push(random(colours.purpleCol));
				break;

			case 'Sunset':
				selectedCol.push(random(colours.sunsetCol));
				break;

			case 'Pastel':
				selectedCol.push(random(colours.pastelCol));
				break;

			case 'Chill':
				selectedCol.push(random(colours.chillCol));
				break;

			case 'Ocean':
				selectedCol.push(random(colours.oceanCol));
				break;

			case 'Random':
				selectedCol.push(random(randomCol));
				break;
		}
	}
}



