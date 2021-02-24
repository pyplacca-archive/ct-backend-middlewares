const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
	name: String,
	address: String,
	accountNumber: Number,
	phoneNumber: String,
	branch: String,
});

const Bank = mongoose.model('bank', bankSchema)

module.exports = Bank;
