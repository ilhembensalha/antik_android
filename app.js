const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const config = require('./config');

const app = express();
const port = 3000;

// Middleware pour le corps de la demande (body-parser)
app.use(express.json());

// Connexion à la base de données MySQL
const db = mysql.createConnection(config.db);
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

// Routes d'inscription (sign-up)
app.post('/signup', (req, res) => {
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
});

// Route de connexion (sign-in)
app.post('/signin', (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
