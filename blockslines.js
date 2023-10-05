//pentagon and star drawing function inspiration from https://github.com/bitcraftlab/p5.gui/blob/master/examples/quicksettings-1/sketch.js 
//cuboid structure inspiration from https://towardsdatascience.com/bringing-songs-to-life-through-music-visualization-8beee9573b7b  

//constructor function to draw blocks and lines
function BlocksLines() {
	//vis name
	this.name = "Blocks and Lines";
	
	var gui;

	var prog = 0;
	var rot = 0; 
	var ringRadius = height/3.0;

	//passing in parameters for gui function
	this.params={
		line_Length:0.01,
		line_LengthMin:0.001,
		line_LengthMax:0.3,
		line_LengthStep:0.001,

		line_Energy:['Mid', 'Treble', 'Bass', 'Low Mid', 'High Mid'],

		line_Sensitivity:40,
		line_SensitivityMin:10,
		line_SensitivityMax:180,

		line_Colour:[200,255,0],

		number_Of_Blocks:15,
		number_Of_BlocksMin:4,
		number_Of_BlocksMax:20,

		block_Size:40,
		block_SizeMin:25,
		block_SizeMax:100,		

		block_Energy:['Bass', 'Treble', 'Low Mid', 'Mid', 'High Mid'],

		block_Rotate_Sensitivity:130,
		block_Rotate_SensitivityMin:10,
		block_Rotate_SensitivityMax:280,
		block_Rotate_SensitivityStep:5,

		block_Colour:[100,115,215],
		
		block_Shape:['Star', 'Square', 'Circle', 'Triangle', 'Pentagon']
	}
	
	//creates gui
	this.guisetup = function(){
		gui = createGui("Blocks and Lines");
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

	this.draw = function() {
		clear();
		push();
		background(0);

		angleMode(RADIANS);

		//retreive energy values
		var a = fourier.analyze();
		var t = fourier.getEnergy("treble");
		var b = fourier.getEnergy("bass");
		var lm = fourier.getEnergy("lowMid");	
		var m = fourier.getEnergy("mid");	
		var hm = fourier.getEnergy("highMid");	

		//calling to draw blocks
		switch(this.params.block_Energy){
			case 'Treble':
				this.rotatingBlocks(t);
				break;

			case 'Bass':
				this.rotatingBlocks(b);
				break;

			case 'Low Mid':
				this.rotatingBlocks(lm);
				break;

			case 'Mid':
				this.rotatingBlocks(m);
				break;

			case 'High Mid':
				this.rotatingBlocks(hm);
				break;
		}
		//calling to draw squiggly line
		switch(this.params.line_Energy){
			case 'Treble':
				this.squigglyLines(t);
				break;

			case 'Bass':
				this.squigglyLines(b);
				break;

			case 'Low Mid':
				this.squigglyLines(lm);
				break;

			case 'Mid':
				this.squigglyLines(m);
				break;

			case 'High Mid':
				this.squigglyLines(hm);
				break;
		}
		//calling to draw cuboid at the back
		this.cuboid(t,b);
	
		pop();
	};

	//drawing of blocks
	this.rotatingBlocks = function(energy){
		push();
		rotate(rot);
		translate(-width/2,-height/2);
		
		//gets radius of the circle to be drawn, also used for other shapes as length
		var r = map(energy,0,255,10,this.params.block_Size);
		
		noStroke();
		fill(this.params.block_Colour);

		//allows user to select shape of block
		for(var i=0; i<this.params.number_Of_Blocks; i++){
			
			//arranges blocks evenly in circular arrangement
			var angle = TWO_PI / this.params.number_Of_Blocks * i;
			var x = width / 2 + cos(angle) * ringRadius;
			var y = height / 2 + sin(angle) * ringRadius;
			var d = 2 * r;

			switch(this.params.block_Shape){
				case 'Square':
					rectMode(CENTER);
					rect(x,y,d,d);
					break;

				case 'Circle':
					ellipse(x,y,d);
					break;

				case 'Triangle':
					this.ngon(3,x,y,d);
					break;

				case 'Star':
					this.star(5, x, y, d/2, d);
					break;

				case 'Pentagon':
					this.ngon(5,x, y, d);
					break;
			}

		};

		//rotate only if selected energy is above selected Hz
		if(energy>this.params.block_Rotate_Sensitivity){
			rot += (TWO_PI / (20 * this.params.block_Size) );
		};
		pop();
	}

	//drawing of squiggly lines
	this.squigglyLines = function(energy){
		stroke(this.params.line_Colour);
		noFill();
		strokeWeight(2);

        beginShape();
		for(var i=0; i<100; i++){
			//map to make the value bigger on the y axis
			//multiply i at line_Length to spread the values on the x axis
			var x = map(noise(i* this.params.line_Length + prog),0,1,-350,350);
			var y = map(noise(i* this.params.line_Length + prog+1000),0,1,-350,350);

			vertex(x,y);
		};
		endShape();

		//line moves only when selected energy is above selected Hz
		if(energy>this.params.line_Sensitivity){
			prog+=0.03;
		};

	}

	//drawing of cuboid at the back
	this.cuboid = function(t,b){
		push();

		//number of sides
		var pieces = 6;

		var map_treble = map(t, 0, 255, -100, 100);
		var scale_treble = map(t, 0, 255, 1, 1.5);

		var map_bass = map(b, 0, 255, -100, 250);
		var scale_bass = map(b, 0, 255, 0.5, 1);
	
		strokeWeight(1);
	
		//drawing of each side
		for (i = 0; i < pieces; i += 0.25) {
	
			rotate(TWO_PI / pieces);
			strokeWeight(0.5);
			stroke(this.params.block_Colour);

			push();
			scale(scale_treble);
			rotate(rot);
			line(map_treble, 200 / 2, 200, 200);
			line(-map_treble, -200 / 2, 200, 200);
			pop();

			push();
			scale(scale_bass);
			rotate(rot);
			line(map_bass, 200 / 2, 200, 200);
			line(-map_bass, -200 / 2, 200, 200);
			pop();
		}
		pop();
	}

	//drawing of n-sided polygon
	this.ngon = function(n, x, y, d) {
	beginShape();
	for(var i = 0; i < n; i++) {
		var angle = TWO_PI / n * i;
		var px = x + sin(angle) * d / 2;
		var py = y - cos(angle) * d / 2;
		vertex(px, py);
	}
	endShape(CLOSE);
	}

	//drawing of n-sided star
	this.star = function(n, x, y, d1, d2) {

		beginShape();
		for(var i = 0; i < 2 * n; i++) {
		  var d = (i % 2 === 0) ? d1 : d2;
		  var angle = PI / n * i ;
		  var px = x + sin(angle) * d / 2;
		  var py = y - cos(angle) * d / 2;
		  vertex(px, py);
		}
		endShape(CLOSE);
	}


}