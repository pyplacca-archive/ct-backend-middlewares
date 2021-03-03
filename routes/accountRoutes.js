const router = require('express').Router();
const accountController = require('../controllers/accountController')


// define routes for our bank api
router.get('', accountController.getAccountEntries);
router.post('/add', accountController.createAccountEntry);

module.exports = router;
