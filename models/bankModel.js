const { Schema, model } = require('mongoose');


// define the schema for our bank model
const bankSchema = new Schema({
	name: String,
	address: String,
	accountNumber: Number,
	phoneNumber: String,
	branch: String,
	accounts: [{
		type: Schema.Types.ObjectId,
		ref: 'account'
	}]
});

// initialize our bank model with our defined schema
const Bank = model('bank', bankSchema)

module.exports = Bank;
