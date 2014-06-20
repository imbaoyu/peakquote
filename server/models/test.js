var mongoose = require('mongoose');
var initDB = require('./initdb.js');

mongoose.connect('mongodb://localhost/test', function(err, res){
	if(err) {
		console.log('Can not connect to mongodb');
	} else {
		console.log('Connected to mongodb');
		if(process.argv[2] == 'add') {
  		initDB.addAdminUsers();
			initDB.addFakeContacts();
			initDB.addFakeQuotes();

		} else if(process.argv[2] == 'remove') {
			initDB.removeAllContacts();
			initDB.removeAllQuotes();
  		initDB.removeAllUsers();
		} else {
			console.log('Invalid arguments');
		}
	}
});


