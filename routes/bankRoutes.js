const router = require('express').Router();
const bankController = require('../controllers/bankController')


// define routes for our bank api
router.get('', bankController.getBankEntries);
router.post('/add', bankController.createBankEntry);
router.delete('/delete', bankController.deleteBankEntry);
router.patch('/update', bankController.updateBankEntry);

module.exports = router;
