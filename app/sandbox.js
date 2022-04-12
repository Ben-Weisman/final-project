// const { query } = require('express');
// const { test } = require('media-typer');
// const db = require('./db/db');
const dataAccessMdule = require('./../app/data-access/dataAccess');
const recipeDataAccess = require('./data-access/recipesDataAccess');
// const { createNewRecipe } = require('./controllers/recipesController');

// CHANGE
// CHANGE

// const ben = (callback)=>{
//     let query = 'SELECT * FROM Measurement_Units';
//     db.query(query,(err,result) =>{
//         if (err)
//             console.log(err);
//         else{

//         }
//     })
// }


// const handleResult = (err,data) => {
//     if (err){
//         console.log(err);
//     }
//     else{
//         console.log(JSON.stringify(data,null,4));
//     }
// }

// ben(handleResult);

const validateParams = (ingredients) => {
    return true;
}

const createNewRecipe = (req,res) =>{
    recipe = req.body;
    // recipe.recipe_id = randomUUID();

    let ingredients = recipe.ingredients;
    if (validateParams(ingredients)){ // implement validateRecipes
        dataAccessMdule.fetchRecordsFromTable('Ingredients','*',(err,data) => {
            console.log('LOG: in callback function');
            if (!err){
                recipe.ingredients.appears = checkAppearancesInDB(recipe.ingredients,data);
                
                console.log('LOG: Printing...')

            }
        })
        // recipesDataAccess.insertRecipe(recipe);
        // res.status(200);
    }
    // else{
    //     res.status(400);
    // }
}



// const checkAppearancesInDB = (recipeIngredients,dbIngredients) => {
//     console.log('LOG: in checkAppearance');
//     var found;
//     recipeIngredients.forEach(function(ingredient) {
//         let name = ingredient.ingredient_name;
//         console.log(ingredient);
//         found = dbIngredients.filter(function(ingredient) {
            
//              return ingredient.ingredient_name.toLowerCase() == name.toLowerCase();
//          });
         
//     });
//     console.log('LOG: found: ' + JSON.stringify(found,null,4));
        
//     // });
// //     Object.keys(result).forEach(function(key) {
// //         var row = result[key];
// //         console.log(row.id);
    
// // });
// }
// req = {body: {ingredients: [{'id': '1','ingredient_name' : 'tomato'},{'id': '2','ingredient_name' : 'butter'},{'id': '3','ingredient_name' : 'roma tomatos'}]}};
// createNewRecipe(req,null);


const func = ()=>{
    str = "Hello!";
    str = str.replace('!','');
    str[str.length-1] = ' ';
    console.log(str);
}


func();