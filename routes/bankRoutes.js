const router = require("express").Router();
const { body } = require("express-validator");

const bankController = require("../controllers/bankController");

function validate(args) {
	const [field, errMsg] = args;
	return body(field).not().isEmpty().withMessage(errMsg).bail();
}

function idRequired() {
	return body("id", "An id is required").notEmpty()
}

// define bank routes
router.get("", bankController.getBankEntries);
router.post(
	"/add",
	[
		["name", "Bank name is required"],
		["address", "Bank address not specified"],
		["branch", "Bank's branch is not specified"],
		["accountNumber", "Please specify an account number"],
		["phoneNumber", "Please specify a phone number"],
	].map(validate),
	bankController.createBankEntry
);
router.delete(
	"/delete",
	idRequired(),
	bankController.deleteBankEntry
);
router.patch(
	"/update",
	idRequired(),
	bankController.updateBankEntry
);

module.exports = router;
