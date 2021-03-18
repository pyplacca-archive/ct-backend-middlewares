const { validationResult } = require('express-validator');

function handleValidationErrors(req, res, callback) {
  // callback: this function is called when no errors are returned after validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors)
  } else {
    callback?.()
  }
}

module.exports = {
  handleValidationErrors
}