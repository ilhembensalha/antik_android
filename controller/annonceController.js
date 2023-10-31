const db = require('./config'); // Importez votre configuration de base de données

// Créez une nouvelle annonce
const createAnnonce = (req, res) => {
  const { title, description } = req.body;
  const query = 'INSERT INTO annonces (title, description,categorie_id) VALUES (?, ?,?)';
  db.query(query, [title, description], (err, result) => {
    if (err) {
      console.error('Erreur lors de la création de l\'annonce :', err);
      res.status(500).send('Erreur lors de la création de l\'annonce');
    } else {
      res.status(201).send('Annonce créée avec succès');
    }
  });
};

// Obtenez toutes les annonces
const getAllAnnonces = (req, res) => {
  const query = 'SELECT * FROM annonces';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des annonces :', err);
      res.status(500).send('Erreur lors de la récupération des annonces');
    } else {
      res.json(results);
    }
  });
};

// Obtenez une annonce par son ID
const getAnnonceById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM annonces WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'annonce :', err);
      res.status(500).send('Erreur lors de la récupération de l\'annonce');
    } else if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send('Annonce non trouvée');
    }
  });
};

// Mettez à jour une annonce par son ID
const updateAnnonce = (req, res) => {
    const { id } = req.params;
    const { title, description, categorie_id } = req.body;
    const query = 'UPDATE annonces SET title = ?, description = ?, categorie_id = ? WHERE id = ?';
    db.query(query, [title, description, categorie_id, id], (err, result) => {
      if (err) {
        console.error('Erreur lors de la mise à jour de l\'annonce :', err);
        res.status(500).send('Erreur lors de la mise à jour de l\'annonce');
      } else {
        res.send('Annonce mise à jour avec succès');
      }
    });
  };
  
  module.exports = {
    updateAnnonce,
  };
  

// Supprimez une annonce par son ID
const deleteAnnonce = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM annonces WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de l\'annonce :', err);
      res.status(500).send('Erreur lors de la suppression de l\'annonce');
    } else {
      res.send('Annonce supprimée avec succès');
    }
  });
};

module.exports = {
  createAnnonce,
  getAllAnnonces,
  getAnnonceById,
  updateAnnonce,
  deleteAnnonce,
};
