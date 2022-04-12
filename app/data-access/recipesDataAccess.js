
const { query } = require('express');
const db = require('./../db/db');
const worker = require('./../data-access/dataAccess');
const queries = require('./../data-access/queries/queries');
const { resolve } = require('path');


module.exports.fetchAll = () => {
    return new Promise((resolve,reject) =>{
        let res = {};
        console.log('LOG: in fetchAll Promise');
        worker.executeQuery(queries.getAllRecipesDetails).then( (data) => {
            console.log('LOG: resolving in fetchAll');
            res.recipes = data;
        }).catch( (err) => {
            reject(err);
        });
        worker.executeQuery(queries.getAllRecipesIngredients).then( (data) => {
            console.log('LOG: resolving in fetchAll');
            res.ingredients = data;
        }).catch((err) => {
            reject(err);
        });
        worker.executeQuery (queries.getAllRecipesInstructions).then((data) => {
            console.log('LOG: resolving in fetchAll');
            res.instructions = data;
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports.fetchCookbook = (id) => {
    return new Promise((resolve,reject) => {
        worker.executeQuery(queries.getCookbookByUserID(id)).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports.fetchRecipesByIDs = (ids_arr) => {
    return new Promise((resolve,reject) => {
        res = {};
        worker.executeQuery(queries.getRecipeRecordsByIDsBuilder(ids_arr,"details")).then((data) => {
            res.recipes = data;
        }).catch ((err) => {
            reject(err);
        });
        worker.executeQuery(queries.getRecipeRecordsByIDsBuilder(ids_arr,"ingredients")).then((data) => {
            res.ingredients = data;
        }).catch ((err) => {
            reject(err);
        });
        worker.executeQuery(queries.getRecipeRecordsByIDsBuilder(ids_arr,"instructions")).then((data) =>{
            res.instructions = data;
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
        });
    
}

module.exports.fetchRecipesByOwner = (email) =>{
    // query by email.
    
}

module.exports.insertRecipe = (recipe) => {

    populateRecipesTable(recipe);
    populateIngredients(recipe);
}


const populateRecipesTable = (recipe) => {
    let isoDate = new Date().toISOString().replace(/T/,' ');
    let formattedDate = isoDate.substring(0,isoDate.indexOf(' '));

    let queryRecipes = `INSERT INTO Recipes VALUES ('${recipe.recipe_id}','${recipe.recipe_name}','${recipe.recipe_description}','${recipe.category}','${recipe.owner_id}','${formattedDate}',${false},'${recipe.is_public}');`;

}

const populateIngredients = (recipe) => {
    // let currentIngredientsInDBQuery = 'SELECT id,ingredient_name FROM Ingredients';
    
    let ingredientsToPush = JSON.parse({});
    
    let ingredients = recipe.ingredients;
    for (let i = 0;i<ingredients.length;i++){
        for (let j=0;j<currentIngredientsInDB.length;j++){
            if (ingredients[i] == currentIngredientsInDB[j].ingredient_name){
                ingredientsToPush.push({id:currentIngredientsInDB.id,name: currentIngredientsInDB.name});
            }
        }
    }
}