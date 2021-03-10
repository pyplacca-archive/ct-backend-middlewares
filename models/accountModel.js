const { Schema, model } = require('mongoose');


// define the schema for our account model
const accountSchema = new Schema({
	accountName: String,
	accountNumber: Number,
	accountType: String,
	bank: {
		type: Schema.Types.ObjectId,
		ref: 'bank'
	},
});

// initialize our account model with our defined schema
const Account = model('account', accountSchema)

module.exports = Account;
