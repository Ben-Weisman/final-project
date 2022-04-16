const { randomUUID } = require('crypto');
const { send } = require('process');
const recipesDataAccess = require('./../data-access/recipesDataAccess');
const dataAccessMdule = require('./../data-access/dataAccess');
const utilParser = require('./../utils/parser');
const Tables = require('./../utils/dbEnums');
// Get a recipe per user(email)
module.exports.getAllRecipesByOwner = (req,res) =>{

    email = req.body.email;
    recipesDataAccess.fetchRecipesByOwner(email).then((data) => {
        recipes = utilParser.parseToRecipe(data);
        console.log('LOG: recipes => ' + recips);
    })
    
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

// get all recipes from db - done
module.exports.getAll = (req,res) =>{
    recipesDataAccess.fetchAll().then ((data) => {
        recipes = utilParser.parseToRecipe(data);
        res.status(200);
        res.contentType('application/json');
        res.send(recipes);
    }).catch((err) => {
        res.status(500);
    });
 
}


// get all recipes of a user's cookbook. done
module.exports.getCookbook = (req,res) => {
    user_id = req.body.user_id;
    recipesDataAccess.fetchCookbook(user_id).then ((recipes_ids) => {
        let idsArray = recipes_ids.map(item => item.recipe_id);
        recipesDataAccess.fetchRecipesByIDs(idsArray).then((rawRecipes) => {
            recipes = utilParser.parseToRecipe(rawRecipes);
            res.status(200);
            res.contentType('application/json');
            res.send(recipes);
        }).catch((err) => {
            res.status(500);
        });

    });
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
    let recipeDetailsRecord = {
        recipeID: randomUUID(),
        recipeName: req.body.recipe_name,
        description: req.body.recipe_description,
        category: req.body.category,
        ownerID: req.body.owner_id,
        uploadedDate: new Date().toISOString().slice(0,10),
        deletedByOwner: false,
        public: true
    }

    let ingredientsRecord = generateIngredientsJsonRecordValues(req.body.ingredients);
    let instructionsRecord = generateIngredientsJsonRecordValues(req.body.instructions);
    
    
    recipesDataAccess.insertNewRecord(Tables.Tables.RECIPES_TABLE,recipeDetailsRecord);
    recipesDataAccess.insertNewRecord(Tables.Tables.RECIPE_INGREDIENT_TABLE,ingredientsRecord);
    recipesDataAccess.insertNewRecord(Tables.Tables.INGREDIENTS_TABLE,ingredientsRecord);
    recipesDataAccess.insertNewRecord(Tables.Tables.RECIPE_INSTRUCTIONS_TABLE,instructionsRecord);
    recipesDataAccess.insertNewRecord(Tables.Tables.INSTRUCTIONS_TABLE,instructionsRecord);
}

