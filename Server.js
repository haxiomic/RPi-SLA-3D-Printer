var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Server =  function (){
	this.port = 3000;
}

var onConnection = function (socket) {
	console.log('a user connected');
	socket.on('test-motor', function(socket){
		this.testMotor();
		console.log('event: test-motor');
	}.bind(this));
	
	socket.on('stop-motor', function(socket){
		this.stopMotor();
		console.log('event: stop-motor');
	}.bind(this));
}

Server.prototype.start = function(options) {
	for(var key in options) 
		this[key] = options[key];

	['css', 'fonts'].forEach(function(dir){
		app.use('/'+dir,express.static(__dirname + '/interface/'+dir));
	});

	app.get('/', function(req, res){
	  res.sendfile('./interface/index.html');
	});

	io.on('connection', onConnection.bind(this));

	http.listen(this.port, function(){
		console.log('Listening on port '+this.port);
	}.bind(this));
};

Server.prototype.testMotor = function() {};
Server.prototype.stopMotor = function() {};

module.exports = new Server();