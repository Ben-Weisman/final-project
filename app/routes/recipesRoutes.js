const express = require('express');
const router = express.Router();
const recipesController = require('./../controllers/recipesController')


router.get('/get-by-owner', recipesController.getAllRecipesByOwner);

router.get('/get-all', recipesController.getAll); // done

router.get('/cookbook',recipesController.getCookbook); // done

router.post('/add-new', recipesController.createNewRecipe); //api/v1/recipes/add-new

router.delete('/remove', recipesController.removeByID);

module.exports = router;