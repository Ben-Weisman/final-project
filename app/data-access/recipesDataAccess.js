
const { query } = require('express');
const db = require('./../db/db');
const worker = require('./../data-access/dataAccess');
const queries = require('./../data-access/queries/queries');
const { resolve } = require('path');
const Tables = require('../utils/dbEnums');

module.exports.insertRecipeTableRecord = (record) => {
    let values = `('${record.recipeID}','${record.recipeName}','${record.description}','${record.category}','${record.ownerID}','${record.uploadedDate}',${record.deletedByOwner},${public})`
    return new Promise ((resolve,reject) => {
        worker.executeQuery(queries.insertQueryBuilder("Recipes",values)).then((data) => {
            resolve("OK");
        }).catch((err) => {
            reject(err);
        });
    });

    
}

module.exports.insertNewRecord = (tableName,record) => {

        let flag = true;
        switch (tableName){
            case Tables.Tables.RECIPES_TABLE:
                values = `('${record.recipeID}','${record.recipeName}','${record.description}','${record.category}','${record.ownerID}','${record.uploadedDate}',${record.deletedByOwner},${public})`;
                break;
            case Tables.Tables.RECIPE_INGREDIENT_TABLE:
                values = ``;
                break;
            case Tables.Tables.INGREDIENTS_TABLE:
                values = ``;
                break;
            case Tables.Tables.RECIPE_INSTRUCTIONS_TABLE:
                values = ``;
                break;
            case Tables.Tables.INSTRUCTIONS_TABLE:
                values = ``;
                break;
            default:
                flag = false;
                break;
        }
        if (flag){
            return new Promise ((resolve,reject) => {
                worker.executeQuery(queries.insertQueryBuilder(tableName,values)).then((data) => {
                    resolve("OK");
                }).catch((err) => {
                    reject(err);
                });
            });
        }
}

module.exports.insertIngredients = (ingredients) => {
    let values = `('','','','')`;
}


module.exports.fetchAll = () => {
    return new Promise((resolve,reject) =>{
        let res = {};
        worker.executeQuery(queries.getAllRecipesDetails).then( (data) => {
            res.recipes = data;
        }).catch( (err) => {
            reject(err);
        });
        worker.executeQuery(queries.getAllRecipesIngredients).then( (data) => {
            res.ingredients = data;
        }).catch((err) => {
            reject(err);
        });
        worker.executeQuery (queries.getAllRecipesInstructions).then((data) => {
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
        
        worker.executeQuery(queries.getRecipeComponentsByIDsQueryBuilder(ids_arr,"details")).then((data) => {
            console.log('LOG: data = ' + data);
            res.recipes = data;
        }).catch ((err) => {
            reject(err);
        });
        
        worker.executeQuery(queries.getRecipeComponentsByIDsQueryBuilder(ids_arr,"ingredients")).then((data) => {
            console.log('LOG: data = ' + data);
            res.ingredients = data;
        }).catch ((err) => {
            reject(err);
        });
        
        worker.executeQuery(queries.getRecipeComponentsByIDsQueryBuilder(ids_arr,"instructions")).then((data) =>{
            console.log('LOG: data = ' + data);
            res.instructions = data;
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
        });
    
}

module.exports.fetchRecipesByOwner = (email) =>{
    return new Promise ((resolve,reject) => {
        let recipesIDs = {};
        let userID = {};
        worker.executeQuery(queries.getUserByEmail("ben.weisman15@gmail.com")).then((data) => {
            userID = data[0].user_id;

            worker.executeQuery(queries.getAllRecipesIDsByOwner(userID)).then((data) => {
                let idsArray = data.map(item => item.recipe_id);
                this.fetchRecipesByIDs(idsArray).then((data) => {
                    // console.log(data);
                }).catch((err) => {
                    reject(err);
                });
            }).catch((err) => {
                reject(err);
            });


        }).catch((err) => {
            reject(err);
        });

    });
    
}

