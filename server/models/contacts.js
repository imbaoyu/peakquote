var mongoose = require('mongoose');

var contactSchema = mongoose.Schema(
	firstName: String,
	lastName: String,
	company: String,
	title: String,
	email: String,
	phone: Array,
	address: String,
	city: String,
	state: String,
	zip: String,
	country: String,
	note: String
);

quoteSchema.methods.print = function() {
	return JSON.stringify(this);
}

var Contact = mongoose.model('Contact', contactSchema);

module.exports = exports = Contact;


