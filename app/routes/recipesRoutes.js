const express = require('express');
const router = express.Router();
const recipesController = require('./../controllers/recipesController')


router.get('/get-by-owner', recipesController.getAllRecipesByOwner);

router.get('/get-all', recipesController.getAll);

router.get('/cookbook',recipesController.getCookbook);

router.post('/add', recipesController.addRecipe);

router.delete('/remove', recipesController.removeByID);

module.exports = router;