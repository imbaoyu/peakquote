var util = require('util');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var rest = require('request');
var user = require('../models/users.js');

function MongoDBStrategy() {
  // Call the super constructor - passing in our user verification function
  // We use the email field for the username
  LocalStrategy.call(this, { usernameField: 'email' }, this.verifyUser.bind(this));

  // Serialize the user into a string (id) for storing in the session
  passport.serializeUser(function(user, done) {
    //done(null, user.userid); // Remember that MongoDB has this weird { _id: { $oid: 1234567 } } structure
    done(null, user._id); // Remember that MongoDB has this weird { _id: { $oid: 1234567 } } structure
  });

  // Deserialize the user from a string (id) into a user (via a call to the DB)
  passport.deserializeUser(this.get.bind(this));

  // We want this strategy to have a nice name for use by passport, e.g. app.post('/login', passport.authenticate('mongo'));
  this.name = MongoDBStrategy.name;
}

// MongoDBStrategy inherits from LocalStrategy
util.inherits(MongoDBStrategy, LocalStrategy);

MongoDBStrategy.name = "mongo";

MongoDBStrategy.prototype.get = function(id, done) {
	user.findOne({'_id':id},function(err, theuser) {
			done(err, theuser);
	});
};

MongoDBStrategy.prototype.findByEmail = function(email, done) {
	user.findOne({'email':email},function(err, theuser) {
			done(err, theuser);
	});
};

// Check whether the user passed in is a valid one
MongoDBStrategy.prototype.verifyUser = function(email, password, done) {
  this.findByEmail(email, function(err, theuser) {
    if (!err && theuser) {
      if (theuser.password !== password) {
				console.log("Password is wrong! " + theuser.password + " vs " + password);
        theuser = null;
      }
			console.log("password is correct for: \n" + theuser);
    }
    done(err, theuser);
  });
};

module.exports = MongoDBStrategy;

// TODO: Store hashes rather than passwords... node-bcrypt requires python to be installed :-(
/*var bcrypt = require('bcrypt');
function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

function checkPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}
*/
