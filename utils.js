const { validationResult } = require('express-validator');

function handleValidationErrors(req, res, callback) {
  /* 
    req: route request object
    res: route response object
    callback: function called after a successful validation
  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors)
  } else {
    callback?.()
  }
}

function respond(res, json = {}) {
  const { code, ...rest } = json;
  res.status(code || 200).json(rest)
}

module.exports = {
  handleValidationErrors,
  respond
}