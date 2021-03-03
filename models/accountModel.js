const mongoose = require('mongoose');

// define our database schema
const { Schema } = mongoose;

const accountSchema = new Schema({
	accountName: String,
	accountNumber: String,
	accountNumber: Number,
	accountType: String,
	bank: {type: Schema.Types.ObjectId, ref: 'bank'},
});

// initialize our database model with our defined schema
const Account = mongoose.model('account', accountSchema)

module.exports = Account;
