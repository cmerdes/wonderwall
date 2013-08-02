var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;

var Employee = new Schema({
	firstname	: String,
	position	: String
})

mongoose.model('Employee', Employee);

mongoose.connect('mongodb://localhost/wonderwall');