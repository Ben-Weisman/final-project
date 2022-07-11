
const { query } = require('express');
const db = require('./../db/db');
const worker = require('./../data-access/dataAccess');
const queries = require('./../data-access/queries/queries');
const { resolve } = require('path');
const Tables = require('../utils/dbEnums');
const { randomUUID } = require('crypto');


module.exports.removeInstructionsRecordsOfRecipeID = (id) => {
    return new Promise ((resolve,reject) => {
        worker.executeQuery(queries.deleteRecipeInstructionsQueryBuilder(id)).then((data) => {
            resolve("OK");
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports.removeRecord = (id,tableName) => {
    return new Promise ((resolve,reject) => {
        worker.executeQuery(queries.deleteQueryBuilder(tableName,id)).then((data) => {
            resolve("OK");
        }).catch((err) => {
            reject(err);
        });
    });
}


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


module.exports.getAllIngredients = () =>{
    return new Promise((resolve,reject) => {
        worker.executeQuery(queries.getAllIngredients).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}


/*
[
  {
    ingredient_id: '...',
    name: '...',
    recipe_id: '...'
  },
  {
    ingredient_id: '...',
    name: '...',
    recipe_id: '...'
  },...

]
   */
const generateRecipeIngredientsValues = (ingredientsArray) => {
    let res = "";
    let sign = "";
    
    ingredientsArray.forEach(ingredient => {
        let value = `('${ingredient.ingredient_id}','${ingredient.recipe_id}')`;
        res += sign;
        res += value;
        sign = ",";
    });
    res+=';';
    return res;
}


const generateInstructionsValues = (instructions) => {
    let res = "";
    let sign = "";
    
    instructions.forEach(instruction => {
        let value = `('${instruction.instruction_id}','${instruction.name}',${instruction.step})`;
        res += sign;
        res += value;
        sign = ",";
    });
    res+=';';
    return res;
}


const generateRecipeInstructionsValues = (instructions) => {
    let res = "";
    let sign = "";
    
    instructions.forEach(instruction => {
        let value = `('${instruction.instruction_id}','${instruction.recipe_id}')`;
        res += sign;
        res += value;
        sign = ",";
    });
    res+=';';
    return res;
}


const generateCookbookValues = (cookbookRecord) => {
    return `('${cookbookRecord.recipe_id}',${0},'${cookbookRecord.user_id}');`;
}
module.exports.insertNewRecord = (tableName,record) => {

        let flag = true;
        var values = "";
        switch (tableName){
            case Tables.Tables.RECIPES_TABLE: // CHECKED
                values = generateRecipeDetailsValues(record);
                break;
            case Tables.Tables.RECIPE_INGREDIENT_TABLE:
                values = generateRecipeIngredientsValues(record);
                break;
            case Tables.Tables.INGREDIENTS_TABLE: // CHECKED
                values = generateIngredientsInsertionValues(record);
                break;
            case Tables.Tables.RECIPE_INSTRUCTIONS_TABLE:
                values = generateRecipeInstructionsValues(record);
                break;
            case Tables.Tables.INSTRUCTIONS_TABLE: // CHECKED
                values = generateInstructionsValues(record);
                break;
            case Tables.Tables.COOKBOOK_TABLE:
                console.log(`LOG: case cookbook`);
                values = generateCookbookValues(record);
                break;
            default:
                flag = false;
                break;
        }
        if (flag){
            return new Promise ((resolve,reject) => {
                console.log(`LOG: tableName ===> ${tableName}`);
                worker.executeQuery(queries.insertQueryBuilder(tableName,values)).then((data) => {
                    resolve({
                            status:"OK",
                            message:`inserted values into ${tableName}`});
                }).catch((err) => {
                    reject(err);
                });
            });
        }
}

const generateRecipeDetailsValues = (recipeDetails) => {
    return `('${recipeDetails.recipeID}','${recipeDetails.recipeName}','${recipeDetails.description}','${recipeDetails.category}','${recipeDetails.ownerID}','${recipeDetails.uploadedDate}',${recipeDetails.deletedByOwner},${1})`;
}

const generateIngredientsInsertionValues = (ingredientArray) => {
    let res = "";
    let sign = "";
    ingredientArray.forEach(ingredient => {
        let value = `('${ingredient.ingredient_id}','${ingredient.name}')`;
        res += sign;
        res += value;
        sign = ",";
    });
    res+=';';
    return res;
}


module.exports.fetchAll = () => {
    return new Promise((resolve,reject) =>{
        let res = {};
        worker.executeQuery(queries.getAllRecipesDetails).then( (data) => {
            console.log(`LOG: fetched ====> ${JSON.stringify(data,null,4)}`);
            res.recipes = data;
        }).catch( (err) => {
            reject(err);
        });
        worker.executeQuery(queries.getAllRecipesIngredients).then( (data) => {
            console.log(`LOG: fetched ====> ${JSON.stringify(data,null,4)}`);
            res.ingredients = data;
        }).catch((err) => {
            reject(err);
        });
        worker.executeQuery (queries.getAllRecipesInstructions).then((data) => {
            console.log(`LOG: fetched ====> ${JSON.stringify(data,null,4)}`);
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
            res.recipes = data;
        }).catch ((err) => {
            reject(err);
        });
        
        worker.executeQuery(queries.getRecipeComponentsByIDsQueryBuilder(ids_arr,"ingredients")).then((data) => {
            res.ingredients = data;
        }).catch ((err) => {
            reject(err);
        });
        
        worker.executeQuery(queries.getRecipeComponentsByIDsQueryBuilder(ids_arr,"instructions")).then((data) =>{
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

