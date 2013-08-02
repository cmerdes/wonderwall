var express = require('express');
var http	= require('http');
var app = express();
var server = http.createServer(app);

// Mongoose setup
require('./db');

// Configuration
app.configure( function (){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon);
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(app.router);
})

var routes = require('./routes');

app.get('/', routes.index);

app.listen(3000, function() {
	console.log('Express server listening on port %d in %s mode', server.address(), app.settings.env);
});