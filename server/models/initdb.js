var User = require('./users.js');
var Quote = require('./quotes.js');

module.exports = exports = {
	adminUsers: [ 
			{
				userid: '1',
				email: 'Arthur.Dent@earth.com',
				password: '42',
				firstName: 'Arthur',
				lastName: 'Dent',
				admin: false
			},
			{
				userid: '2',
				email: 'Zaphod.Beeblebrox@galaxy.com',
				password: '42',
				firstName: 'Zaphod',
				lastName: 'Beeblebrox',
				admin: true
			},
			{
				userid: '3',
				email: 'Ford.Prefect@galaxy.com',
				password: '42',
				firstName: 'Ford',
				lastName: 'Prefect',
				admin: false
			},
			{
				userid: '4',
				email: 'Trillian.Astra@earth.com',
				password: '42',
				firstName: 'Trillian',
				lastName: 'Astra',
				admin: false
			}
	],

	quoteMap: [
		{
    	"seq": 1,
			"createdby": 'Arthur.Dent@earth.com',
			"quoteId": "KIQD0",
    	"firstName": "Joe",
    	"lastName": "Doe",
    	"email": "Joe.Doe@utopia.com",
    	"address": "123 utopia street utopia land",
    	"zip": "54321",
    	"phoneNumber": "8762343456",
    	"highBill": "7766",
    	"lowBill": "6677",
    	"utiliyName": "smart roof",
    	"roofType": "wooden",
    	"sold": false,
    	"notes": "The Utopians need a 5000KW system installed on top of their city hall",
    	"attachments": "1. install manual\n2. contract\n3. survey\n4. poet"
  	},
  	{
    	"seq": 2,
			"createdby": 'Zaphod.Beeblebrox@galaxy.com', 
			"quoteId": "JULOA",
    	"firstName": "Jane",
    	"lastName": "Dolly",
    	"email": "Jane.Dolly@mania.com",
    	"address": "9999 mania street mania hill",
    	"zip": "78543",
    	"phoneNumber": "786345123",
    	"highBill": "10998",
    	"lowBill": "6543",
    	"utiliyName": "crazy roof",
    	"roofType": "steel",
    	"sold": true,
    	"notes": "The Manians urgently need a 7000KW system so they can generate enough energy to fly to the Moon",
    	"attachments": "1. introduction\n2. warranty\n"
		}
  ],

  createNewUser: function(element, index, array) {
		var user = new User(element);
		user.save(function(err, user) {
			if(err) return console.error(err);
			console.log(user.print());
		});
	},

	insertNewQuote: function(element, index, array) {
		var quote = new Quote(element);
		quote.save(function(err, quote) {
			if(err) return console.error(err);
			console.log(quote.print());
		});
	},

	addAdminUsers: function() {
		console.log('*** Inserting admin users in mongodb');
		this.adminUsers.forEach(this.createNewUser);
	},

	addFakeQuotes: function(done) {
		console.log('*** Inserting bogus quotes in mongodb');
		this.quoteMap.forEach(this.insertNewQuote);
	},

	removeAllUsers: function(done) {
		console.log('*** Removing all users in mongodb');
		User.remove({},function(err){
			if(err)return handlerError(err);
			console.log('All Users Removed!');
		});
	},

	removeAllQuotes: function(done) {
		console.log('*** Removing all quotes in mongodb');
		Quote.remove({},function(err){
		if(err)return handlerError(err);
			console.log('All Quotes Removed!');
		});
	}

}
