/*global process, setTimeout */

var path = require('path');
var express = require("express");
var namespace = require('express-namespace');
var passport = require('passport');
var config = require('./config.js');
var xsrf = require('./lib/xsrf');
var protectJSON = require('./lib/protectJSON');
var mongoose = require('mongoose');
var security = require('./lib/security-mongo');
var htmlRoutes = require('./lib/htmlRoutes');

var app = express();
var port = config.server.listenPort;

//assign a temporary session id for each user
security.initialize();

app.configure(function(){
	//app.use(express.logger());
  app.use(express.methodOverride());
  app.use(express.bodyParser());
	app.use(express.cookieParser(config.server.cookieSecret));
	app.use(express.session());
	app.use(passport.initialize());
	app.use(passport.session());
  app.use(app.router);
  app.use(express.static(config.server.distFolder));
});

htmlRoutes(app);

mongoose.connect('mongodb://localhost/test', function(err, res) {
	if(err) {
		console.log('ERROR connecting to: ' + localhost + '. ' + err);
	} else {
		app.listen(port);
		console.log('Connected to DB, Now serving the app at http://localhost:' + port + '/');
	}
});

