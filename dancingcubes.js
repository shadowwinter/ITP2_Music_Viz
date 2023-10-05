//constructor function to draw dancing cubes
function DancingCubes() {
	//vis name
	this.name = "Dancing Cube Game";

	var gui;
	var cubes = [];
	var angle = 0; 
	var charX = 0;
	var diff = 0;
	var isRight=true;
	var isUp=false;
	var colSelect=true;
	//colours for the gui parameters
	var colours={
		pinkCol : [[255,102,205], [234,82,178], [213,62,150], [192,41,123], [171,21,95], [150,1,68]],
		yellowCol : [[255,223,1], [237,203,1], [219,183,1], [201,164,1], [184,144,1]], 
		greenCol : [[209,240,189], [189,217,147], [118,184,120], [87,150,107], [119,176,118]], 
		blueCol : [[179,228,232], [169,209,232], [155,179,235], [100,132,213], [128,159,232]], 
		purpleCol : [[203,113,166], [155,70,151], [122,49,140], [77,34,131], [35,21,102]], 
		sunsetCol : [[253,202,83], [245,103,37], [192,62,71], [143,49,99], [80,44,94]],
		pastelCol : [[243,172,202], [251,231,205], [246,189,196], [169,143,211], [126,199,185], [246,235,170]], 
		chillCol : [[198,135,69], [233,187,96], [250,222,177], [66,139,151], [26,109,128], [26,59,96]],
		oceanCol : [[7,44,99], [4,123,190], [19,194,235], [111,232,226], [177,240,217], [115,221,187]]
	}
	
	//passing in parameters for gui function
	this.params={
		sphere_Colour:[102,41,128],
		blocks_Colour_Scheme:['Random', 'Pink','Yellow','Green','Blue','Purple', 'Sunset', 'Pastel','Chill', 'Ocean'],
		character_Shape:['Sphere','Cube','Donut'],
		character_Transparency:false
	}
	
	//creates gui
	this.guisetup = function(){
		gui = createGui("Dancing Cubes");
		gui.addObject(this.params);
		gui.show();
	}
	
	//loads the gui, sets whether to show current gui or not depending on if the vis is selected or not
	this.guisetup();

    this.onload = function(){
    	gui.show();
    }
    this.unload = function(){
    	gui.hide();
    }

	this.draw = function() {
		push();
		angleMode(RADIANS);
		ambientLight(255);

		//array of random colours for the randomCol palette
		var randomCol=[];
		for(var i=0; i<40;i++){
			randomCol.push([random(0,255),random(0,255),random(0,255)]);
		}

		//to draw the blocks to already be on screen when loaded
		if(colSelect){
			for(var i=0; i<12; i++){
				switch(this.params.blocks_Colour_Scheme){
					
						case 'Random':
						cubes.push({z:(-3000 + (400*i)), c1:random(randomCol), c2:random(randomCol), c3:random(randomCol)});
						colSelect=false;
						break;				
				}
			}

		}
		
		//adds new blocks to the starting point at every 30 frames, depending on the chosen colour
		if(frameCount%30==0 && isPlaying){
			switch(this.params.blocks_Colour_Scheme){
				
				case 'Pink':
					cubes.push({z:(-3000), c1:random(colours.pinkCol), c2:random(colours.pinkCol), c3:random(colours.pinkCol)});
					break;
				
				case 'Yellow':
					cubes.push({z:(-3000), c1:random(colours.yellowCol), c2:random(colours.yellowCol), c3:random(colours.yellowCol)});
					break;
					
				case 'Green':
					cubes.push({z:(-3000), c1:random(colours.greenCol), c2:random(colours.greenCol), c3:random(colours.greenCol)});
					break;
	
				case 'Blue':
					cubes.push({z:(-3000), c1:random(colours.blueCol), c2:random(colours.blueCol), c3:random(colours.blueCol)});
					break;
	
				case 'Purple':
					cubes.push({z:(-3000), c1:random(colours.purpleCol), c2:random(colours.purpleCol), c3:random(colours.purpleCol)});
					break;
	
				case 'Sunset':
					cubes.push({z:(-3000), c1:random(colours.sunsetCol), c2:random(colours.sunsetCol), c3:random(colours.sunsetCol)});
					break;
	
				case 'Pastel':
					cubes.push({z:(-3000), c1:random(colours.pastelCol), c2:random(colours.pastelCol), c3:random(colours.pastelCol)});
					break;
	
				case 'Chill':
					cubes.push({z:(-3000), c1:random(colours.chillCol), c2:random(colours.chillCol), c3:random(colours.chillCol)});
					break;
	
				case 'Ocean':
					cubes.push({z:(-3000), c1:random(colours.oceanCol), c2:random(colours.oceanCol), c3:random(colours.oceanCol)});
					break;				
	
				case 'Random':
					cubes.push({z:(-3000), c1:random(randomCol), c2:random(randomCol), c3:random(randomCol)});
					break;				
			}

		}

		//move the blocks towards user when music is playing
		for(var i=0; i<cubes.length; i++){
			if(isPlaying){
				cubes[i].z +=15;
			}
			this.drawCubes(cubes[i].z,cubes[i].c1,cubes[i].c2,cubes[i].c3);
		}
		
		this.drawChar();

		pop();
    }

	//draws each row of cubes
	this.drawCubes = function(boxZ,c1,c2,c3){
		
		//orbitControl();
		stroke(255);
	
		//center cube
		push();
		ambientMaterial(c1);
		translate(0,150,boxZ);
		rotateX(-4.9);
		box(150,200,50);
		pop();

		//right cube
		push();
		ambientMaterial(c2);
		translate(225,150,boxZ);
		rotateX(-4.9);
		rotateZ(-0.1);
		box(150,200,50);
		pop();

		//left cube
		push();
		ambientMaterial(c3);
		translate(-225,150,boxZ);
		rotateX(-4.9);
		rotateZ(0.1);
		box(150,200,50);
		pop();
	}

	//draws character 
	this.drawChar = function(){
		push();
	
		//char movement up and down
		var charY = 90 - diff;
	
		if(isPlaying){
			//moves left and right by jumping
			if(isRight){
				charX+=4;
			}
			if(!isRight){
				charX-=4;
			}
			if(isUp){
				diff+=12;
			}
			if(!isUp){
				diff-=12;
			}
			//decides on moving left or right by random after going to the center cube
			if(charX==0){
				if(Math.random()<=0.5){
					isRight=false;
					isUp=true;
				}
				else{
					isRight=true;
					isUp=true;
				}
			}
			//moves back in the opposite direction if ball is at the two ends
			if(charX<-200 || charX>200){
				isRight=!isRight;
			}
			//jumping mechanics for the ball to come back down after a certain height
			if(diff==300){
				isUp=false;
			}
			//bounces the ball back up after landing on the blocks
			if(charY==90){
				isUp = true;
			}
		}
			
		//lets the char fall back down if music stops
		if(!isPlaying){
			//falls down
			if(charY<90){
				diff-=6;
			}
			//lets the char fall either left or right onto the cube depending on char's current location
			if(-175<charX && charX<-100){
				charX-=1;
			}
			if(-100<charX && charX<-25){
				charX+=1;
			}
			if(25<charX && charX<100){
				charX-=1;
			}
			if(100<charX && charX<175){
				charX+=1;
			}
		}

		//drawing of actual character

		//deciding fill depending on selection
		if(!this.params.character_Transparency){
			ambientMaterial(this.params.sphere_Colour);
		}
		else{
			noFill();
		}
		strokeWeight(2);
		//char location
		translate(charX,charY,-420);
		//rotating of char, to better show that it is a 3d shape
		if(isPlaying){
			rotateX(angle);
			rotateY(angle*0.7);
			rotateZ(angle*1.2);
		}

		//changes shape of character based on selection
		switch(this.params.character_Shape){
			case 'Sphere':
				sphere(50);
				break;

			case 'Cube':
				box(70,70,70);
				break;

			case 'Donut':
				charY=charY-10;
				torus(60,18);
				break;
		}
		
		pop();

		//to enable rotation
		angle+=0.01;
	}

}