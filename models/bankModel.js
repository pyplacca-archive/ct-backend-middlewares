const mongoose = require('mongoose');

// define our database schema
const bankSchema = new mongoose.Schema({
	name: String,
	address: String,
	accountNumber: Number,
	phoneNumber: String,
	branch: String,
});

// initialize our database model with our defined schema
const Bank = mongoose.model('bank', bankSchema)

module.exports = Bank;
