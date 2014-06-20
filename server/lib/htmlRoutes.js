var security = require('./security-mongo');
var usermodel = require('../models/users.js');
var quotemodel = require('../models/quotes.js');
var contactmodel = require('../models/contacts.js');

module.exports = function(app) {
	/* private functions */
  function makeId(length) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		
		for( var i=0; i < length; i++ ) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}

	/* routes for guest */
	app.get('/guestquote', function(req, res) {
		res.sendfile("/home/ybao/peakquote/client/app/guestquote.html");
	});

	app.get('/guestquotes/:quoteid', function(req, res) {
		var quote = {};
		quote.data="bogus data";
		res.send(quote);	
	});

	/* routes for administration panel */
	app.all('/', function(req, res, next) {
		security.authenticationRequired(req, res, function() {
			res.sendfile("/home/ybao/peakquote/client/app/index.html");
		}, true);
	});

	app.get('/login', function(req, res, next) {
		res.sendfile("/home/ybao/peakquote/client/app/login.html");
	});

	app.get('/self', function(req, res, next) {
		security.authenticationRequired(req, res, function() {
			security.sendCurrentUser(req, res, next);
		});		
	});

	app.post('/login', function(req, res) {
		security.login(req, res, function(err){
			console.log(JSON.stringify(err));
			res.send({});
		});
	});

	app.get('/logout', function(req, res) {
		security.logout(req, res, null);
	});

	/* quotes related routes */
	app.get('/quotes', function(req, res) {
		security.authenticationRequired(req, res, function(){
			var query = {};
			if(!req.user.admin) {
				query = {createdby: req.user.email};
			}
			quotemodel.find(query, function(err, quotes) {
				res.send(quotes);					
			});
		});
	});

	app.get('/quotes/:seq', function(req, res) {
		security.authenticationRequired(req, res, function(){
			var query = {seq: req.params.seq};
			if(!req.user.admin) {
				query = {seq: req.params.seq, createdby: req.user.email};
			}
			quotemodel.findOne(query, function(err, quote){
				res.send(quote);
			});
		});
	});

	app.post('/quotes', function(req, res, next) {
		security.authenticationRequired(req, res, function(){
  		var quotedata = {};
  		
			/* TODO: validate the user input*/
			quotedata.quoteId = req.body.quoteId;
  		quotedata.firstName = req.body.firstName;
  		quotedata.lastName = req.body.lastName;
  		quotedata.email = req.body.email;
  		quotedata.address = req.body.address;
  		quotedata.zip = req.body.zip;
  		quotedata.phoneNumber = req.body.phoneNumber;
  		quotedata.highBill = req.body.highBill;
  		quotedata.lowBill = req.body.lowBill;
  		quotedata.utilityName = req.body.utilityName;
  		quotedata.roofType = req.body.roofType;
  		quotedata.sold = req.body.sold;
  		quotedata.notes = req.body.notes;
  		quotedata.attachments = req.body.attachments;
  		quotedata.createdby = req.user.email;
			
			var quote = new quotemodel(quotedata);
			quote.insert(function(result, err){
				if(err)res.send(err);
				else res.send(result);
			});
		});
	});

	app.post('/quotes/:seq', function(req, res, next) {
		security.authenticationRequired(req, res, function(){
			/*TODO: validate the user input*/
			var query = {seq: req.params.seq};
			if(!req.user.admin) {
				query = {seq: req.params.seq, createdby: req.user.email};
			}
			quotemodel.findOne(query, function(err, doc) {
				if(doc != null){
					doc.quoteId = req.body.quoteId;
  				doc.firstName = req.body.firstName;
  				doc.lastName = req.body.lastName;
  				doc.email = req.body.email;
  				doc.address = req.body.address;
  				doc.zip = req.body.zip;
  				doc.phoneNumber = req.body.phoneNumber;
  				doc.highBill = req.body.highBill;
  				doc.lowBill = req.body.lowBill;
  				doc.utilityName = req.body.utilityName;
  				doc.roofType = req.body.roofType;
  				doc.sold = req.body.sold;
  				doc.notes = req.body.notes;
  				doc.attachments = req.body.attachments;
					doc.save(function(err, quote) {
						console.log("doc saved: " + JSON.stringify(quote));
						if(err) res.send(500, "Update Quote Failed");
						else res.send(quote);
					});
				} else {
					console.log("Did not find quote");
					if(err) res.send(500, "Update Quote Failed");
				}
			});
		});
	});

	/* user related routes */
	app.get('/users', function(req, res) {
		security.adminRequired(req, res, function() {
			usermodel.find({}, function(err, users) {
				res.send(users);					
			});			
		});
	});

	app.get('/users/:userid', function(req, res) {
		security.adminRequired(req, res, function() {
			usermodel.findOne({'userid':req.params.userid}, function(err, user) {
				console.log("looking for user with userid:" + req.params.userid);
				if(user)
					res.send(user);
				else
  				res.send(404, "User Not Found");
			});
		});
	});

	app.post('/users', function(req, res) {
		security.adminRequired(req, res, function() {

			/* TODO: validate the user input*/
  		var userdata = {};
			userdata.email = req.body.email;
			userdata.password = req.body.password;
			userdata.firstName = req.body.firstName;
			userdata.lastName = req.body.lastName;
			userdata.admin = req.body.admin;
			var user = new usermodel(userdata);
			user.insert(function(result, err){
				if(err)res.send(err);
				else res.send(result);
			});
		});
	});

	app.post('/users/:userid', function(req, res) {
		security.adminRequired(req, res, function() {
			usermodel.findOne({'userid':req.params.userid}, function(err, doc) {
				if(doc != null) {
					doc.email = req.body.email;
					doc.password = req.body.password;
					doc.firstName = req.body.firstName;
					doc.lastName = req.body.lastName;
					doc.admin = req.body.admin;
					doc.save(function(err, user) {
						console.log("doc saved: " + JSON.stringify(user));
						if(err) res.send(500, "Update User Failed");
						else res.send(user);
					});
				} else {
					console.log("Did not find user");
					if(err) res.send(500, "Update User Failed");
				}
			})		
		});
	});

	app.delete('/users/:id', function(req, res) {
		security.adminRequired(req, res, function() {
			for(var i = 0; i < config.security.usersCollection.length; i++) {
				if(config.security.usersCollection[i].id == req.body.id) {
					config.security.userCollections.splice(i, 1);
					break;
				}
			}		
		});
	});
	
	/* contact related routes */
	app.get('/contacts', function(req, res) {
		security.authenticationRequired(req, res, function() {
			contactmodel.find({}, function(err, contacts) {
				res.send(contacts);					
			});			
		});
	});

	app.get('/contacts/:contactid', function(req, res) {
		security.authenticationRequired(req, res, function() {
			contactmodel.findOne({'contactid':req.params.contactid}, function(err, contact) {
				console.log("looking for contact with contactid:" + req.params.contactid);
				if(contact)
					res.send(contact);
				else
  				res.send(404, "Contact Not Found");
			});
		});
	});

	app.post('/contacts', function(req, res) {
		security.authenticationRequired(req, res, function() {

			/* TODO: validate the user input*/
  		var contactdata = {};
			contactdata.firstName = req.body.firstName;
			contactdata.lastName = req.body.lastName;
			contactdata.company = req.body.company;
			contactdata.title = req.body.title;
			contactdata.email = req.body.email;
			contactdata.phone = req.body.phone;
			contactdata.street = req.body.street;
			contactdata.city = req.body.city;
			contactdata.state = req.body.state;
			contactdata.zip = req.body.zip;
			contactdata.country = req.body.country;
			coutactdata.note = req.body.note;
			var contact = new contactmodel(contactdata);
			contact.insert(function(result, err){
				if(err)res.send(err);
				else res.send(result);
			});
		});
	});

	app.post('/contacts/:contactid', function(req, res) {
		security.authenticationRequired(req, res, function() {
			contactmodel.findOne({'contactid':req.params.contactid}, function(err, doc) {
				if(doc != null) {
					doc.firstName = req.body.firstName;
					doc.lastName = req.body.lastName;
					doc.company = req.body.company;
					doc.title = req.body.title;
					doc.email = req.body.email;
					doc.phone = req.body.phone;
					doc.street = req.body.street;
					doc.city = req.body.city;
					doc.state = req.body.state;
					doc.zip = req.body.zip;
					doc.country = req.body.country;
					doc.note = req.body.note;
					doc.save(function(err, user) {
						console.log("doc saved: " + JSON.stringify(user));
						if(err) res.send(500, "Update User Failed");
						else res.send(user);
					});
				} else {
					console.log("Did not find user");
					if(err) res.send(500, "Update User Failed");
				}
			})		
		});
	});


	/* safety net */
	app.all('/*.html', function(req, res, next) {
		security.authenticationRequired(req, res, function() {
			next();
		}, true);
	}); 

}
