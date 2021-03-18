const { handleValidationErrors, respond } = require('../utils');
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

function createUserEntry(req, res) {
	console.log(arguments)
	handleValidationErrors(req, res, () => {
		let { username, email, password } = req.body;
		password = bcrypt.hashSync(password, bcrypt.genSaltSync());

		User({ email, password, username })
			.save()
			.then(() => {
				res.status(201).json({
					message: "User created successfully",
					data: { username, email },
				});
			});
	})
}

function getUserEntry(req, res) {
	handleValidationErrors(req, res, () => {
		const { email, password } = req.body;
		User.findOne({ email })
			.then(user => {
				// check if a user with the given email exists in out database
				if (user) {
					const { email, username, password: hash } = user;
					// check if the given password matches that of the found user's 
					if (!bcrypt.compareSync(password, hash)) {
						respond(res, { code: 400, message: "Invalid password" })
					} else {
						respond(res, {
							message: 'Login successful',
							data: { email, username }
						})
					}
				} else {
					respond(res, {
						code: 400,
						message: "This email does not exist",
						value: email
					})
				}
			})
			.catch(err => respond({ code: 500, message: err }))
	})
}

module.exports = {
	createUserEntry,
	getUserEntry
};
