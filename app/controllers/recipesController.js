
const { randomUUID } = require('crypto');
const { send } = require('process');
const recipesDataAccess = require('./../data-access/recipesDataAccess');
const dataAccessMdule = require('./../data-access/dataAccess')

// Get a recipe per user(email)
module.exports.getAllRecipesByOwner = (req,res) =>{

    email = req.body.email;
    recipeRecord = recipesDataAccess.fetchRecipesByOwner(email);
    
    if (recipeRecord){
        res.status(200);
        resJson = recipeRecord;
        res.contentType('application/json');
        res.send(resJson);
    }
    else{
        res.status(401);
    }
    
}

// get all recipes from db
module.exports.getAll = (req,res) =>{
    recipes = recipesDataAccess.fetchAll();
    res.status(200);
    res.contentType('application/json');
    res.send(recipes);
}


module.exports.getCookbook = (req,res) => {
    user_email = req.body.email;
    cookbook = recipesDataAccess.fetchCookbook(user_email);
    if (cookbook){
        res.status(200);
        res.contentType('application/json');
        res.send(cookbook);
    }
    else{
        res.status(500);
    }
}


// remove a recipe by a given id from the db
module.exports.removeByID = (req,res) =>{
    id = req.body.id;
    if (recipesDataAccess.deleteByID(id)){
        res.status(200);
    }
    else{
        res.status(403);
    }
    
}



// insert new recipe to db -- Should be moved to Scraper API entry points.
module.exports.createNewRecipe = (req,res) =>{
    recipe = req.body;
    recipe.recipe_id = randomUUID();

    if (validateParams(recipe)){ // implement validateRecipes
        dataAccessMdule.fetchRecordsFromTable('Ingredients','*',(err,data) => {
            console.log('LOG: in callback function');
             recordsToInsert = findExistingRecords(recipe.ingredients,data);
        })
        recipesDataAccess.insertRecipe(recipe);
        res.status(200);
    }
    else{
        res.status(400);
    }
}

const findExistingRecords = (recipeIngredients,data) => {
    for (let i = 0;i < recipeIngredients.length; i++){
        
    }
};