var mongoose = require('mongoose');
var os = require('os');
var Employee = mongoose.model('Employee');

var ip = os.networkInterfaces().en0[1].address;



exports.findById = function(req, res) {
	
	var id = req.params.id;

	Employee.find( function ( err, employees ){

		var employeeMap = new Array();

		employees.forEach(function(employee) {
			employeeMap.push(employee);
		})

		console.log(employeeMap[req.params.id].lastname);

		res.render( 'employees/findById', {
    		'title' : 'Single employee',
    		'firstname' : employeeMap[req.params.id].firstname,
    		'lastname' : employeeMap[req.params.id].lastname,
    		'ip' : ip
    	});
	});


	/*Employee.find({'lastname': 'Echt'}, function ( err, docs ){

		res.render( 'employees/findById', {
    		'title' : 'Single employee',
    		'employee' : docs[0],
    		'ip' : ip
    	});
	});*/
}

exports.findAll = function(req, res) {

  	Employee.find( function ( err, employees, count ){

    	res.render( 'index', {
        	'title' : 'All employees',
        	'employees' : employees,
        	'ip' : ip
    	});
  	});
}