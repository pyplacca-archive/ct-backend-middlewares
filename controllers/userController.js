const { handleValidationErrors } = require('../utils');
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

function createUserEntry(req, res) {
	handleValidationErrors(req, res, () => {
		let { username, email, password } = req.body;
		password = bcrypt.hashSync(password, bcrypt.genSaltSync());

		User({ email, password })
			.save()
			.then(() => {
				res.status(201).json({
					message: "User created successfully",
					data: { username, email },
				});
			});
	})
}

module.exports = {
	createUserEntry,
};
