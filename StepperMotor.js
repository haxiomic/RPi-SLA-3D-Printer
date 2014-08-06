return;
//Model Number: 28BYJ-48
var GPIO = require('r-pi-gpio');

var SPEED_VARIATION_RATIO = 1/64;
var STRIDE_ANGLE = 5.625/64;//degrees
var FREQUENCY = 100;//Hz

var StepperMotor = function(){
	this.sequenceInterval =  10;
	this.clockwise =  true;
	this.pins =  [24,25,8,7];
	this.sequence = [
		[1,0,0,0],
		[1,1,0,0],
		[0,1,0,0],
		[0,1,1,0],
		[0,0,1,0],
		[0,0,1,1],
		[0,0,0,1],
		[1,0,0,1]
	];
}

var activePins = [];
var stepi = 0;
var timer = null;

StepperMotor.prototype.init = function(options){
	for(var key in options) 
		this[key] = options[key];

	//setup pins
	for(var i = 0; i < this.pins.length; i++){
		activePins[i] = GPIO.output(this.pins[i]);
	}
};

StepperMotor.prototype.step = function(clockwise){
	if(typeof(clockwise)==='undefined') clockwise = this.clockwise;
	for(var i = 0; i < this.pins.length; i++){
		activePins[i]( this.sequence[stepi][i] == 1 );
	}

	stepi += clockwise ? 1 : -1;
	if(stepi<0)stepi = this.sequence.length-1;
	if(stepi>=this.sequence.length)stepi = 0;
};

StepperMotor.prototype.spin = function(degrees, clockwise){
	if(typeof(clockwise)==='undefined') clockwise = this.clockwise;
	if(typeof(degrees)==='undefined'){
		timer = setInterval(this.step.bind(this), this.sequenceInterval);
		return;
	}
	
	var requiredSteps = Math.round(degrees/STRIDE_ANGLE);
	var stepCount = requiredSteps;
	timer = setInterval(function(){
		this.step(clockwise);
		requiredSteps--;
		if(!(requiredSteps>0)) 
			clearInterval(timer);
	}.bind(this), this.sequenceInterval);
};

StepperMotor.prototype.stop = function(){
	clearInterval(timer);
};

module.exports = new StepperMotor(); 