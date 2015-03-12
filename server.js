// server.js
// load the things we need
var express = require('express');
var app = express();

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

//set session
app.use(cookieParser());
app.use(session({ secret: '0GBlJZ9EKBt2Zbi2flRPvztczCewBxXK'})); 
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in sessi

require('./config/passport')(passport);
require('./routes/routes.js')(app, passport);


var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port    = process.env.OPENSHIFT_NODEJS_PORT || 3000;


// set the view engine to ejs
app.set('view engine', 'ejs');

//connect to database
mongoose.connect("mongodb://localhost/");

app.listen(port, ipaddr, function() {
	console.log('started');
		});