const express = require('express');
const router = express.Router();
const recipesController = require('./../controllers/recipesController')


router.get('/get-by-owner', recipesController.getAllRecipesByOwner);

router.get('/get-all', recipesController.getAll); // done

router.post('/cookbook',recipesController.getCookbook); // done

router.post('/add-new', recipesController.createNewRecipe); // done

router.delete('/remove', recipesController.removeByID);

module.exports = router;