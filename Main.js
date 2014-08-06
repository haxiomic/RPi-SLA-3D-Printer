var StepperMotor = require('./StepperMotor.js');
var Server = require('./Server.js');

Server.start();

Server.testMotor = function () {
	StepperMotor.init({
		clockwise: false,
		sequenceInterval: 10
	});
	StepperMotor.spin(180);
}