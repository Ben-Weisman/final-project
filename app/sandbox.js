// const { query } = require('express');
// const { test } = require('media-typer');
// const db = require('./db/db');
const dataAccessMdule = require('./../app/data-access/dataAccess');
const recipeDataAccess = require('./data-access/recipesDataAccess');
// const { createNewRecipe } = require('./controllers/recipesController');
const queries = require('./data-access/queries/queries');
const worker = require('./data-access/dataAccess')
const utilParser = require('./utils/parser');
const { randomUUID } = require('crypto');
const recipeController = require('./controllers/recipesController');


const func = ()=>{
    
    // worker.executeQuery(queries.getAllIngredients).then((data) => {
    //         if (Object.values(data).indexOf(14) > -1)
    //             console.log('')
    // }).catch((err) => {
    //     console.log(err);
    // })


    // {
	// 	"owner_id":"59dc8b97-6fae-4dcc-82ed-7cd8e21340a0",
	// 	"recipe_name":"Pasta",
	// 	"recipe_description": "Best Pasta EVERRRR",
	// 	"category": "italian",
	// 	"recipe_instructions": ["step 1","step 2","step 3"] ,
	// 	"ingredients": ["1 salt","4 bread","only love","3 cups of soy milk"]
	// }

    let obj = 	{ body: {
		owner_id:'59dc8b97-6fae-4dcc-82ed-7cd8e21340a0',
		recipe_name:'Pasta',
		recipe_description: 'Best Pasta EVERRRR',
		category: 'italian',
		recipe_instructions: ['step 1','step 2','step 3'] ,
		ingredients: ['1 salt','4 brea','only love','3 cups of soy milk']
         }
    }
    recipeController.createNewRecipe(obj,null);
    // console.log(recipeController.createNewRecipe(obj,null));
}
func();