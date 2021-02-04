// Middleware qui vient vérifier le TOKEN à chaque emprunt d'une route

const jwt = require('jsonwebtoken')
const config = require('../config/jwt.secret') // On récupère la clé pour le TOKEN
