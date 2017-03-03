//NPM PACKAGES
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
//CONNECT TO DB
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'syner',
	database: 'aossie'
});
connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
	  	return;
	}
	console.log('connected as id ' + connection.threadId);
});
//EXPRESS
const app  = express();
app.set('port', process.env.PORT || 8080);
//VIEW ENGINE
app.set('views', './views');
app.set('view engine', 'pug');
//MIDDLEWARE
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
//GET ROUTES
require('./routes/get/views-get')(app);
require('./routes/get/country-list-get')(app, connection);
//POST ROUTES
require('./routes/post/country-em-kwh-post')(app, connection);
//SERVER
const listener = app.listen(app.get('port'), function(){
	console.log('Listening on port ' + listener.address().port);
});