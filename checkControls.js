//displays and handles clicks on the all button.
function CheckControls(){
	
	this.x = 0;
	this.y = 60;
	this.width = 20;
	this.height = 20;

	//flag to determine whether to play or pause after button click and determine which icon to draw
	this.playing = false;

	this.draw = function(){

		translate(0, -height/2);

		//draw relevant buttons
		if(this.playing){
			this.play();
		}
		else{	
			this.pause();
		}
		this.next();
		this.previous();
		
	};

	//draws play, pause, previous and next buttons

	this.play = function(){
		rect(this.x, this.y, this.width/2 - 2, this.height);
		rect(this.x + (this.width/2 + 2), this.y, this.width/2 - 2, this.height);
	}

	this.pause = function(){
		triangle(this.x, this.y, this.x + this.width, this.y + this.height/2, this.x, this.y+this.height);
	}

	this.previous = function(){
		triangle(this.x - 35, this.y, 
			this.x -35 - this.width, this.y + this.height/2, 
			this.x -35 , this.y+this.height);
		triangle(this.x - 51, this.y, 
			this.x -51 - this.width, this.y + this.height/2, 
			this.x -51 , this.y+this.height);
	}

	this.next = function(){
		triangle(this.x + 55, this.y, 
			this.x +55 + this.width, this.y + this.height/2, 
			this.x +55 , this.y+this.height);
		triangle(this.x + 71, this.y, 
			this.x +71 + this.width, this.y + this.height/2, 
			this.x +71 , this.y+this.height);
	}

	//checks for clicks on buttons
	this.clickCheck = function(){

		//check if settings icon has been pressed, toggles to display settings menu
		if(mouseX > width/2-228 && mouseX < width/2 -206+20 && mouseY > this.y-12 && mouseY < this.y+26){
			controls.settingsDisplayed = !controls.settingsDisplayed;
		}
		
		//check if previous button has been pressed
		if(mouseX > width/2-75	&& mouseX < width/2-55 + this.width && mouseY > this.y && mouseY < this.y + this.height){
			this.prevPressed();
		}

		//check if play button has been pressed, toggles audio between play/pause
		if(mouseX > width/2 && mouseX < width/2 + this.width && mouseY > this.y && mouseY < this.y + this.height){
			this.playPressed();
		}
	
		//check if next button has been pressed
		if(mouseX > width/2+53 && mouseX < width/2+72 + this.width && mouseY > this.y && mouseY < this.y + this.height){
			this.nextPressed();
		}

		//check if tracklist icon has been pressed, displays tracklist menu.
		//if tracklist or other menus are already displayed, close it .
		if(mouseX > width/2-150 && mouseX < width/2 -108 && mouseY > this.y-8 && mouseY < this.y+24){
			
			controls.tracklistDisplayed = !controls.tracklistDisplayed;
			
			if(controls.helpDisplayed){
				controls.helpDisplayed = false;
			}
			if(controls.graphicDisplayed){
				controls.graphicDisplayed = false;
			}
		}

		//check if paint icon has been pressed, displays visualization menu.
		//if visualization or other menus are already displayed, close it.
		if(mouseX > width/2+115 && mouseX < width/2 +153 && mouseY > this.y-10 && mouseY < this.y+24){
			
			controls.graphicDisplayed = !controls.graphicDisplayed;

			if(controls.helpDisplayed){
				controls.helpDisplayed = false;
			}
			if(controls.tracklistDisplayed){
				controls.tracklistDisplayed = false;
			}
		}

		//check if help icon has been pressed, displays help menu.
		//if help or other menus are already displayed, close it.
		if(mouseX > width/2+175 && mouseX < width/2 +218 && mouseY > this.y-10 && mouseY < this.y+24){

			controls.helpDisplayed = !controls.helpDisplayed;
			
			if(controls.tracklistDisplayed){
				controls.tracklistDisplayed = false;
			}
			if(controls.graphicDisplayed){
				controls.graphicDisplayed = false;
			}
		}
		
		//if user presses options on the menu displayed, appropriate actions will be carried out
		if(controls.tracklistDisplayed){
			//toggles tracklist
			if(mouseX>width-230 && mouseX<width-165 && mouseY > 22 && mouseY<36){ 
				controls.tracklistDisplayed = false;
			}
			//plays Q track 1
			if(mouseX>width-230 && mouseX<width-72 && mouseY > 42 && mouseY<56){ 
				if(isPlaying && sound[sound.length-1] == track1){
					console.log("Already playing!");
				}
				else if (!isPlaying){
					sound.push(track1);
				}
				else{
					sound[sound.length-1].pause();
					sound.push(track1);
					sound[sound.length-1].loop();
				}
			}  
			//plays W track 2
			if(mouseX>width-230 && mouseX<width-55 && mouseY > 62 && mouseY<76){
				if(isPlaying && sound[sound.length-1] == track2){
					console.log("Already playing!");
				}
				else if (!isPlaying){
					sound.push(track2);
				}
				else{
					sound[sound.length-1].pause();
					sound.push(track2);
					sound[sound.length-1].loop();
				}
			}  
			//plays E track 3
			if(mouseX>width-230 && mouseX<width-160 && mouseY > 82 && mouseY<96){
				if(isPlaying && sound[sound.length-1] == track3){
					console.log("Already playing!");
				}
				else if (!isPlaying){
					sound.push(track3);
				}
				else{
					sound[sound.length-1].pause();
					sound.push(track3);
					sound[sound.length-1].loop();
				}
			}  
			//plays R track 4
			if(mouseX>width-230 && mouseX<width-108 && mouseY > 102 && mouseY<116){
				if(isPlaying && sound[sound.length-1] == track4){
					console.log("Already playing!");
				}
				else if (!isPlaying){
					sound.push(track4);
				}
				else{
					sound[sound.length-1].pause();
					sound.push(track4);
					sound[sound.length-1].loop();
				}
			}  
			//plays T track 5
			if(mouseX>width-230 && mouseX<width-55 && mouseY > 122 && mouseY<136){
				if(isPlaying && sound[sound.length-1] == track5){
					console.log("Already playing!");
				}
				else if (!isPlaying){
					sound.push(track5);
				}
				else{
					sound[sound.length-1].pause();
					sound.push(track5);
					sound[sound.length-1].loop();
				}
			}  
			//plays Y track 6
			if(mouseX>width-230 && mouseX<width-98 && mouseY > 142 && mouseY<156){ 
				if(isPlaying && sound[sound.length-1] == track6){
					console.log("Already playing!");
				}
				else if (!isPlaying){
					sound.push(track6);
				}
				else{
					sound[sound.length-1].pause();
					sound.push(track6);
					sound[sound.length-1].loop();
				}
			}  
		}

		if(controls.graphicDisplayed){
			//toggles Graphics menu
			if(mouseX>width-234 && mouseX<width-127 && mouseY>23 && mouseY<37){
				controls.graphicDisplayed = !controls.graphicDisplayed;
			}
			//selects graphic 1
			if(mouseX>width-234 && mouseX<width-47 && mouseY>43 && mouseY<57){ 
				if(vis.selectedVisual.hasOwnProperty("unload")){
					vis.selectedVisual.unload();
				}
	
				vis.selectVisual(vis.visuals[0].name); 
				
				if(vis.selectedVisual.hasOwnProperty("onload")){
					vis.selectedVisual.onload();
				}	
			}
			//selects graphic 2
			if(mouseX>width-234 && mouseX<width-80 && mouseY>63 && mouseY<77){ 
				if(vis.selectedVisual.hasOwnProperty("unload")){
					vis.selectedVisual.unload();
				}
	
				vis.selectVisual(vis.visuals[1].name); 
				
				if(vis.selectedVisual.hasOwnProperty("onload")){
					vis.selectedVisual.onload();
				}
			}
			//selects graphic 3
			if(mouseX>width-234 && mouseX<width-134 && mouseY>83 && mouseY<97){ 
				if(vis.selectedVisual.hasOwnProperty("unload")){
					vis.selectedVisual.unload();
				}
	
				vis.selectVisual(vis.visuals[2].name); 
				
				if(vis.selectedVisual.hasOwnProperty("onload")){
					vis.selectedVisual.onload();
				}
			}
			//selects graphic 4
			if(mouseX>width-234 && mouseX<width-122 && mouseY>103 && mouseY<117){ 
				if(vis.selectedVisual.hasOwnProperty("unload")){
					vis.selectedVisual.unload();
				}
	
				vis.selectVisual(vis.visuals[3].name); 
				
				if(vis.selectedVisual.hasOwnProperty("onload")){
					vis.selectedVisual.onload();
				}
			}
		}
	
		if(controls.helpDisplayed){
			//toggles help menu
			if(mouseX>width-195 && mouseX<width-85 && mouseY > 23 && mouseY<39){
				controls.helpDisplayed = false;
			}
			//shows S - settings menu
			if(mouseX>width-195 && mouseX<width-62 && mouseY > 43 && mouseY<58){ 
				controls.settingsDisplayed = !controls.settingsDisplayed;
			}
			//shows D - auDio menu
			if(mouseX>width-195 && mouseX<width-122 && mouseY > 63 && mouseY<76){
				controls.helpDisplayed = false;
				controls.tracklistDisplayed = true;
			}
			//toggles F - fullscreen
			if(mouseX>width-195 && mouseX<width-92 && mouseY > 80 && mouseY<94){
				var fs = fullscreen();
				fullscreen(!fs);
			}
			//shows G - graphics menu
			if(mouseX>width-195 && mouseX<width-54 && mouseY > 98 && mouseY<113){ 
				controls.helpDisplayed = false;			
				controls.graphicDisplayed = true;
			}
			//J - previous
			if(mouseX>width-195 && mouseX<width-60 && mouseY > 117 && mouseY<131){ 
				this.prevPressed();
			}
			//K - play/pause
			if(mouseX>width-195 && mouseX<width-82 && mouseY > 134 && mouseY<148){
				this.playPressed();
			}
			//L - next
			if(mouseX>width-195 && mouseX<width-87 && mouseY > 152 && mouseY<168){ 
				this.nextPressed();
			}
		}
	}

	this.keyCheck = function(keycode){
		//which visualization to choose
		if(keycode==27){
			if(controls.helpDisplayed){
				controls.helpDisplayed = false;
			}
			if(controls.graphicDisplayed){
				controls.graphicDisplayed = false;
			}
			if(controls.tracklistDisplayed){
				controls.tracklistDisplayed = false;
			}
			if(controls.settingsDisplayed){
				controls.settingsDisplayed = false;
			}		
		}

		if(keycode > 48 && keycode < 58){
			var visNumber = keycode - 49;
			
			if(vis.selectedVisual.hasOwnProperty("unload")){
				vis.selectedVisual.unload();
			}

			vis.selectVisual(vis.visuals[visNumber].name); 
			
			if(vis.selectedVisual.hasOwnProperty("onload")){
				vis.selectedVisual.onload();
			}
		}

		//which music track is chosen
		if(keycode==81){ //Q track 1
			if(isPlaying && sound[sound.length-1] == track1){
				console.log("Already playing!");
			}
			else if (!isPlaying){
				sound.push(track1);
			}
			else{
				sound[sound.length-1].pause();
				sound.push(track1);
				sound[sound.length-1].loop();
			}
		}
		if(keycode==87){ //W track 2
			if(isPlaying && sound[sound.length-1] == track2){
				console.log("Already playing!");
			}
			else if (!isPlaying){
				sound.push(track2);
			}
			else{
				sound[sound.length-1].pause();
				sound.push(track2);
				sound[sound.length-1].loop();
			}
		}
		if(keycode==69){ //E track 3
			if(isPlaying && sound[sound.length-1] == track3){
				console.log("Already playing!");
			}
			else if (!isPlaying){
				sound.push(track3);
			}
			else{
				sound[sound.length-1].pause();
				sound.push(track3);
				sound[sound.length-1].loop();
			}
		}
		if(keycode==82){ //R track 4
			if(isPlaying && sound[sound.length-1] == track4){
				console.log("Already playing!");
			}
			else if (!isPlaying){
				sound.push(track4);
			}
			else{
				sound[sound.length-1].pause();
				sound.push(track4);
				sound[sound.length-1].loop();
			}
		}
		if(keycode==84){ //T track 5
			if(isPlaying && sound[sound.length-1] == track5){
				console.log("Already playing!");
			}
			else if (!isPlaying){
				sound.push(track5);
			}
			else{
				sound[sound.length-1].pause();
				sound.push(track5);
				sound[sound.length-1].loop();
			}
		}
		if(keycode==89){ //Y track 6
			if(isPlaying && sound[sound.length-1] == track6){
				console.log("Already playing!");
			}
			else if (!isPlaying){
				sound.push(track6);
			}
			else{
				sound[sound.length-1].pause();
				sound.push(track6);
				sound[sound.length-1].loop();
			}
		}

		// s for settings menu
		if(keycode==83){
			controls.settingsDisplayed = !controls.settingsDisplayed;
		}

		// d for auDiolist
		if(keycode==68){
			controls.tracklistDisplayed = !controls.tracklistDisplayed;
			if(controls.helpDisplayed){
				controls.helpDisplayed = false;
			}
			if(controls.graphicDisplayed){
				controls.graphicDisplayed = false;
			}
		}

		// f to toggle fullscreen
		if(keycode==70 || keycode == 32){
			var fs = fullscreen();
			fullscreen(!fs);
		}

		// g for graphics menu
		if(keycode==71){
			controls.graphicDisplayed = !controls.graphicDisplayed;
			if(controls.helpDisplayed){
				controls.helpDisplayed = false;
			}
			if(controls.tracklistDisplayed){
				controls.tracklistDisplayed = false;
			}
		}

		// h for help menu
		if(keycode == 72){
			controls.helpDisplayed = !controls.helpDisplayed;
			if(controls.tracklistDisplayed){
				controls.tracklistDisplayed = false;
			}
			if(controls.graphicDisplayed){
				controls.graphicDisplayed = false;
			}
		}

		// j for previous
		if(keycode==74){
			this.prevPressed();
		}

		// k for play/pause
		if(keycode==75){
			this.playPressed();
		}

		// l for next
		if(keycode==76){
			this.nextPressed();
		}
	}

	//actions when previous button is pressed
	this.prevPressed = function(){

		if (sound[sound.length-1].isPlaying() && sound.length>1) {
			sound[sound.length-1].pause();
			var prev=sound.length-1;
			controls.nexttrack.push(sound[prev]);
			sound.splice(length-1,1);
			sound[sound.length-1].loop();
		  } 
		else if (sound.length==1){
			console.log("Last audio in line!");
			sound[sound.length-1].pause();
			this.pause();
			this.playing = false;
			isPlaying = false;
		} 
		else {
			var prev=sound.length-1;
			controls.nexttrack.push(sound[prev]);
			sound.splice(length-1,1);	
		  }

	}
	
	//actions when play button is pressed
	this.playPressed = function(){
		if (sound[sound.length-1].isPlaying()) {
			sound[sound.length-1].pause();
		} else {
			sound[sound.length-1].loop();
		}
		this.playing = !this.playing;
		isPlaying=!isPlaying;
	}

	//actions when next button is pressed
	this.nextPressed = function(){

		if (sound[sound.length-1].isPlaying() && controls.nexttrack.length>0) {
			sound[sound.length-1].pause();
			var next=controls.nexttrack.length-1;
			sound.push(controls.nexttrack[next]);
			controls.nexttrack.splice(length-1,1);
			sound[sound.length-1].loop();
		  } 
		else if (controls.nexttrack.length==0){
			console.log("No more audio in line!");
			sound[sound.length-1].pause();
			this.pause();
			this.playing = false;
			isPlaying = false;
		}
		else {
			sound[sound.length-1].pause();
			var next=controls.nexttrack.length-1;
			sound.push(controls.nexttrack[next]);
			controls.nexttrack.splice(length-1,1);
		  }
	}
}
