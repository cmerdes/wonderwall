var mongoose	= require('mongoose');

var employeeSchema = new mongoose.Schema({
	firstname	: String,
	lastname	: String,
	position	: String
})

mongoose.model('Employee', employeeSchema);

mongoose.connect('mongodb://localhost/wonderwall');