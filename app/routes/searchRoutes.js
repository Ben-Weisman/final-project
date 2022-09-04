const express = require('express');
const { search } = require('../controllers/elasticWorker');
const router = express.Router();
const searchController = require('./../controllers/searchController');

router.post('/recipe',searchController.searchRecipes);

router.post('/recipe',searchController.searchIngredients);


module.exports = router;