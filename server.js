/**
 * New node file
 */
// server.js
// load the things we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var sessions = require("client-sessions");

var app = express();

//set session
app.use(sessions({
	  cookieName: 'myGymSession', // cookie name dictates the key name added to the request object
	  secret: '0GBlJZ9EKBt2Zbi2flRPvztczCewBxXK', 
	  duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
	  activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));


var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port    = process.env.OPENSHIFT_NODEJS_PORT || 3000;


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// set the view engine to ejs
app.set('view engine', 'ejs');

//connect to database
mongoose.connect("mongodb://localhost/");

var User = require('./modals/Users').Users;


// index page 
app.get('/', function(req, res) {
    res.render('index',{
		GymUsername: req.myGymSession.user	
	});
});

app.get('/dashboard', function(req, res) {
    res.render('index');
});

// Register page for a new Account
app.post('/Register', function(req, res) {
	
	var email = req.body.eid;
	var username = req.body.uid;
	var password = req.body.pid;
	console.log(email);
	var user=new User({Username:username,Password:password,Email:email});

	user.save(function(err, user) {
		  if (err) return console.error(err);
		  console.dir(user);
		});	
	
	req.myGymSession.user = username;
	req.myGymSession.password = password;
	req.myGymSession.email = email;
	
	
	res.render('dashboard',{
		GymUsername: req.myGymSession.user	
	});
//	mongoose.model('Users').find(function(err,Users){
//		res.send(req.myGymSession.user);
//	});
    
});

app.listen(port, ipaddr, function() {
	console.log('started');
		});