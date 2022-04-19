const { randomUUID } = require('crypto');
const { send } = require('process');
const recipesDataAccess = require('./../data-access/recipesDataAccess');
const dataAccessMdule = require('./../data-access/dataAccess');
const utilParser = require('./../utils/parser');
const Tables = require('./../utils/dbEnums');
const e = require('express');
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
    console.log('LOG: in getAll');
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


const generateIngredientsObjectWithIDs = (ingredients,recipeID) => {
    res = {ingredients:[]};
    ingredients.forEach(ingredient => {
        let id = randomUUID();
        res.ingredients.push({ingredient_id:id,name:ingredient,recipe_id:recipeID});
    });
    return res;
 }


const generateInstructionsObjectWithIDs = (instructions,recipeID) => {
    res = {instructions:[]};
    let i=1;
    instructions.forEach(instruction => {
        let id = randomUUID();
        res.instructions.push({instruction_id:id,name:instruction,recipe_id:recipeID,step:i});
        i++;
    });
    return res;
}
const create = (inputData) => {
    return new Promise((resolve,reject) => {
           // Insert to Recipes table
    let recipeDetailsRecord = generateRecipeDetailsJSON(inputData);
    recipesDataAccess.insertNewRecord(Tables.Tables.RECIPES_TABLE,recipeDetailsRecord).then((data) => {
        console.log(data);
    }).catch((err) => {
        reject(err);
    });


    // // Insert to Ingredients table
    
    let ingredientObjDetails = generateIngredientsObjectWithIDs(inputData.ingredients,recipeDetailsRecord.recipeID);
    recipesDataAccess.insertNewRecord(Tables.Tables.INGREDIENTS_TABLE,ingredientObjDetails.ingredients).then((data) => {
        console.log(data);
    }).catch((err) => {
        reject(err);
    });
    recipesDataAccess.insertNewRecord(Tables.Tables.RECIPE_INGREDIENT_TABLE,ingredientObjDetails.ingredients).then((data) => {
        console.log(data);
    }).catch((err) => {
        reject(err);
    });

    // // Insert to Recipe_Ingredients table
    let instructionsObjDetails = generateInstructionsObjectWithIDs(inputData.recipe_instructions,recipeDetailsRecord.recipeID);
    
    recipesDataAccess.insertNewRecord(Tables.Tables.INSTRUCTIONS_TABLE,instructionsObjDetails.instructions).then((data) => {
        console.log(data);
    }).catch((err) => {
        reject(err);
    });
    recipesDataAccess.insertNewRecord(Tables.Tables.RECIPE_INSTRUCTIONS_TABLE,instructionsObjDetails.instructions).then((data) => {
        console.log(data);
    }).catch((err) => {
        reject(err);
    });
    obj = {
        recipe_id:recipeDetailsRecord.recipeID,
         user_id:recipeDetailsRecord.ownerID
    }
    recipesDataAccess.insertNewRecord(Tables.Tables.COOKBOOK_TABLE,obj).then((data) => {
        console.log(data);
        resolve(data);
    }).catch((err) => {
        reject(err);
    })
    });
}
// insert new recipe to db -- Should be moved to Scraper API entry points.
module.exports.createNewRecipe = (req,res) =>{

    create(req.body).then((data) =>{
        res.status(200);
        res.send({status:"OK"});
    }).catch((err) => {
        res.status(400);
        res.send({status:"ERROR",error: err});
    }); 
}


const generateRecipeDetailsJSON = (data) => {
    return  {
        recipeID: randomUUID(),
        recipeName: data.recipe_name,
        description: data.recipe_description,
        category: data.category,
        ownerID: data.owner_id,
        uploadedDate: new Date().toISOString().slice(0,10),
        deletedByOwner: false,
        public: true
    }
}

