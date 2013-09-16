var _						=	require('underscore');
var express     = require('express');
var mongoose    = require('mongoose');
var app         = express();
var server			= require('http').createServer(app);
var io          = require('socket.io').listen(server);
var devices			= new Array();



/* Express Configuration */

// Setup
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
})

server.listen(3000);



/* Database Configuration */

// Setup
mongoose.connect('mongodb://localhost/wonderwall');

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



/* Websocket  */

// Socket
io.sockets.on('connection', function (client) 
{
    console.log("Client joined: Client " + client.id);
    console.log("Clients (total): " + io.sockets.clients());

    

    // Add client to device array when connecting
    if (!_.findWhere(devices, {id: client.id}))
    {
    	devices.push(client);
    	console.log("Client pushed: Client " + client.id);
    	console.log("Devices: " + devices.length);

    	client.emit('showcontent', {position: _.indexOf(devices, client)});
    	console.log('Position: ' + _.indexOf(devices, client));
    } 
    else
    {
    	console.log("Client " + client.id + "is already in.");
    	console.log("Devices: " + devices.length);
    }

    // remove client from device array when disconneting
    client.on('disconnect', function() 
    {   
        console.log("Client left: Client " + client.id);
        devices = _.without(devices, client);
        console.log("Client removed: Client " + client.id);
        console.log("Devices: " + devices.length);
    });
});




