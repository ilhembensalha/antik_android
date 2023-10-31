const db = require('./config'); // Importez votre configuration de base de données
const bcrypt = require('bcrypt');

// Créer un nouvel utilisateur (Create)
const createUser = (req, res) => {
  const { username, email, password } = req.body;

  // Hacher le mot de passe
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Erreur de hachage du mot de passe :', err);
      res.status(500).send('Erreur de hachage du mot de passe');
    } else {
      // Insérer l'utilisateur dans la base de données
      const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(query, [username, email, hash], (err, result) => {
        if (err) {
          console.error('Erreur de création de l\'utilisateur :', err);
          res.status(500).send('Erreur de création de l\'utilisateur');
        } else {
          res.status(201).send('Utilisateur créé avec succès');
        }
      });
    }
  });
};

// Obtenir tous les utilisateurs (Read)
const getUsers = (req, res) => {
  const query = 'SELECT id, username, email FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      res.status(500).send('Erreur lors de la récupération des utilisateurs');
    } else {
      res.json(results);
    }
  });
};

// Obtenir un utilisateur par son ID (Read)
const getUserById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT id, username, email FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'utilisateur :', err);
      res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
    } else if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send('Utilisateur non trouvé');
    }
  });
};

// Mettre à jour un utilisateur par son ID (Update)
const updateUser = (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  const query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
  db.query(query, [username, email, id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', err);
      res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur');
    } else {
      res.send('Utilisateur mis à jour avec succès');
    }
  });
};

// Supprimer un utilisateur par son ID (Delete)
const deleteUser = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', err);
      res.status(500).send('Erreur lors de la suppression de l\'utilisateur');
    } else {
      res.send('Utilisateur supprimé avec succès');
    }
  });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
