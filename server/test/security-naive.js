var rewire = require('rewire');
var security = rewire('../lib/security-naive');

var config = {
  usersCollection: 'users'
};

function mockUpUser(isAdmin) {
  return {
    id : '1234567',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    admin: !!isAdmin
  };
}

function mockUpPassport(test, authenticated) {
  var spies = { };
  security.__set__('passport', {
    use: function(fn) {
      spies.useCalled = true;
    },
    authenticate: function(strategy, callback) {
      spies.authenticateCalled = true;
      return function() { callback(); };
    }
  });
  return spies;
}

function mockUpNaiveStrategy(test) {
  var strategy = function(usersCollection) {
    test.equal(usersCollection, config.usersCollection);
  };
  strategy.name = 'naive';
  security.__set__('NaiveStrategy', strategy);
}

module.exports = {
  initialize: function(test) {
    mockUpNaiveStrategy(test);
    var passportSpy = mockUpPassport(test);
    security.initialize(config.usersCollection);
    test.ok(passportSpy.useCalled);
    test.done();
  },

  authenticationRequired: function(test) {
    // Setup mocks
    var req = {};
    var res = {
      json: function() { jsonCalled = true; }
    };
    var nextCalled = false;
    var jsonCalled = false;
    var next = function() { nextCalled = true; };

    // Test when user is unauthenticated
    req.isAuthenticated = function() { return false; };
    security.authenticationRequired(req, res, next);
    test.ok(jsonCalled);

    // Test when user is authenticated
    req.isAuthenticated = function() { return true; };
    security.authenticationRequired(req, res, next);
    test.ok(nextCalled);

    test.done();
  },

  adminRequired: function(test) {
    // Setup mocks
    var nextCalled = false;
    var jsonCalled = false;
    var req = {};
    var res = {
      json: function(status) {
        test.equal(status, 401);
        jsonCalled = true;
      }
    };
    var next = function() {
      nextCalled = true;
    };

    // Test when user is unauthenticated
    req.user = null;
    security.adminRequired(req, res, next);
    test.ok(jsonCalled);

    // Test when user is authenticated but not admin
    req.user = mockUpUser(false);
    security.adminRequired(req, res, next);
    test.ok(jsonCalled);

    // Test when user is admin
    req.user = mockUpUser(true);
    security.adminRequired(req, res, next);
    test.ok(nextCalled);

    test.done();
  },

  sendCurrentUser: function(test) {
    var jsonCalled = false;
    var req = { user : mockUpUser(false) };
    var res = {
      json: function(status, userInfo) {
        test.equal(status, 200);
        test.equal(userInfo.user.id, req.user.id);
        jsonCalled = true;
      },
      end: function() {}
    };
    security.sendCurrentUser(req, res, null);
    test.ok(jsonCalled);
    test.done();
  },

  login: function(test) {
    var req = {};

    var jsonCalled = false;
    var res = {
      json: function() { jsonCalled = true; }
    };

    var nextCalled = false;
    var next = function() { nextCalled = true; };

    var spies = mockUpPassport(test);
    security.login(req, res, next);
    test.ok(spies.authenticateCalled);
    test.ok(jsonCalled);
    test.done();
  },

  logoutPOST: function(test) {
    var logoutCalled = false;
    var req = {
      method: 'POST',
      logout: function() {
        logoutCalled = true;
      }
    };
    var redirectCalled = false;
    var sendCalled = false;
    var res = {
      redirect: function() {
        redirectCalled = true;
      },
      send: function() {
        sendCalled = true;
      }
    };
    // Test without POST
    security.logout(req, res);
    test.ok(logoutCalled);
    test.ok(!redirectCalled);
    test.ok(sendCalled);
    test.done();
  }
};
