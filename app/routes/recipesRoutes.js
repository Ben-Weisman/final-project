const express = require('express');
const router = express.Router();
const recipesController = require('./../controllers/recipesController')


router.get('/get-by-owner', recipesController.getAllRecipesByOwner); // done migrating

router.get('/get-all', recipesController.getAll); // done migrating

router.get('/cookbook',recipesController.getCookbook); // done migrating --> Gets: {email:}

router.post('/add-new', recipesController.createNewRecipe); // done migrating --> // Gets: {name:,description:,category:,ingredients:,instructions:,ownerEmail:}

router.delete('/remove', recipesController.removeByID); // done migrating

router.post('/add-existing-to-cookbook', recipesController.addExistingRecipeToCookbook);

router.get('/get-by-name', recipesController.getByName);

module.exports = router;