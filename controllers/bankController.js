const { handleValidationErrors } = require('../utils');
// import api models
const Bank = require('../models/bankModel');
const Account = require('../models/accountModel');


function createBankEntry(req, res) {
	handleValidationErrors(req, res, () => {
		Bank(req.body).save()
			.then(data => {
				res.status(201).json({
					message: 'Bank added successfully',
					data
				});
			})
			.catch(err => res.status(500).json({ message: err }))
	})

}

function deleteBankEntry(req, res) {
	handleValidationErrors(req, res, () => {
		const { body: { id } } = req;
		Bank.findByIdAndDelete(id, (_, query) => {
			let [code, message] = [204, 'Bank deleted successfully'];

			if (query) {
				Account.deleteMany({ bank: { _id: id } })
					.then(() => { })
					.catch(err => console.log({
						'Account delete many error': err
					}))
			} else {
				[code, message] = [500, 'Failed to delete. Bank with specified id not found.'];
			}

			res.status(code).json({ message, data: query || id })
		});
	})
}

function updateBankEntry(req, res) {
	handleValidationErrors(req, res, () => {
		const { body: { id, data } } = req;
		Bank.findByIdAndUpdate(id, data, (mgRes, mgErr) => {
			console.log({ mgRes, mgErr });
			mgRes
				? res.json({
					message: `Bank '${id}' updated successfully.`,
					data: mgRes
				})
				: res.status(500).json({ message: mgErr })
		})
	})
}

function getBankEntries(req, res) {
	Bank
		.find()
		.then(res.json)
		.catch(err => res.status(500).json({ message: err }))
}

module.exports = {
	createBankEntry,
	deleteBankEntry,
	updateBankEntry,
	getBankEntries
}
