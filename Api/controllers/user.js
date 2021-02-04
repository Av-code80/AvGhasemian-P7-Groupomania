const conn = require('../mysqlConfig')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/jwt.secret')

exports.signup = (req, res, next) => {
  const user = req.body
  bcrypt.hash(user.password, 10).then((hash) => {
    user.password = hash
    conn.query('INSERT INTO users SET ?', user, function (
      error,
      results,
      fields
    ) {
      if (error) {
        // Si erreur de la requête
        console.log(error) // La console du serveur affiche l'erreur
        return res.status(400).json(error.sqlMessage)
      } // Et retourne uniquement le message de l'erreur au front
      return res.status(201).json({
        message:
          'Votre compte a bien été créé ! Vous pouvez maintenant vous connecter.'
      })
    })
  })
}