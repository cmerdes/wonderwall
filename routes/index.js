var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');

var os = require('os');
var ip = os.networkInterfaces().en2[1].address;

// delegate device to content
exports.index = function ( req, res ){


	//var id = req.params.id;

	Employee.find( function ( err, employees ){

		var employeeMap = new Array();

		employees.forEach(function(employee) {
			employeeMap.push(employee);
		})

		//console.log(employeeMap[req.params.id].lastname);

		res.render( 'index', {
    		'title' : 'Single employee',
    		'employees': employeeMap,
    		//'firstname' : employeeMap[req.params.id].firstname,
    		//'lastname' : employeeMap[req.params.id].lastname,
    		'ip' : ip
    	});
	});
};