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
		console.log('test motor');
	});
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

	io.on('connection', onConnection);

	http.listen(this.port, function(){
		console.log('Listening on port '+this.port);
	}.bind(this));
};

module.exports = new Server();