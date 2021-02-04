const conn = require('../mysqlConfig')
const jwt = require('jsonwebtoken')
const config = require('../config/jwt.secret')


exports.createMessage = (req, res, next) => {
  const message = req.body
  conn.query('INSERT INTO messages SET ?', message, function (
    error,
    results,
    fields
  ) {
    if (error) {
      return res.status(400).json(error)
    }
    return res.status(201).json({ message: 'Votre message a bien été posté !' })
  })
}