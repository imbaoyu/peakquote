var rewire = require("rewire");
var NaiveStrategy = rewire('../lib/naive-strategy');

var testUserCollection = [{
	id: '5054bb33e4b024584b8f3419',
	email: 'arthur.dent@earth.com',
	password: 'no panic'
}];

module.exports = {
	testGet: function(test) {
		var strategy = new NaiveStrategy(testUserCollection);
		strategy.get(testUserCollection[0].id, function(err, result) {
			test.ok(!err);
			test.ok(result);
			test.equal(result.email, testUserCollection[0].email);
			test.done();
		});
	},

	testVerifyUser: function(test) {
		var strategy = new NaiveStrategy(testUserCollection);
		strategy.verifyUser('arthur.dent@earth.com', 'no panic', function(err, user) {
			test.ok(!err);
			test.ok(user);
			test.done();
		});
	}
};
