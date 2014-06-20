var express = require('express');
var passport = require('passport');
var NaiveStrategy = require('./naive-strategy');
var app = express();

var filterUser = function(user) {
  if (user) {
    return {
      user : {
        id: user.userid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin
      }
    };
  } else {
    return { user: null };
  }
};

var security = {
	initialize: function(userCollection) {
		passport.use(new NaiveStrategy(userCollection));
	},

  authenticationRequired: function(req, res, next, redirect) {
    console.log('authenticateRequired');
    if (req.isAuthenticated()) {
      next();
    } else {
			if(redirect) {
				res.redirect('/login.html');
			} else {
      	res.json(401, filterUser(req.user));
			}
    }
  },

  adminRequired: function(req, res, next, redirect) {
    console.log('adminRequired');
    if (req.user && req.user.admin ) {
      next();
    } else {
			if(redirect) {
				res.redirect('/login.html');
			} else {
      	res.json(401, filterUser(req.user));
			}
    }
  },

  sendCurrentUser: function(req, res, next) {
    res.json(200, filterUser(req.user));
    res.end();
  },

  login: function(req, res, next) {
    function authenticationHandler(err, user, info){
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login.html'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/index.html');
      });
    }
    return passport.authenticate(NaiveStrategy.name, authenticationHandler)(req, res, next);
  },

  logout: function(req, res, next) {
    req.logout();
		res.redirect('/login.html');
  }

};

module.exports = security;
