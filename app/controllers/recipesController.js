const { randomUUID } = require('crypto');
const { send } = require('process');
const recipesDataAccess = require('./../data-access/recipesDataAccess');
const dataAccess = require('./../data-access/dataAccess');
const utilParser = require('./../utils/parser');
const Collections = require('./../utils/dbEnums');
const e = require('express');
const { resolve } = require('path');


module.exports.getByName = (name) => {
    dataAccess.fetchRecipeByName(name)
    .then((data) => {
        res.status(200);
        res.contentType('application/json');
        res.send({status: "ok", message: data});
    })
    .catch((err) => {
        res.status(400);
        res.contentType('application/json');
        res.send({status: "error", message: err});
    });
}

module.exports.addExistingRecipeToCookbook = (recipeID) => {
    dataAccess.addRecipeToCookbook(recipeID)
    .then((result) => {
        res.status(200);
        res.contentType('application/json');
        res.send(result);
    }).catch((err) => {
        res.status(401);
        res.contentType('application/json');
        res.send(err);
    });
}



// Get a recipe per user(email)
module.exports.getAllRecipesByOwner = (req,res) =>{

    email = req.body.email;
    dataAccess.getRecipesByOwner(email).then((recipes) => {
        res.status(200);
        res.contentType('application/json');
        res.send(recipes);
    }).catch((err) => {
        res.status(401);
        res.send({status: "error", message: err});
    });
    
}

// get all recipes from db - done
module.exports.getAll = (req,res) =>{
    console.log('LOG: in getAll');
    dataAccess.getAllRecipes().then ((data) => {
        console.log(`LOG: recipes returned ==>\n\n${data}`);
        res.status(200);
        res.contentType('application/json');
        res.send(recipes);
    }).catch((err) => {
        res.status(500);
        res.send(err);
    });
 
}


// get all recipes of a user's cookbook. done
module.exports.getCookbook = (req,res) => {
    
    email = req.body.email;
    console.log(`LOG: in getCookbook, email = ${email}`);
    dataAccess.getCookbookByUser(email)
    .then((recipes) => {
        res.status(200);
        res.contentType('application/json');
        res.send(recipes);
    }).catch((err) => {
        res.status(500);
        res.send(err);
    });

}

    


// remove a recipe by a given id from the db
/* Gets: {id:}
    Returns:{}
*/
module.exports.removeByID = (req,res) =>{

    id = req.body.id;
    dataAccess.zombifyRecipe(id).then((data) => {
        res.status(200);
        res.send({status: "ok", message: data});
    })
    .catch((err) => {
        res.status(401);
        res.send({status: "error", message: err});
    });

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


// Gets: {name:,description:,category:,ingredients:,instructions:,ownerEmail:}
module.exports.createNewRecipe = (req,res) =>{
    recipe = req.body;
    recipe.upload_date = Date.now();
    recipe.recipeID = randomUUID();
    recipe.active = true;
    
    
    dataAccess.insertNewDocument(recipe,Collections.Collections.RECIPE_COLLECTION)
    .then((data) => {
        let params = {
            collection: 'cookbooks',
            queryField: 'userEmail',
            queryVal: recipe.ownerEmail,
            arrayToUpdate: 'recipes',
            pushVal: recipe.recipeID
        }
        
        dataAccess.pushValueToArrayField(params)
        .then((data) => {
            res.status(200);
            res.send({status:"ok", message: data});
        })
        .catch((err) => {
            console.log('\n\nLOG: error in insertNewDocument')
        res.status(400);
        res.send({status:"error",message: err});
        })

    }).catch((err) => {
        console.log('\n\nLOG: error in insertNewDocument')
        res.status(400);
        res.send({status:"error",message: err});
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

