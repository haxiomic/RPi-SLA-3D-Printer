var StepperMotor = require('./StepperMotor.js');

StepperMotor.init({
	clockwise: false,
	sequenceInterval: 10
});
StepperMotor.spin(180);
// StepperMotor.stop();
