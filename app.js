const express = require('express');
const authController = require('./authController');
const annonceController = require('./annonceController');
const categorieController = require('./categorieController');
const app = express();
const port = 3000;

// Middleware pour le corps de la demande (body-parser)
app.use(express.json());

// Routes d'inscription (signup)
app.post('/signup', authController.signup);

// Route de connexion (signin)
app.post('/signin', authController.signin);

//route annnonce 
app.post('/annonces', annonceController.createAnnonce);
app.get('/annonces', annonceController.getAllAnnonces);
app.get('/annonces/:id', annonceController.getAnnonceById);
app.put('/annonces/:id', annonceController.updateAnnonce);
app.delete('/annonces/:id', annonceController.deleteAnnonce);

// Routes pour les catégories
app.post('/categories', categorieController.createCategorie);
app.get('/categories', categorieController.getAllCategories);
app.get('/categories/:id', categorieController.getCategorieById);
app.put('/categories/:id', categorieController.updateCategorie);
app.delete('/categories/:id', categorieController.deleteCategorie);

// Le reste de votre configuration...

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
