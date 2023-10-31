const db = require('./config');

// Créer une nouvelle catégorie
const createCategorie = (req, res) => {
  const { name, description } = req.body;
  const query = 'INSERT INTO categories (name, description) VALUES (?, ?)';
  db.query(query, [name, description], (err, result) => {
    if (err) {
      console.error('Erreur lors de la création de la catégorie :', err);
      res.status(500).send('Erreur lors de la création de la catégorie');
    } else {
      res.status(201).send('Catégorie créée avec succès');
    }
  });
};

// Obtenir toutes les catégories
const getAllCategories = (req, res) => {
  const query = 'SELECT * FROM categories';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des catégories :', err);
      res.status(500).send('Erreur lors de la récupération des catégories');
    } else {
      res.json(results);
    }
  });
};

// Obtenir une catégorie par son ID
const getCategorieById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM categories WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de la catégorie :', err);
      res.status(500).send('Erreur lors de la récupération de la catégorie');
    } else if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send('Catégorie non trouvée');
    }
  });
};

// Mettre à jour une catégorie par son ID
const updateCategorie = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const query = 'UPDATE categories SET name = ?, description = ? WHERE id = ?';
  db.query(query, [name, description, id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de la catégorie :', err);
      res.status(500).send('Erreur lors de la mise à jour de la catégorie');
    } else {
      res.send('Catégorie mise à jour avec succès');
    }
  });
};

// Supprimer une catégorie par son ID
const deleteCategorie = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM categories WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de la catégorie :', err);
      res.status(500).send('Erreur lors de la suppression de la catégorie');
    } else {
      res.send('Catégorie supprimée avec succès');
    }
  });
};

module.exports = {
  createCategorie,
  getAllCategories,
  getCategorieById,
  updateCategorie,
  deleteCategorie,
};
