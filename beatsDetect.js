function BeatDetect(){
    var sampleBuffer=[];

    this.detectBeat = function(spectrum, sensitivity){
        var sum=0;
		var sensitivity=sensitivity;
		
		//adds up every element in the spectrum array to compare with the average later on
		for(var i=0; i<spectrum.length; i++){
			sum += spectrum[i]*spectrum[i];
		}
		if(sampleBuffer.length==60){
			
			//detect a beat
			var isBeat=false;

			//calculating average to compare values to decide if considered beat or not
			var sampleSum=0;
			//adds up every lement in the sample buffer array to find total sum
			for(var i=0; i<sampleBuffer.length; i++){
				sampleSum+=sampleBuffer[i];
			}

			var sampleAverage = sampleSum/sampleBuffer.length;

			//calculate the constant to be used
			var c = calculateConstant(sampleAverage);
			var avg = ((sampleAverage*c)+(sensitivity*100000));

			//is considered beat if sum is larger than sample average
			if(sum>avg){
				isBeat=true;
			}
			
			//removes first item in array after adding onto the sum
			sampleBuffer.splice(0,1);
			sampleBuffer.push(sum);	
		}
		else{
			sampleBuffer.push(sum);
		}
		return isBeat;

    }

	function calculateConstant(sampleAverage){
		var varianceSum=0;
		for(var i=0; i<sampleBuffer.length; i++){
			varianceSum+= sampleBuffer[i]-sampleAverage;
		}
		
		var variance= varianceSum/sampleBuffer.length;
		
		//calculate the gradient of the slope 
		var m=-0.15/(25-200);
		//calculate the y-intercept of the slope
		var b=1+(m*200);
		//calculate the constant 
		var c=(m*variance)+b;
		
		return c;
	}


}