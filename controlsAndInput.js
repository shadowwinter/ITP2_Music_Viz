//Constructor function to handle the onscreen menu, keyboard and mouse controls
function ControlsAndInput(){
	
	this.tracklistDisplayed = false;
	this.helpDisplayed = false;
	this.graphicDisplayed = false;
	this.settingDisplayed = false;
	this.nexttrack=[];
	
	//call constructor to draw check for mouse clicks or key presses
	this.checkControls = new CheckControls();

	//check for which buttons are pressed
	this.mousePressed = function(){
		this.checkControls.clickCheck();
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		console.log(keycode);
		this.checkControls.keyCheck(keycode);

	};
	
	//draws the playback buttons and the menus
	this.draw = function(){
		push();

		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(34);

		//draws playback buttons
		this.checkControls.draw();

		pop();

		//only draw the menu if button has been selected
		if(this.helpDisplayed){
			this.help();
		}	
		if(this.tracklistDisplayed){
			this.tracklist();
		}		
		if(this.graphicDisplayed){
			this.graphic();
		}		
		if(this.settingsDisplayed){
			vis.selectedVisual.onload();
		}
		if(!this.settingsDisplayed){
			vis.selectedVisual.unload();
		}

	};

	//draws the tracklist menu
	this.tracklist = function(){
		translate(width/2-140,-height/2+90,0);
		tracklist_display.background(255, 251, 219);
		tracklist_display.fill(0);
	
		tracklist_display.textSize(68);
		tracklist_display.text("Tracklist",35,80);
		tracklist_display.text("Q: Stomper Reggae Bit",35,160);
		tracklist_display.text("W: Changing Instrumental",35,240);
		tracklist_display.text("E: Dayum",35,320);
		tracklist_display.text("R: Classical Rock",35,400);
		tracklist_display.text("T: Inspiring Dramatic Beat",35,480);
		tracklist_display.text("Y: Intrumental Jazz",35,560);
		texture(tracklist_display);
		plane(200,140);
	}

	//draws the help menu
	this.help = function(){
		translate(width/2-120,-height/2+100,0);
		help_display.background(235, 195, 203);
		help_display.fill(0);
		help_display.textSize(68);
		
		help_display.text("H: Help Menu",35,80);
		help_display.text("S: Settings Menu",35,160);
		help_display.text("D: AuDio",35,240);
		help_display.text("F: Fullscreen",35,320);
		help_display.text("G: Graphics Menu",35,400);
		help_display.text("J: Previous Track",35,480);
		help_display.text("K: Play/Pause",35,560);
		help_display.text("L: Next Track",35,640);

		texture(help_display);
		plane(160,160);
	};
	
	//draws the graphic choices menu
	this.graphic = function(){
		translate(width/2-140,-height/2+72,0);
		graphic_display.background(206, 230, 245);
		graphic_display.fill(0);
		graphic_display.textSize(68);

		graphic_display.text("Graphics List",35,80);
		//draw out menu items for each visualisation
		for(var i = 0; i < vis.visuals.length; i++){
			var yLoc = 160 + i*80;
			graphic_display.text((i+1) + ": " +vis.visuals[i].name, 35, yLoc);
		}

		texture(graphic_display);
		plane(200,105);
	};

	
}


