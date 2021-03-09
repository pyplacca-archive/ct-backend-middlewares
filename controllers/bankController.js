// import api models
const Bank = require('../models/bankModel');
const Account = require('../models/accountModel');


function createBankEntry (req, res) {
	new Bank(req.body).save()
	.then(data => {
		res.status(201).json({
			message: 'Bank added successfully',
			data
		});
	})
	.catch(err => res.status(500).json({message: err}))
}

function deleteBankEntry ({body: {id}}, res) {
	Bank.findByIdAndDelete(id, (_, query) => {
		let [code, message] = [204, 'Bank deleted successfully'];

		if (query) {
			Account.deleteMany({ bank: { _id: id } })
			.then(() => {})
			.catch(err => console.log({
				'Account delete many error': err
			}))
		} else {
			[code, message] = [500, 'Failed to delete bank'];
		}

		res.status(code).json({ message, data: query || id })
	});
}

function updateBankEntry ({body: {id, data}}, res) {
	Bank.findByIdAndUpdate(id, data, (mgRes, mgErr) => {
		if (mgRes) {
			res.json({
				message: `Bank '${id}' updated successfully.`,
				data: mgRes
			})
		} else {
			res.status(500).json({
				message: mgErr
			})
		}
	})
}

function getBankEntries (req, res) {
	Bank
	.find()
	.then(docs => res.json(docs))
	.catch(err => res.status(500).json({message: err}))
}

module.exports = {
	createBankEntry,
	deleteBankEntry,
	updateBankEntry,
	getBankEntries
}
