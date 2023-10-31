const db = require('./config'); // Importez votre configuration de base de données
const bcrypt = require('bcrypt');

// Inscription (signup)
const signup = (req, res) => {
  const { username, password } = req.body;

  // Hacher le mot de passe
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Erreur de hachage du mot de passe :', err);
      res.status(500).send('Erreur de hachage du mot de passe');
    } else {
      // Insérer l'utilisateur dans la base de données
      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      db.query(query, [username, hash], (err, result) => {
        if (err) {
          console.error('Erreur d\'inscription :', err);
          res.status(500).send('Erreur d\'inscription');
        } else {
          res.status(201).send('Inscription réussie');
        }
      });
    }
  });
};

// Connexion (signin)
const signin = (req, res) => {
  const { username, password } = req.body;

  // Vérifier l'utilisateur dans la base de données
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Erreur de connexion :', err);
      res.status(500).send('Erreur de connexion');
    } else {
      if (results.length > 0) {
        const user = results[0];
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            res.status(200).send('Connexion réussie');
          } else {
            res.status(401).send('Mot de passe incorrect');
          }
        });
      } else {
        res.status(401).send('Utilisateur non trouvé');
      }
    }
  });
};

module.exports = {
  signup,
  signin,
};
