// import api models
const { handleValidationErrors } = require('../utils');
const Account = require('../models/accountModel');


function createAccountEntry(req, res) {
	handleValidationErrors(req, res, () => {
		new Account(req.body).save()
			.then(data => {
				res.status(201).json({
					message: 'Account created successfully',
					data
				});
			})
			.catch(err => res.status(500).json({ message: err }))

	})
}

function getAccountEntries(req, res) {
	Account
		.find()
		.populate('bank', 'name address accountNumber branch')
		.then(docs => res.json(docs))
		.catch(err => res.status(500).json({ message: err }))
}

module.exports = {
	createAccountEntry,
	getAccountEntries
}
