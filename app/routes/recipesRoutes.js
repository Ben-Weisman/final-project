const express = require('express');
const router = express.Router();
const recipesController = require('./../controllers/recipesController')


router.post('/get-by-owner', recipesController.getAllRecipesByOwner); // done migrating --> Gets: {email:}

router.get('/get-all', recipesController.getAll); // done migrating

router.post('/cookbook',recipesController.getCookbook); // done migrating --> Gets: {email:}

router.post('/add-new', recipesController.createNewRecipe); // done migrating --> // Gets: {name:,description:,category:,ingredients:[{description:}],instructions:[{description:}],ownerEmail:,image:}

router.delete('/remove', recipesController.removeByID); // done migrating --> Gets: {id:}

router.post('/add-existing-to-cookbook', recipesController.addExistingRecipeToCookbook); // done migrating --> // Gets: {email:,id:}

// router.delete('/remove-from-cookbook', recipesController.removeRecipeFromCookbook); // --> // Gets: {email:,id:}

router.post('/get-by-name', recipesController.getByName);

module.exports = router;