const express = require('express');
const { search } = require('../controllers/elasticWorker');
const router = express.Router();
const searchController = require('./../controllers/searchController');

router.post('/recipe',searchController.searchRecipes); // Gets: {fieldName: name/owner, value:}

router.post('/ingredients',searchController.searchIngredients); // Gets: {ingredients: [ingredient1,ingredient2,...]}

router.post('/category',searchController.searchByCategory) // Gets: {categories: [category1,category2,...]}

module.exports = router;