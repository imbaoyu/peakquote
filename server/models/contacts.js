var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
	contactid: {type: Number, min: 1},
	firstName: String,
	lastName: String,
	company: String,
	title: String,
	email: String,
	phone: Array,
	street: String,
	city: String,
	state: String,
	zip: String,
	country: String,
	note: String
});

contactSchema.methods.print = function() {
	return JSON.stringify(this);
};

contactSchema.methods.insert = function(cb) {
	var that = this;
	var tryinsert = function(callback){
		that.model('Contact').findOne({}, 'contactid').sort({contactid:-1}).exec(function(err, contact) {
			if(contact == null) that.contactid = 1;
			else that.contactid = contact.contactid + 1;
			that.save(function(err, contact) {
				if(err) {
					if(err.code == 11000)tryinsert(cb);
					else callback(null, err);
				} else callback(contact, null);
			});
		});
	};
	tryinsert(cb);
};

var Contact = mongoose.model('Contact', contactSchema);

module.exports = exports = Contact;


