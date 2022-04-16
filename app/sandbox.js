// const { query } = require('express');
// const { test } = require('media-typer');
// const db = require('./db/db');
const dataAccessMdule = require('./../app/data-access/dataAccess');
const recipeDataAccess = require('./data-access/recipesDataAccess');
// const { createNewRecipe } = require('./controllers/recipesController');
const queries = require('./data-access/queries/queries');
const worker = require('./data-access/dataAccess')
const utilParser = require('./utils/parser');



const func = ()=>{
    
    let = today = new Date().toISOString().slice(0,10);
    console.log(today);

    // return new Promise ((resolve,reject) => {
    //     let recipesIDs = {};
    //     let userID = {};
    //     worker.executeQuery(queries.getUserByEmail("ben.weisman15@gmail.com")).then((data) => {
    //         userID = data[0].user_id;
    //         console.log('LOG: user_id = ' + userID);
    //         worker.executeQuery(queries.getAllRecipesIDsByOwner(userID)).then((data) => {
    //             let idsArray = data.map(item => item.recipe_id);
    //             console.log('LOG: recipes ids = ' + idsArray);
    //             recipeDataAccess.fetchRecipesByIDs(idsArray).then((data) => {
    //                 recipes = utilParser.parseToRecipe(data);
    //                 console.log(recipes);
    //             }).catch((err) => {
    //                 reject(err);
    //             });
    //         }).catch((err) => {
    //             reject(err);
    //         });


    //     }).catch((err) => {
    //         reject(err);
    //     });

    // });

}
func();