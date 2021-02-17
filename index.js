const server = require('express')();
const bodyParser = require('body-parser');


// our makeshift database
const banks = [];

// our model
class Bank {
	constructor({name, address, branch}) {
		this.name = name;
		this.address = address;
		this.branch = branch
	}

	addEntry = () => {
		banks.push(this)
		return this
	}

	static get entries () {
		return banks
	}
}

/*
	Request handlers
*/
function createBankEntry (req, res) {
	const entry = new Bank(req.body).addEntry();
	res.status(201).json(entry);
}

function getBankEntries (req, res) {
	res.json(Bank.entries);
}


// apply middleware(s)
server.use(bodyParser.json());

// our request listeners
server.get('/banks', getBankEntries);
server.post('/banks/add', createBankEntry)

// start server
server.listen(2021, () => {
	console.log('Server is running...')
});
