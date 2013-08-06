//require('./config');
//require('./db');

var express		= require('express');
var mongoose	= require('mongoose');
var app			= express();


// Setup
mongoose.connect('mongodb://localhost/wonderwall');


//var ejs		= require('ejs');
//var routes	= require('./routes');
//var employees = require('./routes/employees');

// SOCKET.IO
//var server	= app.listen(port);
//var io 		= require('socket.io').listen(server);

//var devices = new Array();


// Express configuration
app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
})

// Mongoose configuration
var Schema = mongoose.Schema;

var Employee = new Schema({
	firstname: { type: String },
	lastname: { type: String },
	position: { type: String }
});

var EmployeeModel = mongoose.model('Employee', Employee);


/* Routes */

// API status
app.get('/api', function(req, res) {
	res.send('Wonderwall API is running');
});

// READ (list)
app.get('/api/employees', function (req, res){
  	return EmployeeModel.find(function (err, employees) {
    	if (!err) {
      		return res.send(employees);
    	} else {
      		return console.log(err);
    	}
  	});
});

// READ (single)
app.get('/api/employees/:id', function (req, res){
  return EmployeeModel.findById(req.params.id, function (err, employee) {
    if (!err) {
      return res.send(employee);
    } else {
      return console.log(err);
    }
  });
});

// CREATE
app.post('/api/employees', function (req, res){
  	var employee;
  	console.log("POST: ");
  	console.log(req.body);

  	employee = new EmployeeModel({
    	firstname: req.body.firstname,
    	lastname: req.body.lastname,
    	position: req.body.position,
  	});

  	employee.save(function (err) {
    	if (!err) {
      		return console.log("created");
    	} else {
      		return console.log(err);
    	}
  	});

  	return res.send(employee);
});

// UPDATE
app.put('/api/employees/:id', function (req, res){
  return EmployeeModel.findById(req.params.id, function (err, employee) {
    employee.firstname = req.body.firstname;
    employee.lastname = req.body.lastname;
    employee.position = req.body.position;
    return employee.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(employee);
    });
  });
});

// DELETE
app.delete('/api/employees/:id', function (req, res){
  return EmployeeModel.findById(req.params.id, function (err, employee) {
    return employee.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});




//app.get('/employees', employees.findAll);
//app.get('/employees/:id', employees.findById);

app.listen(3000);


// Socket
/*io.sockets.on('connection', function (client) {

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
});*/