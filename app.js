var express = require("express");
//var routes = require("./routes");
var employees = require("./routes/employees");

var app = express();


app.use(app.router);
app.set('views', './views');
app.set('view engine', '')


app.get('/', employees.overview);
//app.get('/employees', employees.overview);
//app.get('/employees/:id', employees.employee);

//app.post
//app.put
//app.del

app.listen(3000);