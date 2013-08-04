var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');

// query db for all todo items
exports.index = function ( req, res ){
  Employee.find( function ( err, employees, count ){
    res.render( 'index', {
        title : 'Express Todo Example',
        employees : employees
    });
  });
};