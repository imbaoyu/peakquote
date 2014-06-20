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

userSchema.methods.insert = function(cb) {
	var that = this;
	var tryinsert = function(callback){
		that.model('User').findOne({}, 'userid').sort({userid:-1}).exec(function(err, user) {
			if(user == null) that.userid = 1;
			else that.userid = user.userid + 1;
			that.save(function(err, user) {
				if(err) {
					if(err.code == 11000)tryinsert(cb);
					else callback(null, err);
				} else callback(user, null);
			});
		});
	};
	tryinsert(cb);
	
}

var User = mongoose.model('User', userSchema);

module.exports = exports = User;
