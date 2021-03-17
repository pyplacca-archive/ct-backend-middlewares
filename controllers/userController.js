const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

function createUserEntry(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json(errors);
	} else {
		const { username, email, password } = req.body;
		const salt = bcrypt.genSaltSync();
		const hashedPassword = bcrypt.hashSync(password, salt);
		User({ email, password: hashedPassword })
			.save()
			.then(() => {
				res.status(201).json({
					message: "User created successfully",
					data: { username, email },
				});
			});
	}
}

module.exports = {
	createUserEntry,
};
