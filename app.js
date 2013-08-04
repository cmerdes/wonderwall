require('./config');
require('./db');

var express = require('express');
var ejs		= require('ejs');
var routes	= require('./routes');
var app		= express();
var server	= app.listen(port);
var io 		= require('socket.io').listen(server);


// Configuration
app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(app.router);
})

app.configure( 'development', function (){
  app.use( express.errorHandler({ dumpExceptions : true, showStack : true }));
});
 
app.configure( 'production', function (){
  app.use( express.errorHandler());
});


// Routes
app.get('/', routes.index);


// Socket
io.sockets.on('connection', function (socket) {
  socket.on('handshake', function () {
    console.log('HI!');
  });
 socket.on('disconnect', function() { 
    //console.log("Connection " + socket.id + " terminated."); 
    console.log('BYE!');
  });
});