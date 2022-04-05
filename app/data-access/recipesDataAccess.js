
const { query } = require('express');
const db = require('./../db/db');


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