const router = require('express').Router();
const { body } = require('express-validator');

const bankController = require('../controllers/bankController')


function validate (args) {
    const [field, errMsg] = args;
    return body(field).not().isEmpty().withMessage(errMsg)
}

// define routes for our bank api
router.get('', bankController.getBankEntries);
router.post(
    '/add', 
    [
        ['name', 'Bank name is required'],
        ['address', 'Bank address not specified'],
        ['branch', 'Bank\'s branch is not specified'],
        ['accountNumber', 'Please specify an account number'],
        ['phoneNumber', 'Please specify a phone number']
    ].map(validate),
    bankController.createBankEntry
);
router.delete(
    '/delete', 
    validate('id', 'An id is required.'),
    bankController.deleteBankEntry
);
router.patch(
    '/update', 
    validate('id', 'An id is required.'),
    bankController.updateBankEntry
);

module.exports = router;
