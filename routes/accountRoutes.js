const router = require('express').Router();
const { body } = require('express-validator');

const accountController = require('../controllers/accountController')


// define routes for our bank api
router.get('', accountController.getAccountEntries);
router.post('/add', [
    ...[
        ['accountName', 'Account name is required'],
        ['accountNumber', 'Account number is required'],
        ['accountType', 'Please specify the account type'],
    ].map(arg => body(...arg).not().isEmpty())
], accountController.createAccountEntry);

module.exports = router;
