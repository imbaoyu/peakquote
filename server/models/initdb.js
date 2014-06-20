var User = require('./users.js');
var Quote = require('./quotes.js');
var Contact = require('./contacts.js');

module.exports = exports = {
	adminUsers: [ 
			{
				userid: 1,
				email: 'Arthur.Dent@earth.com',
				password: '42',
				firstName: 'Arthur',
				lastName: 'Dent',
				admin: false
			},
			{
				userid: 2,
				email: 'Zaphod.Beeblebrox@galaxy.com',
				password: '42',
				firstName: 'Zaphod',
				lastName: 'Beeblebrox',
				admin: true
			},
			{
				userid: 3,
				email: 'Ford.Prefect@galaxy.com',
				password: '42',
				firstName: 'Ford',
				lastName: 'Prefect',
				admin: false
			},
			{
				userid: 4,
				email: 'Trillian.Astra@earth.com',
				password: '42',
				firstName: 'Trillian',
				lastName: 'Astra',
				admin: false
			}
	],

	quoteMap: [
		{
    	seq: 1,
			createdby: 'Arthur.Dent@earth.com',
			quoteId: 'KIQD0',
    	firstName: 'Joe',
    	lastName: 'Doe',
    	email: 'Joe.Doe@utopia.com',
    	address: '123 utopia street utopia land',
    	zip: '54321',
    	phoneNumber: '8762343456',
    	highBill: '7766',
    	lowBill: '6677',
    	utiliyName: 'smart roof',
    	roofType: 'wooden',
    	sold: false,
    	notes: 'The Utopians need a 5000KW system installed on top of their city hall',
    	attachments: '1. install manual\n2. contract\n3. survey\n4. poet'
  	},
  	{
    	seq: 2,
			createdby: 'Zaphod.Beeblebrox@galaxy.com', 
			quoteId: 'JULOA',
    	firstName: 'Jane',
    	lastName: 'Dolly',
    	email: 'Jane.Dolly@mania.com',
    	address: '9999 mania street mania hill',
    	zip: '78543',
    	phoneNumber: '786345123',
    	highBill: '10998',
    	lowBill: '6543',
    	utiliyName: 'crazy roof',
    	roofType: 'steel',
    	sold: true,
    	notes: 'The Manians urgently need a 7000KW system so they can generate enough energy to fly to the Moon',
    	attachments: '1. introduction\n2. warranty\n'
		}
  ],

	contactList: [
		{
			contactid: 1,
			firstName: 'Agrajag',
			lastName: 'W',
			company: 'Agra',
			title: 'Owner',
			email: 'Agrajag.W@Agra.com',
			phone: ['5612893564', '7081992134'],
			street: 'agra street',
			city: 'jag',
			state: 'FL',
			zip: '34213',
			country: 'US',
			note: 'Agrajag is a small business owner'
		},	
		{
			contactid: 2,
			firstName: 'Alice',
			lastName: 'Beeblebrox',
			company: 'Beeblebrox inc',
			title: 'Director',
			email: 'Alice@Beeblebroxinc.com',
			phone: ['5613459087', '9871234532'],
			street: 'Astral Crecent',
			city: 'Zoovroozlechester',
			state: 'Betelgeuse',
			zip: '44531',
			country: 'Betelegeyse V',
			note: 'Mrs. Beeblebrox is the createive director of Beeblebrox inc'
		},	
		{
			contactid: 3,
			firstName: 'Allmighty',
			lastName: 'Bob',
			company: 'mighty deity',
			title: 'Deity',
			email: 'allmightybob@mighty.com',
			phone: ['5613478934', '7634212312'],
			street: 'Lamuella',
			city: 'Old Thrasgbarg',
			state: 'Lamuella',
			zip: '42342',
			country: 'Lamualla',
			note: 'Mostly harmless'
		},	
		{
			contactid: 4,
			firstName: 'Constant',
			lastName: 'Mown',
			company: 'Vogon Construction Fleet',
			title: 'Captain',
			email: 'Constant@Vogon.com',
			phone: ['5612190876', '8763212341'],
			street: 'Vogon Ship',
			city: 'Jeltz',
			state: 'Jeltz',
			zip: '34231',
			country: 'Vogon',
			note:  'Constant is a vogon with ethics and agility'
		}	
	],


  addNewUser: function(element, index, array) {
		var user = new User(element);
		user.save(function(err, user) {
			if(err) return console.error(err);
			console.log(user.print());
		});
	},

	addNewQuote: function(element, index, array) {
		var quote = new Quote(element);
		quote.save(function(err, quote) {
			if(err) return console.error(err);
			console.log(quote.print());
		});
	},

	addNewContact: function(element, index, array) {
		var contact = new Contact(element);
		contact.save(function(err, user) {
			if(err) return console.error(err);
			console.log(contact.print());
		});
	},

	addAdminUsers: function() {
		console.log('*** Inserting admin users in mongodb');
		this.adminUsers.forEach(this.addNewUser);
	},

	addFakeQuotes: function() {
		console.log('*** Inserting bogus quotes in mongodb');
		this.quoteMap.forEach(this.addNewQuote);
	},

	addFakeContacts: function() {
		console.log('*** Inserting bogus contacts in mongodb');
		this.contactList.forEach(this.addNewContact);
	},

	removeAllUsers: function() {
		console.log('*** Removing all users in mongodb');
		User.remove({},function(err){
			if(err)return handlerError(err);
			console.log('All Users Removed!');
		});
	},

	removeAllQuotes: function() {
		console.log('*** Removing all quotes in mongodb');
		Quote.remove({},function(err){
			if(err)return handlerError(err);
			console.log('All Quotes Removed!');
		});
	},

	removeAllContacts: function() {
		console.log('*** Removing all contacts in mongodb');
		Contact.remove({}, function(err) {
			if(err)return handlerError(err);
			console.log('All Contacts Removed!');
		});
	}

}
