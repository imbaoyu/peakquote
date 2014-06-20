var util = require('util');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//naive strategy, user colleciton is an array of js objects {email: 'email', password: 'pass'}
function NaiveStrategy(collection) {
	this.userCollection = collection;

	LocalStrategy.call(this, {usernameField: 'email'}, this.verifyUser.bind(this));
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(this.get.bind(this));
	this.name = NaiveStrategy.name;
}

util.inherits(NaiveStrategy, LocalStrategy);

NaiveStrategy.name="naive";

NaiveStrategy.prototype.iterate = function(collection, id, cb) {
	var user = null;
	for(var i = 0; i < collection.length; i++) {
		user = collection[i];
		if(user.id === id) {
			cb(false, user);
			return;
		}
	}
	cb("No user found", null);
};

NaiveStrategy.prototype.get = function(id, done) {
	this.iterate(this.userCollection, id, done);	
};

NaiveStrategy.prototype.verifyUser = function(email, password, done) {
	var user = null;
	for(var i = 0; i < this.userCollection.length; i++) {
		user = this.userCollection[i];
		if(user.email === email && user.password === password) {
				done(false, user);
				return;
			}
	}
	done(false, false);
};

module.exports = NaiveStrategy;
