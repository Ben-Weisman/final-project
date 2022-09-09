const express = require('express');
const router = express.Router();
const recipesController = require('./../controllers/recipesController')


router.post('/get-by-owner', recipesController.getAllRecipesByOwner); // done migrating --> Gets: {email:}

router.get('/get-all', recipesController.getAll); // done migrating

router.post('/cookbook',recipesController.getCookbook); // done migrating --> Gets: {email:}

router.post('/add-new', recipesController.createNewRecipe); // done migrating --> // Gets: {name:,description:,category:,ingredients:[{description:}],instructions:[{description:}],ownerEmail:,image:}

router.delete('/remove', recipesController.removeByID); // done migrating --> Gets: {id:}

router.post('/add-existing-to-cookbook', recipesController.addExistingRecipeToCookbook); // done migrating --> // Gets: {email:,id:}

router.delete('/remove-from-cookbook', recipesController.removeRecipeFromCookbook); // --> // Gets: {email:,recipeID:}

// Gets: {recipeID:,comments:[{email:,name:,dateCreated:,content:}],likes:[name1,name2,name3,...]}
// if no likes - assign likes to an empty list - []
// if no comments assign it to an empty list - []
router.post('/comment-likes',recipesController.addComment); 

module.exports = router;