var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
		userid: { type: Number, min: 1 },
		email: String,
		password: String,
		firstName: String,
		lastName: String,
		admin: { type: Boolean, default: false },
		updated: { type: Date, default: Date.now }
});

userSchema.methods.print = function() {
	return JSON.stringify(this);
}

var User = mongoose.model('User', userSchema);

module.exports = exports = User;
