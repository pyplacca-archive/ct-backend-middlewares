const server = require('express')();
const bodyParser = require('body-parser');


// our makeshift database
const banks = {};

// our model
class Bank {
	constructor({name, address, branch}) {
		this.name = name;
		this.address = address;
		this.branch = branch;
		// assign an id to every new bank entry we can use to later update or delete it
		this.id = +new Date();
	}

	add = () => {
		banks[this.id] = this;
		return this;
	}

	static delete = id => {
		delete banks[id];
	}

	static modify = (id, data) => {
		const modified = Object.assign(banks[id], data);
		banks[id] = modified;
		return modified;
	}

	static get entries () {
		return Object.values(banks)
	}
}

/*
	Request handlers
*/
function createBankEntry (req, res) {
	const entry = new Bank(req.body).add();
	res.status(201).json({
		message: 'Bank added successfully',
		data: entry
	});
}

function deleteBankEntry (req, res) {
	const {id} = req.body;
	Bank.delete(id);
	res.status(204).json({
		message: 'Bank deleted successfully'
	})
}

function updateBankEntry (req, res) {
	const {id, data} = req.body;
	const updated = Bank.modify(id, data);
	res.json({
		message: `Bank '${id}' updated successfully.`,
		data: updated
	})
}

function getBankEntries (req, res) {
	res.json(Bank.entries);
}


// apply middleware(s)
server.use(bodyParser.json());

// our request listeners
server.get('/banks', getBankEntries);
server.post('/banks/add', createBankEntry)
server.delete('/banks/delete', deleteBankEntry)
server.patch('/banks/update', updateBankEntry)

// start server
server.listen(2021, () => {
	console.log('Server is running...')
});
