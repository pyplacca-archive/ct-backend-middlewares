const { Schema, model } = require("mongoose");

const userSchema = Schema({
	username: String,
	email: { type: String, required: true },
	password: { type: String, required: true },
	account: [
		{
			type: Schema.Types.ObjectId,
			ref: "account",
		},
	],
});

const User = model("user", userSchema);

module.exports = User;
