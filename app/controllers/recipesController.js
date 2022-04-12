const { randomUUID } = require('crypto');
const { send } = require('process');
const recipesDataAccess = require('./../data-access/recipesDataAccess');
const dataAccessMdule = require('./../data-access/dataAccess');
const utilParser = require('./../utils/parser');

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
        recipesDataAccess.fetchRecipesByIDs(recipes_ids).then((rawRecipes) => {
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
    recipe = req.body;
    recipe.recipe_id = randomUUID();

    if (validateParams(recipe)){ // implement validateRecipes
        dataAccessMdule.fetchRecordsFromTable('Ingredients','*',(err,data) => {
            console.log('LOG: in callback function');
            if (!err){
                recipe.ingredients= checkAppearancesInDB(recipe.ingredients,data);
                console.log(data);
                console.log('LOG: Printing...')

            }
        })
        recipesDataAccess.insertRecipe(recipe);
        res.status(200);
    }
    else{
        res.status(400);
    }
}

const validateParams = (recipe) => {
    return true;
}
const checkAppearancesInDB = (recipeIngredients,dbIngredients) => {

    recipeIngredients.forEach(function(ingredient) {
        let name = ingredient.ingredient_name;
        found = dbIngredients.filter(function(ingredient) {
            
            return ingredient.ingredient_name.toLowerCase() == name.toLowerCase();
        });

        
    });

//     Object.keys(result).forEach(function(key) {
//         var row = result[key];
//         console.log(row.id);
    
// });
}
