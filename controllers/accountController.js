// import api models
const { validationResult } = require('express-validator');
const Account = require('../models/accountModel');


function createAccountEntry (req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json(errors);
	} else {
		new Account(req.body).save()
		.then(data => {
			res.status(201).json({
				message: 'Account created successfully',
				data
			});
		})
		.catch(err => res.status(500).json({message: err}))
	}
}

function getAccountEntries (req, res) {
	Account
	.find()
	.populate('bank', 'name address accountNumber branch')
	.then(docs => res.json(docs))
	.catch(err => res.status(500).json({message: err}))
}

module.exports = {
	createAccountEntry,
	getAccountEntries
}
