require('./config');
require('./db');

var express = require('express');

var ejs		= require('ejs');

var routes	= require('./routes');
var employees = require('./routes/employees');

var app		= express();
var server	= app.listen(port);
var io 		= require('socket.io').listen(server);

var devices = new Array();


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
app.get('/employees', employees.findAll);
app.get('/employees/:id', employees.findById);


// Socket
io.sockets.on('connection', function (client) {

   client.on('init', function(msg) {

      console.log("client.id: " + (client.id));
      console.log("devices: " + devices);

      if (devices.indexOf(client.id)) {
         devices.push(client.id); 
         console.log('pushed');
      };
      //console.log("IP: " + (client.handshake.address.address));

      client.emit('showContent', {'arrayPosition': devices.indexOf(client.id)});
   });



 client.on('disconnect', function() { 

    console.log('BYE!');

    if (devices.indexOf(client.id)) {
      devices.splice(devices.indexOf(client.id), 1);

      console.log("pulled: " + client.id);
      console.log("devices: " + devices);
    }
  });
});