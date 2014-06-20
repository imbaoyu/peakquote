var mongoose = require('mongoose');

var quoteSchema = mongoose.Schema({
		seq: {type: Number, min: 1},
		createdby: String,
		quoteId: String,
		firstName: String,
		lastName: String,
		email: String,
		address: String,
		zip: String,
		phoneNumber: String,
		highBill: String,
		lowBill: String,
		utilityName: String,
		roofType: String,
		sold: { type: Boolean, default: false },
		notes: String,
		attachments: String
});

quoteSchema.methods.print = function() {
	return JSON.stringify(this);
}

quoteSchema.methods.insert = function(cb) {
	var that = this;
	var tryinsert = function(callback){
		console.log("tryinsert procedure");
		that.model('Quote').findOne({}, 'seq').sort({seq:-1}).exec(function(err, quote) {
			console.log("exec procedure");
			if(quote == null) that.seq = 1;
			else that.seq = quote.seq + 1;
			that.save(function(err, quote) {
				console.log("save procedure");
				if(err) {
					if(err.code == 11000)tryinsert(cb);
					else callback(null, err);
				} else callback(quote, null);
			});
		});
	};
	tryinsert(cb);
}

var Quote = mongoose.model('Quote', quoteSchema);

module.exports = exports = Quote;
