const router = require("express").Router();
const { body } = require("express-validator");
const bcrypt = require('bcryptjs');

const usrCtrlr = require("../controllers/userController");
const User = require("../models/userModel");

function isRequired(field, msg) {
	return body(field).notEmpty().withMessage(msg).bail();
}

router.post(
	"/signup",
	[
		isRequired("username", "Username is required")
			.isLength({ min: 2 })
			.withMessage("Username too short")
			.bail(),
		isRequired("email", "Email is required")
			.isEmail()
			.withMessage("Invalid email address")
			.bail()
			.custom(email =>
				User.findOne({ email }).then(
					user => user && Promise.reject("This email already exists")
				)
			),
		isRequired("password", "Password is required")
			.trim()
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters long"),
	],
	usrCtrlr.createUserEntry
);

router.get(
	'/login',
	[
		isRequired('email', 'Email address is required'),
		isRequired('password', 'Password is required')
	],
	usrCtrlr.getUserEntry
)

module.exports = router;
