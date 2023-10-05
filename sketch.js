//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var track1, track2, track3, track4, track5;
var sound = [];
//variable for p5 fast fourier transform and p5 amplitude
var fourier, amplitude;
//variable for images
var music_icon, help_icon, settings_icon, paint_icon;
//variable for webgl texture to write texts
var help_display, tracklist_display, graphic_display, ridges_display;
//set default music playing mode to false
var isPlaying = false;

//preload sound tracks and picture icons
function preload(){

	track1 = loadSound('assets/audio/stomper_reggae_bit.mp3');
	track2 = loadSound('assets/audio/leehayeskerr_ever-changing-instrumetal.mp3');
	track3 = loadSound('assets/audio/loveless1017_dayum.wav');
	track4 = loadSound('assets/audio/theoteravainen_classical-rock.mp3');
	track5 = loadSound('assets/audio/tyops_inspiring-dramatic-beat.mp3');
	track6 = loadSound('assets/audio/valentinsosnitskiy_instrumental-jazz.mp3');
	
	music_icon= loadImage('assets/images/music_icon.png');
	help_icon= loadImage('assets/images/help_icon.jpg');
	paint_icon= loadImage('assets/images/paint_icon.jpg');
	settings_icon= loadImage('assets/images/settings_icon.png');
}



function setup(){
	createCanvas(windowWidth, windowHeight, WEBGL);
	background(0);

	//add default audio track
	sound.push(track1);
	sound[sound.length-1].playMode('restart');

	controls = new ControlsAndInput();

	//instantiate the fft object
	fourier = new p5.FFT();
	amplitude = new p5.Amplitude();

	//create a new visualisation container and add visualisations
	vis = new Visualisations();
	vis.add(new DancingCubes());
	vis.add(new BlocksLines());
	vis.add(new FireworksMain());
	vis.add(new RidgePlots());
	
	//create plane to draw the different menus
	help_display = createGraphics(650,700);
	tracklist_display = createGraphics(900,600);
	graphic_display = createGraphics(800,450);
	ridges_display = createGraphics(800,800);

}


function draw(){
	background(0);
	noStroke();

	//draw the selected visualisation
	vis.selectedVisual.draw();

	//draw the icon to open the settings menu
	push();
	translate(-206,-height/2+67,0);
	texture(settings_icon);
	plane(40);
	pop();

	//draw the icon to open the tracklist menu
	push();
	translate(-128,-height/2+67,0);
	texture(music_icon);
	plane(40);
	pop();

	//draw the icon to open the visualization selection menu
	push();
	translate(135,-height/2+67,0);
	texture(paint_icon);
	plane(40);
	pop();

	//draw the icon to open the help menu
	push();
	translate(200,-height/2+67,0);
	texture(help_icon);
	plane(40);
	pop();

	//draw the playback buttons on top
	push();
	controls.draw();
	pop();

}

//check for mouse click activity and act accordingly
function mouseClicked(){
	controls.mousePressed();
}

//check for key pressed activity and act accordingly
function keyPressed(){
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}
