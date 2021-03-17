const router = require("express").Router();
const { body } = require("express-validator");

const { createUserEntry } = require("../controllers/userController");
const User = require("../models/userModel");

function isRequired(field, msg) {
	return body(field).notEmpty().withMessage(msg).bail();
}

router.post(
	"/add",
	[
		isRequired("username", "Username is required")
			.isLength({ min: 2 })
			.withMessage("Username too short")
			.bail(),
		isRequired("email", "Email is required")
			.isEmail()
			.withMessage("Invalid email address")
			.bail()
			.custom((email) => {
				return new Promise((resolve, reject) => {
					User.findOne({ email }).then((user) => {
						if (user) {
							reject("This email already exists");
						} else {
							resolve();
						}
					});
				});
			}),
		isRequired("password", "Password is required")
			.trim()
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters long"),
	],
	createUserEntry
);

module.exports = router;
